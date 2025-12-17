import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtivosService, Ativo } from '../../../core/ativos/ativos.service';

@Component({
  selector: 'app-inteligente-ativos-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './inteligente-ativos-list.html',
  styleUrls: ['./inteligente-ativos-list.css']
})
export class InteligenteAtivosListComponent implements OnInit {
  private ativosService = inject(AtivosService);

  // Lista de ativos RAW (original, sem filtro)
  ativosRaw: WritableSignal<Ativo[]> = signal([]);

  // Lista de ativos que será exibida (filtrada)
  ativosFiltrados: WritableSignal<Ativo[]> = signal([]);

  // Sinal para armazenar o texto da barra de pesquisa
  searchTerm: WritableSignal<string> = signal('');

  // Lista de tipos de pele (hardcoded)
  skinTypes = [
    "Todas, especialmente oleosa e acneica",
    "Todas, especialmente madura",
    "Pele Seca e Desidratada",
    "Pele Oleosa e Mista",
    "Todas, para luminosidade",
    "Todas, especialmente exposta ao sol",
    "Todas, para revitalização",
    "Pele Mista e Sensível",
    "Pele Normal a Oleosa (principalmente couro cabeludo)",
    "Pele Sensível e Seca",
    "Pele Seca, Madura e Lábios",
    "Todas, especialmente irritada",
    "Pele Seca e Madura",
    "Pele Oleosa e Mista",
    "Pele Oleosa e Acneica",
    "Pele Sensível e Reativa",
    "Pele Extremamente Seca",
    "Todas, com foco em reparação",
    "Todas, para viço",
    "Todas, com foco em celulite e firmeza",
    "Pele Sensível e Desvitalizada",
    "Pele Oleosa e Madura",
    "Pele Oleosa (substituto de sabão)",
    "Todas, com foco em uniformização",
    "Todas, para vitalidade",
    "Pele Sensível e Madura",
    "Pele Seca e Desvitalizada",
    "Pele com inchaço e dor (não em feridas abertas)",
    "Pele Normal a Seca",
    "Pele Seca e Corporal"
  ];

  // Sinal para armazenar o tipo de pele selecionado
  selectedSkinType: WritableSignal<string> = signal('');

  errorMensagem: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.carregarAtivos();
  }

  carregarAtivos(): void {
    this.errorMensagem = null;

    this.ativosService.getAtivos().subscribe({
      next: (data) => {
        this.ativosRaw.set(data);
        this.filtrarAtivos(); // Filtra inicialmente para exibir todos os dados
      },
      error: (err) => {
        console.error('Erro ao carregar ativos:', err);
        this.errorMensagem = 'Falha ao conectar com o Backend (Node.js/MySQL). Verifique o console do servidor.';
      }
    });
  }

  /**
   * Função que é chamada sempre que o searchTerm (barra de pesquisa) é alterado.
   */
  filtrarAtivos(): void {
    const term = this.searchTerm().toLowerCase().trim();
    const rawData = this.ativosRaw();
    const selectedType = this.selectedSkinType();

    if (!term && !selectedType) {
      // Se a pesquisa e o tipo de pele estiverem vazios, exibe todos os dados originais.
      this.ativosFiltrados.set(rawData);
      return;
    }

    // Filtra a lista original
    const resultado = rawData.filter(ativo => {
      const matchesSearch = (
        ativo.nome.toLowerCase().includes(term) ||
        ativo.funcao_principal.toLowerCase().includes(term) ||
        ativo.origem_geografica.toLowerCase().includes(term) ||
        ativo.tipo_de_pele_indicada.toLowerCase().includes(term)
      );

      const matchesSkinType = selectedType
        ? ativo.tipo_de_pele_indicada.toLowerCase().includes(selectedType.toLowerCase())
        : true;

      return matchesSearch && matchesSkinType;
    });

    this.ativosFiltrados.set(resultado);
  }

  /**
   * Função chamada quando o tipo de pele é alterado no seletor.
   */
  onSkinTypeChange(): void {
    this.filtrarAtivos();
  }
}