import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Interface do Objeto Ativo
export interface Ativo {
  id: number;
  nome: string;
  descricao_completa: string;
  descricao_rapida: string;
  tipo_pele: string; // Ex: 'Oleosa, Mista'
  necessidades: string; // Ex: 'Hidratação, Anti-idade'
  // Adicione outros campos necessários
}

@Injectable({
  providedIn: 'root'
})
export class AtivosService {
  private http = inject(HttpClient);
  // URL de exemplo da sua API
  private apiUrl = 'http://localhost:3000/api/ativos';

  constructor() { }

  /**
   * Busca a lista de ativos, opcionalmente aplicando filtros.
   */
  getAtivos(filtros?: { limite?: number, destaque?: boolean }): Observable<Ativo[]> {
    // TO-DO: Implementar a chamada HTTP real
    // return this.http.get<Ativo[]>(this.apiUrl, { params: filtros });

    // Mock de dados para que o componente funcione temporariamente:
    const mockData: Ativo[] = [
      { id: 1, nome: 'Óleo de Copaíba', descricao_completa: 'Um poderoso anti-inflamatório...', descricao_rapida: 'Anti-inflamatório natural', tipo_pele: 'Todas', necessidades: 'Acne, Calmante' },
      { id: 2, nome: 'Extrato de Açaí', descricao_completa: 'Rico em antioxidantes e vitaminas.', descricao_rapida: 'Antioxidante e revitalizante', tipo_pele: 'Seca, Normal', necessidades: 'Anti-idade, Nutrição' },
      { id: 3, nome: 'Manteiga de Cupuaçu', descricao_completa: 'Excelente para hidratação profunda.', descricao_rapida: 'Hidratação e emoliência', tipo_pele: 'Seca', necessidades: 'Hidratação' },
      { id: 4, nome: 'Argila Verde', descricao_completa: 'Ideal para controle de oleosidade.', descricao_rapida: 'Controle de oleosidade', tipo_pele: 'Oleosa', necessidades: 'Controle de Sebo' },
    ];
    return of(mockData.slice(0, filtros?.limite || 4));
  }

  /**
   * Busca um ativo específico pelo ID.
   */
  getAtivoById(id: number): Observable<Ativo> {
    // return this.http.get<Ativo>(`${this.apiUrl}/${id}`);
    
    // Mock (Retorna o primeiro ativo do mock)
    return of({ id: 1, nome: 'Óleo de Copaíba', descricao_completa: 'Um poderoso anti-inflamatório...', descricao_rapida: 'Anti-inflamatório natural', tipo_pele: 'Todas', necessidades: 'Acne, Calmante' });
  }
}