import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component'; // Corrigido o caminho de importação!
import { RouterTestingModule } from '@angular/router/testing'; // Necessário para testes com rotas

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule] // Usa o componente standalone e o módulo de rotas para teste
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta mudanças (chama o ngOnInit)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});