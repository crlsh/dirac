import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experimento',
  templateUrl: './experimento.component.html',
  styleUrls: ['./experimento.component.scss']
})
export class ExperimentoComponent implements OnInit {

  modoEditar = false;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  alumnosTodos = [
    { id: 1, nombre: 'Juan', apellido: 'Perez', idCursos: [1, 2] },
    { id: 2, nombre: 'María', apellido: 'Gomez', idCursos: [2] },
    { id: 3, nombre: 'Pedro', apellido: 'Rodriguez', idCursos: [1] }
  ];

  alumnosEnElCurso = [
    { id: 1, nombre: 'Juan', apellido: 'Perez' },
    { id: 3, nombre: 'Pedro', apellido: 'Rodriguez' }
  ];

  get alumnosNoEnElCurso() {
    return this.alumnosTodos.filter(alumno => !this.alumnosEnElCurso.some(a => a.id === alumno.id));
  }

  quitarCurso(alumno: { id: number; }) {
    this.alumnosEnElCurso = this.alumnosEnElCurso.filter(a => a.id !== alumno.id);
  }

  agregarCurso(alumno: { id: number; nombre: string; apellido: string; }) {
    this.alumnosEnElCurso.push(alumno);
  }

  aceptar() {
    console.log('Alumnos en el curso:', this.alumnosEnElCurso);
    console.log('Alumnos no en el curso:', this.alumnosNoEnElCurso);
  }

  cancelar() {
    this.modoEditar = false;
  }

  
}