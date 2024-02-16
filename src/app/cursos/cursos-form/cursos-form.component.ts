import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/interfaces/cursos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  @Input() fromParent: any;
  editForm: any;
  titulo: string;
  item: Cursos;
  soloVista = false;

  // jsonData = {
  //   "nombre": "Curso de Angular",
  //   "horarios": [
  //     {
  //       "dia": "Lunes",
  //       "horaInicio": "08:00",
  //       "horaFin": "10:00"
  //     },
  //     {
  //       "dia": "Miércoles",
  //       "horaInicio": "14:30",
  //       "horaFin": "16:30"
  //     }
  //   ]
  // };


  jsonData = {
    "nombre": "Curso de Angular",
    "horarios": [  ]

  
  };





  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.titulo = this.fromParent.modo;
    this.item = this.fromParent.item;
    this.handleTitle(this.titulo);
  }

  handleTitle(titulo: string) {
    switch (titulo) {
      case 'Agregar':
 this.createFormVacio()
        break;
      case 'Editar':
      case 'Mostrar':
        this.createFormVacio()
        this.configureForm();
        if (titulo === 'Mostrar') this.soloVista = true;
        break;
      case 'Eliminar':
        this.closeModal();
        break;
    }
  }


  createFormVacio() {
    this.editForm = this.fb.group({
      nombre: ['', Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      profesor: ['', Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      costo: ['', Validators.pattern(/^[0-9]{5,10}$/)],
      id: [''],
 
    }, { validators: this.fechaInicioAntesDeFinValidator });
  }


  configureForm() {
  // Actualiza los valores del item en el formulario
  this.editForm.patchValue({
    nombre: this.item.nombre,
    inicio: this.item.inicio,
    fin: this.item.fin,
    profesor: this.item.profesor,
    costo: this.item.costo,
    id: this.item.id
  });

 }







  // Define la función de validación personalizada dentro de la clase del componente
  fechaInicioAntesDeFinValidator(formGroup: FormGroup<any>) {
    const inicioControl = formGroup.get('inicio');
    const finControl = formGroup.get('fin');

    // Verifica si los controles de inicio y fin no son null antes de acceder a sus valores
    if (
      inicioControl &&
      finControl &&
      inicioControl.value &&
      finControl.value
    ) {
      const inicio = inicioControl.value;
      const fin = finControl.value;

      if (new Date(inicio) >= new Date(fin)) {
        inicioControl.setErrors({ fechaInvalida: true });
      } else {
        inicioControl.setErrors(null);
      }
    }
  }

  closeModal() {
    const value = {
      op: this.titulo === 'Eliminar' ? this.titulo : this.titulo,
      item: this.titulo === 'Eliminar' ? this.item : this.editForm.value,
    };
    this.activeModal.close(value);
  }

  get nombre() {
    return this.editForm.get('nombre');
  }

  get Inicio() {
    return this.editForm.get('inicio');
  }

  get Fin() {
    return this.editForm.get('fin');
  }

  get Profesor() {
    return this.editForm.get('profesor');
  }

  get Costo() {
    return this.editForm.get('costo');
  }

  getMsg(msg: any) {
    this.activeModal.close(msg);
  }

  guardarDatos() {
    const title =
      this.titulo === 'Agregar'
        ? '¿Desea guardar el curso?'
        : '¿Desea guardar los cambios?';
    Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.closeModal();
      }
    });
  }
}
