import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresViewComponent } from './profesores-view.component';

describe('ProfesoresViewComponent', () => {
  let component: ProfesoresViewComponent;
  let fixture: ComponentFixture<ProfesoresViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesoresViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfesoresViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
