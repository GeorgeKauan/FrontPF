import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotinasService, Rotina } from '../../../core/rotinas/rotinas.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rotinas-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rotinas-list.html',
  styleUrls: ['./rotinas-list.css']
})
export class RotinasListComponent implements OnInit {
  private rotinasService = inject(RotinasService);
  private router = inject(Router);

  rotinas: Rotina[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.carregarRotinas();
  }

  carregarRotinas(): void {
    this.isLoading = true;
    this.rotinasService.getMinhasRotinas().subscribe({
      next: (data) => {
        this.rotinas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Falha ao carregar suas rotinas. Verifique sua conexão.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  editarRotina(id: number): void {
    // Navega para o builder em modo edição
    this.router.navigate(['/criar-rotina'], { queryParams: { id: id } });
  }
  
  formatarAtivos(rotina: any): string {
    if (!rotina.ativos || rotina.ativos.length === 0) {
        return 'Nenhum ativo';
    }
    const nomes = rotina.ativos.map((a: any) => a.nome);
    const ativosPreview = nomes.slice(0, 3).join(', ');
    return ativosPreview;
}

  deletarRotina(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta rotina?')) {
      this.rotinasService.deletarRotina(id).subscribe({
        next: () => {
          // Remove a rotina da lista local após a exclusão no backend
          this.rotinas = this.rotinas.filter(r => r.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao deletar rotina.';
          console.error(err);
        }
      });
    }
  }
}