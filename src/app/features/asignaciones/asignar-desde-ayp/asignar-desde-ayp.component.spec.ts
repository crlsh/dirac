import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarDesdeAypComponent } from './asignar-desde-ayp.component';

describe('AsignarDesdeAypComponent', () => {
  let component: AsignarDesdeAypComponent;
  let fixture: ComponentFixture<AsignarDesdeAypComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarDesdeAypComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarDesdeAypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
