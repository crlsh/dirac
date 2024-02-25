import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosControlComponent } from './alumnos-control.component';

describe('AlumnosControlComponent', () => {
  let component: AlumnosControlComponent;
  let fixture: ComponentFixture<AlumnosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
