import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosViewComponent } from './cursos-view.component';

describe('CursosViewComponent', () => {
  let component: CursosViewComponent;
  let fixture: ComponentFixture<CursosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
