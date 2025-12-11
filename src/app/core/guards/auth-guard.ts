import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken()) {
    return true; // Usuário logado, pode acessar
  } else {
    // Redireciona para a página de login e salva a URL que ele tentou acessar
    router.navigate(['/login']);
    return false;
  }
};