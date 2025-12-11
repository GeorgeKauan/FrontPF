import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of } from 'rxjs';

export interface User {
    id: number;
    nome: string;
    email: string;
    // Adicione mais campos do usuário, se necessário
}

export interface AuthResponse {
    user: User;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private authUrl = '/api/auth'; // Rota de autenticação
    
    // Sujeitos para monitorar o estado de login
    private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        this.loadUserFromStorage();
    }

    private hasToken(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    private loadUserFromStorage(): void {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
            try {
                this.currentUserSubject.next(JSON.parse(userData));
                this.isLoggedInSubject.next(true);
            } catch (e) {
                this.logout(); // Limpa se os dados estiverem corrompidos
            }
        }
    }

    login(credentials: any): Observable<AuthResponse> {
        // TO-DO: Implementar a chamada HTTP real
        // return this.http.post<AuthResponse>(`${this.authUrl}/login`, credentials).pipe(
        //     tap(res => this.handleAuthResponse(res))
        // );

        // Mock de resposta para fins de compilação:
        const mockResponse: AuthResponse = {
            user: { id: 1, nome: 'Ana Teste', email: credentials.email },
            token: 'mock-jwt-token-12345'
        };

        return of(mockResponse).pipe(
            tap(res => this.handleAuthResponse(res))
        );
    }
    
    /**
     * ADICIONADO: Método para registrar um novo usuário
     */
    register(userData: any): Observable<AuthResponse> {
        // TO-DO: Implementar a chamada HTTP real para /api/auth/register
        // return this.http.post<AuthResponse>(`${this.authUrl}/register`, userData);

        // Mock de resposta para fins de compilação:
        const mockResponse: AuthResponse = {
            user: { 
                id: Math.floor(Math.random() * 1000), 
                nome: userData.nome || 'Novo Usuário', 
                email: userData.email 
            },
            token: 'mock-jwt-token-registered'
        };
        
        // Retorna um Observable com o mock de sucesso (sem chamar handleAuthResponse aqui, apenas no login)
        return of(mockResponse); 
    }

    private handleAuthResponse(res: AuthResponse): void {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_data', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
        this.isLoggedInSubject.next(true);
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        this.currentUserSubject.next(null);
        this.isLoggedInSubject.next(false);
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }
}