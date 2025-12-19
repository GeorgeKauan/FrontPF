import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RotinasService } from '../../../core/rotinas/rotinas.service';
import { AtivosService } from '../../ativos/ativos.service';
import { AuthService } from '../../../core/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rotinas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './rotinas-list.html',
  styleUrls: ['./rotinas-list.css']
})
export class RotinasComponent implements OnInit {
  private service = inject(RotinasService);
  private ativosService = inject(AtivosService);
  private authService = inject(AuthService);

  userId: number | null = null;
  nome = '';

  // Organiza os ativos para exibição nos cards da tela
  ativosPorEtapa: any = {
    limpeza: [],
    tratamento: [],
    hidratacao: [],
    protecao: []
  };

  // Armazena os IDs selecionados. Usamos 'any' para evitar erros de indexação
  etapas: any = {
    limpeza: [],
    tratamento: [],
    hidratacao: [],
    protecao: []
  };

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      if (user) this.userId = user.id;
    });
    this.carregarAtivos();
  }

  carregarAtivos() {
    this.ativosService.listar().subscribe({
      next: (ativos: any[]) => {
        this.ativosPorEtapa = { limpeza: [], tratamento: [], hidratacao: [], protecao: [] };
        
        ativos.forEach((a: any) => {
          // Captura a função do banco independente do nome da coluna
          const raw = a.funcao_cosmetica_primaria || a.funcao_principal || a.funcao || '';
          
          // Normaliza o texto para bater com as chaves do objeto (limpeza, tratamento, etc)
          const key = raw.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/ç/g, 'c').trim();

          if (this.ativosPorEtapa.hasOwnProperty(key)) {
            this.ativosPorEtapa[key].push(a);
          }
        });
      },
      error: (err) => console.error('Erro ao carregar ativos:', err)
    });
  }

  toggleAtivo(etapa: string, ativoId: number, event: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    // Garante que a lista da etapa existe
    if (!this.etapas[etapa]) {
      this.etapas[etapa] = [];
    }

    if (isChecked) {
      if (!this.etapas[etapa].includes(ativoId)) {
        this.etapas[etapa].push(ativoId);
      }
    } else {
      this.etapas[etapa] = this.etapas[etapa].filter((id: number) => id !== ativoId);
    }
  }

  salvar() {
    if (!this.userId) return alert('Faça login primeiro!');
    if (!this.nome.trim()) return alert('Dê um nome ao seu ritual!');

    // Verifica se há pelo menos um item selecionado antes de enviar
    const temSelecao = Object.values(this.etapas).some((arr: any) => arr.length > 0);
    if (!temSelecao) return alert('Selecione ao menos um ativo para salvar sua rotina!');

    this.service.criar({
      userId: this.userId,
      nome: this.nome,
      etapas: this.etapas
    }).subscribe({
      next: () => {
        alert('✨ Rotina salva com sucesso!');
        this.nome = '';
        this.etapas = { limpeza: [], tratamento: [], hidratacao: [], protecao: [] };
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        alert('Erro ao salvar no banco. Verifique o terminal do VS Code.');
      }
    });
  }
}