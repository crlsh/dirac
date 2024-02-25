import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosViewComponent } from './alumnos-view.component';

describe('AlumnosViewComponent', () => {
  let component: AlumnosViewComponent;
  let fixture: ComponentFixture<AlumnosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
