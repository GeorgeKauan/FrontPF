import { Routes } from '@angular/router';

// 1. HOME: Caminho corrigido para "./"
import { HomeComponent } from './pages/home/home.component';

// 2. LOGIN: Removida a pasta 'auth/' e corrigido para "./"
import { LoginComponent } from './pages/login/login.component';

// 3. CADASTRO: Removida a pasta 'auth/' e corrigido para "./"
import { CadastroComponent } from './pages/cadastro/cadastro.component';

// 4. ATIVOS: Corrigido o caminho para "./"
import { AtivosListComponent } from './pages/ativos/ativos-list/ativos-list.component';

// 5. ROTINAS: Corrigido o caminho para "./" e REMOVIDA A EXTENSÃO ".ts" (Isso resolve o TS(5097))
import { RotinasListComponent } from './pages/rotinas/rotinas-list/rotinas-list.component';

// 6. GUARD: O nome do arquivo no disco é "auth-guard.ts". O nome do export é 'authGuard'.
import { authGuard } from './core/guards/auth-guard'; 


export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'PeleNativa - Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'cadastro', component: CadastroComponent, title: 'Cadastro' },
  { path: 'ativos', component: AtivosListComponent, title: 'Explorar Ativos' },

  // Rotas Protegidas
  {
    path: 'minhas-rotinas',
    component: RotinasListComponent,
    canActivate: [authGuard], 
    title: 'Minhas Rotinas'
  },
  
  { path: '**', redirectTo: '' }
];