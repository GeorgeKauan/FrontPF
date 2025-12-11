import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common'; // Para usar *ngIf e *ngFor no HTML
import { Router, RouterModule } from '@angular/router'; // Para navegação

@Component({
  selector: 'app-login',
  standalone: true,
  // 🚨 CRÍTICO: Estes imports são necessários para os formulários funcionarem
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  // Injeção de dependências (Angular Standalone)
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  ngOnInit(): void {
    // Inicialização do Formulário Reativo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // Assumindo que sua senha é chamada 'senha' no backend
      senha: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  onSubmit(): void {
    this.errorMessage = null; // Limpa mensagens de erro anteriores
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca campos para exibir erros de validação
      return;
    }

    this.isLoading = true;
    const { email, senha } = this.loginForm.value;

    // Chama o método login no AuthService, que se comunica com o backend
    this.authService.login({ email, senha }).subscribe({
      next: (res) => {
        // Sucesso: Token e dados do usuário salvos no AuthService/LocalStorage
        this.isLoading = false;
        alert('Login realizado com sucesso!');
        this.router.navigate(['/']); // Redireciona para a Home
      },
      error: (err) => {
        this.isLoading = false;
        
        // Trata erros da API
        if (err.status === 401) {
          this.errorMessage = 'E-mail ou senha inválidos. Verifique suas credenciais.';
        } else {
          this.errorMessage = 'Ocorreu um erro na conexão. Tente mais tarde.';
        }
        console.error('Erro de Login:', err);
      }
    });
  }
}