import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDesdeCursosComponent } from './asignar-desde-cursos.component';

describe('AsignarDesdeCursosComponent', () => {
  let component: AsignarDesdeCursosComponent;
  let fixture: ComponentFixture<AsignarDesdeCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarDesdeCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarDesdeCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
