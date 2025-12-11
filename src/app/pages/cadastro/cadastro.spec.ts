import { ComponentFixture, TestBed } from '@angular/core/testing';

// 🚨 CORREÇÃO CRÍTICA: Importando o componente com o nome correto e caminho local
import { CadastroComponent } from './cadastro.component'; 

// Importe o módulo de rotas para teste se for necessário
import { RouterTestingModule } from '@angular/router/testing'; 

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se for standalone, importe o componente diretamente, e adicione módulos necessários
      imports: [CadastroComponent, RouterTestingModule] 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});