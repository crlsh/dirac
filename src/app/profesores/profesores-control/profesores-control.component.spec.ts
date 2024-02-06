import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresControlComponent } from './profesores-control.component';

describe('ProfesoresControlComponent', () => {
  let component: ProfesoresControlComponent;
  let fixture: ComponentFixture<ProfesoresControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesoresControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
