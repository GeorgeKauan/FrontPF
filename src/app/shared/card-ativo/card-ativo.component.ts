import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 🚨 CORREÇÃO DOS CAMINHOS: O CardAtivo está em 'shared/card-ativo', precisa subir 2 níveis (../..).
import { AtivosService, Ativo } from '../../core/ativos/ativos.service'; // CORRIGIDO
import { AuthService } from '../../core/auth/auth.service'; // Adicionar este import se não existir

@Component({
  selector: 'app-card-ativo',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './card-ativo.html',
  styleUrls: ['./card-ativo.css']
})
export class CardAtivoComponent {
  // Injeção de AuthService aqui, se for usar
  private authService = inject(AuthService); 
  
  // O componente recebe o objeto 'ativo' inteiro como entrada
  @Input({ required: true }) ativo!: Ativo; 
  
  isLoggedin: boolean = false; 

  constructor() {
    // TO-DO: Implementar lógica de favoritar se o usuário estiver logado
    this.authService.isLoggedIn$.subscribe(loggedIn => this.isLoggedin = loggedIn);
  }
}