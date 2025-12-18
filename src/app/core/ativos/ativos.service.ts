// Onde: src/app/core/ativos/ativos.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interface com nomes IDÊNTICOS ao JSON do backend
export interface Ativo {
    id: number;
    nome: string;
    origem_geografica: string;
    funcao_principal: string;
    tipo_de_pele_indicada: string;
    funcao_cosmetica_primaria: string;
    explicacao_detalhada: string;
}

// ✅ Interface para representar um favorito
export interface Favorito {
    user_id: number;
    asset_id: number;
}

@Injectable({
    providedIn: 'root'
})
export class AtivosService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/ativos';
    private favoritesUrl = 'http://localhost:3000/api/favorites';

    constructor() { }

    getAtivos(filtros?: { limite?: number; destaque?: boolean }): Observable<Ativo[]> {
        let params = new HttpParams();

        if (filtros?.limite) {
            params = params.set('limite', filtros.limite.toString());
        }

        if (filtros?.destaque !== undefined) {
            params = params.set('destaque', filtros.destaque.toString());
        }

        return this.http.get<Ativo[]>(this.apiUrl, { params });
    }

    getAtivoById(id: number): Observable<Ativo> {
        return this.http.get<Ativo>(`${this.apiUrl}/${id}`);
    }

    // ✅ Método para obter todos os favoritos de um usuário específico
    getFavoritos(userId: number): Observable<Ativo[]> {
        return this.http.get<Ativo[]>(`${this.favoritesUrl}/${userId}`);
    }

    // ✅ Método para adicionar um favorito
    addFavorito(userId: number, assetId: number): Observable<{ message: string; favoriteId: number }> {
        return this.http.post<{ message: string; favoriteId: number }>(this.favoritesUrl, { userId, assetId });
    }

    // ✅ Método para remover um favorito
    removeFavorito(userId: number, assetId: number): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.favoritesUrl}/${userId}/${assetId}`);
    }
}
