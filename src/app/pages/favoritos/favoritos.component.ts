import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { AtivosService, Ativo } from '../../core/ativos/ativos.service';
import { AuthService } from '../../core/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
  imports: [
    CommonModule
  ]
})
export class FavoritosComponent implements OnInit {
  favoritos: Ativo[] = [];
  userId: number | null = null;
  loading = true;
  error: string | null = null;
  private ativosService = inject(AtivosService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('FavoritosComponent ngOnInit called');
    this.authService.currentUser$.subscribe(user => {
      console.log('FavoritosComponent auth subscribe, user:', user);
      if (!user) {
        console.log('FavoritosComponent no user, setting error and loading false');
        this.error = 'Você precisa estar logado para ver seus favoritos.';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.userId = user.id;
      if (!this.userId) {
        this.error = 'Não foi possível identificar seu ID de usuário.';
        this.loading = false;
        return;
      }

      this.carregarFavoritos();
    });
  }

  carregarFavoritos(): void {
    console.log('FavoritosComponent carregarFavoritos called, userId:', this.userId);
    if (!this.userId) {
      this.error = 'Não foi possível identificar seu ID de usuário.';
      this.loading = false;
      return;
    }

    this.ativosService.getFavoritos(this.userId).subscribe({
      next: (data) => {
        console.log('FavoritosComponent getFavoritos next, data:', data);
        this.favoritos = data;
        this.loading = false;
        console.log('FavoritosComponent loading set to false, favoritos:', this.favoritos);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('FavoritosComponent Erro ao carregar favoritos:', err);
        this.error = 'Falha ao carregar os favoritos. Tente novamente mais tarde.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  removerFavorito(assetId: number): void {
    if (!this.userId) return;

    this.ativosService.removeFavorito(this.userId!, assetId).subscribe({
      next: () => {
        this.favoritos = this.favoritos.filter(ativo => ativo.id !== assetId);
      },
      error: (err) => {
        console.error('Erro ao remover favorito:', err);
        this.error = 'Falha ao remover o favorito. Tente novamente.';
      }
    });
  }
}