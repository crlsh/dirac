// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

// @Component({
//   selector: 'app-horarios-form',
//   templateUrl: './horarios-form.component.html',
//   styleUrls: ['./horarios-form.component.scss']
// })
// export class HorariosFormComponent implements OnInit {

//   cursoForm: FormGroup;

//   diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.cursoForm = this.fb.group({
//       nombre: ['', Validators.required],
//       horarios: this.fb.array([])
//     });
//   }

//   agregarHorario() {
//     const horarioGroup = this.fb.group({
//       dia: ['', Validators.required],
//       horaInicio: ['', Validators.required],
//       horaFin: ['', Validators.required]
//     });
//     this.horarios.push(horarioGroup);
//   }

//   quitarHorario(index: number) {
//     this.horarios.removeAt(index);
//   }

//   get horarios() {
//     return this.cursoForm.get('horarios') as FormArray;
//   }

//   onSubmit() {
//     if (this.cursoForm.valid) {
//       console.log(this.cursoForm.value);
//     } else {
//       console.log('Formulario inválido');
//     }
//   }
// }


import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-horarios-form',
  templateUrl: './horarios-form.component.html',
  styleUrls: ['./horarios-form.component.scss']
})
export class HorariosFormComponent implements OnInit {

  @Input() jsonData: any; // Input para recibir el JSON de los horarios

  cursoForm: FormGroup;
  diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  modoEdicion = false; // Variable para controlar el modo de vista del formulario

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.cursoForm = this.fb.group({
      nombre: [this.jsonData.nombre, Validators.required],
      horarios: this.fb.array([])
    });

    // Llenar el FormArray de horarios con los datos recibidos
    this.jsonData.horarios.forEach((horario: any) => {
      this.agregarHorario(horario);
    });

    // Deshabilitar el formulario al principio si está en modo de vista
    if (!this.modoEdicion) {
      this.cursoForm.disable();
    }
  }

  agregarHorario(horario?: any) {
    const horarioGroup = this.fb.group({
      dia: [horario ? horario.dia : '', Validators.required],
      horaInicio: [horario ? horario.horaInicio : '', Validators.required],
      horaFin: [horario ? horario.horaFin : '', Validators.required]
    });
    this.horarios.push(horarioGroup);
  }

  quitarHorario(index: number) {
    this.horarios.removeAt(index);
  }

  get horarios() {
    return this.cursoForm.get('horarios') as FormArray;
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      console.log(this.cursoForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  cambiarModoEdicion() {
    this.modoEdicion = !this.modoEdicion;

    // Habilitar o deshabilitar el formulario según el modo de edición
    if (this.modoEdicion) {
      this.cursoForm.enable();
    } else {
      this.cursoForm.disable();
    }
  }
}
