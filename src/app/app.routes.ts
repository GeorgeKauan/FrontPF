import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AtivosListComponent } from './pages/ativos/ativos-list/ativos-list.component';
import { RotinasListComponent } from './pages/rotinas/rotinas-list/rotinas-list.component';
import { authGuard } from './core/guards/auth-guard'; 
import { InteligenteAtivosListComponent } from './pages/ativos/inteligente-ativos-list/inteligente-ativos-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'PeleNativa - Home' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'cadastro', component: CadastroComponent, title: 'Cadastro' },
  { path: 'ativos', component: AtivosListComponent, title: 'Explorar Ativos' },
  { path: 'inteligente-ativos', component: InteligenteAtivosListComponent, title: 'Busca Inteligente de Ativos' },

  {
    path: 'minhas-rotinas',
    component: RotinasListComponent,
    canActivate: [authGuard], 
    title: 'Minhas Rotinas'
  },
  
  { path: '**', redirectTo: '' }
];