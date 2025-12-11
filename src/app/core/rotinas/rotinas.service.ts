import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ativo } from '../ativos/ativos.service';

// Interface para um Ativo dentro da Rotina (com o passo)
interface AtivoRotina extends Ativo {
    passo: 'Limpeza' | 'Tratamento' | 'Hidratação' | 'Proteção';
}

// Interface principal para a Rotina Personalizada
export interface Rotina {
  id: number;
  nome: string;
  usuario_id: number;
  data_criacao: string;
  ativos: AtivoRotina[]; // Lista de ativos selecionados
}

@Injectable({
  providedIn: 'root'
})
export class RotinasService {
  // Esta rota requer autenticação (o TokenInterceptor cuidará disso)
  private apiUrl = '/api/rotinas'; 

  constructor(private http: HttpClient) { }

  /**
   * Busca todas as rotinas salvas pelo usuário logado.
   */
  getMinhasRotinas(): Observable<Rotina[]> {
    return this.http.get<Rotina[]>(this.apiUrl); 
  }

  /**
   * Busca uma rotina específica pelo ID.
   */
  getRotinaById(id: number): Observable<Rotina> {
    return this.http.get<Rotina>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria uma nova rotina.
   */
  salvarRotina(rotinaData: Rotina): Observable<Rotina> {
    // Nota: O backend deve validar e retornar a rotina salva
    return this.http.post<Rotina>(this.apiUrl, rotinaData); 
  }

  /**
   * Atualiza uma rotina existente.
   */
  editarRotina(id: number, rotinaData: Rotina): Observable<Rotina> {
    return this.http.put<Rotina>(`${this.apiUrl}/${id}`, rotinaData);
  }

  /**
   * Deleta uma rotina.
   */
  deletarRotina(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}