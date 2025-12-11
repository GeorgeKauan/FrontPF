import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotinasListComponent } from './rotinas-list.component';

describe('RotinasList', () => {
  let component: RotinasListComponent;
  let fixture: ComponentFixture<RotinasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RotinasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RotinasListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
