import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAtivoComponent } from './card-ativo.component';

describe('CardAtivo', () => {
  let component: CardAtivoComponent;
  let fixture: ComponentFixture<CardAtivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAtivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAtivoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
