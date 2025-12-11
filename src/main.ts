import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; 
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/tokeninterceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // Configura o HttpClient e adiciona o interceptor para todas as requisições
    provideHttpClient(
        withInterceptors([
            TokenInterceptor 
        ])
    )
  ]
}).catch(err => console.error(err));