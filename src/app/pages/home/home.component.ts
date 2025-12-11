import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 🚨 CORREÇÃO DOS CAMINHOS RELATIVOS
import { AtivosService, Ativo } from '../../core/ativos/ativos.service'; 
import { AuthService } from '../../core/auth/auth.service'; 
import { CardAtivoComponent } from '../../shared/card-ativo/card-ativo.component'; 
// Fim das correções de caminho

@Component({
  selector: 'app-home',
  standalone: true,
  // 🚨 CORREÇÃO: O nome do arquivo HTML padrão do Angular é .component.html
  templateUrl: './home.html', 
  styleUrls: ['./home.css'], 
  imports: [CommonModule, RouterModule, CardAtivoComponent], 
})
export class HomeComponent implements OnInit {
  private ativosService = inject(AtivosService);
  private authService = inject(AuthService);

  ativosEmDestaque: Ativo[] = [];
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  userName: string = 'Visitante';

  ngOnInit(): void {
    this.setupAuthListener();
    this.carregarAtivosDestaque();
  }

  setupAuthListener(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userName = user.nome.split(' ')[0]; 
      } else {
        this.userName = 'Visitante';
      }
    });
  }

  carregarAtivosDestaque(): void {
    this.isLoading = true;
    const filtros = { limite: 4, destaque: true }; 

    this.ativosService.getAtivos(filtros).subscribe({
      next: (data) => {
        this.ativosEmDestaque = data.slice(0, 4); 
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar ativos de destaque:', err);
        this.isLoading = false;
      }
    });
  }
}