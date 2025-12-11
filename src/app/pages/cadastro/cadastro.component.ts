import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// 🚨 CORREÇÃO DO CAMINHO: Subindo 2 níveis (../..) para alcançar o 'core'
import { AuthService, AuthResponse } from '../../core/auth/auth.service'; 

// === FUNÇÃO DE VALIDAÇÃO PERSONALIZADA: Verifica se as senhas são iguais ===
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
  const password = control.get('senha');
  const confirmPassword = control.get('confirmarSenha');

  // Retorna null se os campos não existirem ou ainda não forem válidos individualmente
  if (!password || !confirmPassword) {
    return null;
  }
  
  // Retorna { passwordMismatch: true } se os valores não corresponderem, senão null (válido)
  return password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
};

// =========================================================================

@Component({
  selector: 'app-cadastro',
  standalone: true,
  // CRÍTICO: Importar o ReactiveFormsModule para usar FormBuilder
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './cadastro.html', // Ou .component.html
  styleUrls: ['./cadastro.css'] // Ou .component.css
})
export class CadastroComponent implements OnInit {
  // Injeção de dependências
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  cadastroForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      // Aplicando o validator na FormGroup
    }, { validators: passwordMatchValidator }); 

    // Campos de senha são definidos após a FormGroup para usar o Validator
    this.cadastroForm.addControl('senha', this.fb.control('', [Validators.required, Validators.minLength(6)]));
    this.cadastroForm.addControl('confirmarSenha', this.fb.control('', [Validators.required]));
  }

  onSubmit(): void {
    // Verifica se a validação da FormGroup e dos campos individuais passou
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = null;

    // Pega apenas os dados necessários (excluindo confirmarSenha)
    const { confirmarSenha, ...userData } = this.cadastroForm.value;

    this.authService.register(userData).subscribe({
      // 🚨 CORREÇÃO DA TIPAGEM: next(res: AuthResponse)
      next: (res: AuthResponse) => { 
        this.isLoading = false;
        alert('Cadastro realizado com sucesso! Faça login para acessar.');
        this.router.navigate(['/login']); 
      },
      // 🚨 CORREÇÃO DA TIPAGEM: error(err: any)
      error: (err: any) => { 
        this.isLoading = false;
        
        // Tratamento de erro (usando err.error.message se a API retornar um objeto JSON)
        if (err.status === 409) { 
          this.errorMessage = 'Este e-mail já está cadastrado. Tente fazer login.';
        } else if (err.error && err.error.message) {
           this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Erro ao processar o cadastro. Tente novamente mais tarde.';
        }
        console.error('Erro de registro:', err);
      }
    });
  }
}