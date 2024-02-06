import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosControlComponent } from './cursos-control.component';

describe('CursosControlComponent', () => {
  let component: CursosControlComponent;
  let fixture: ComponentFixture<CursosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
