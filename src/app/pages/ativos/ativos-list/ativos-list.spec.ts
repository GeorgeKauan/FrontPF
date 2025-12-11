import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivosList } from './ativos-list';

describe('AtivosList', () => {
  let component: AtivosList;
  let fixture: ComponentFixture<AtivosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivosList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
