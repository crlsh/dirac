import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  timeInicio: {hour: number, minute: number};
  diasSemana:string[]= ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', ];

  diasHoras: any[] = []; // Lista para almacenar los días y horas seleccionados


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.titulo = this.fromParent.modo;
    this.item = this.fromParent.item;
    this.handleTitle(this.titulo);
    this.timeInicio = {hour: 12, minute: 0};
  }

  handleTitle(titulo: string) {
    switch (titulo) {
      case 'Agregar':
        break;
      case 'Editar':
      case 'Mostrar':
        this.configureForm();
        if (titulo === 'Mostrar') this.soloVista = true;
        break;
      case 'Eliminar':
        this.closeModal();
        break;
    }
  }


  agregarDiaHora() {
    // Agrega un nuevo objeto vacío a la lista de días y horas
    this.diasHoras.push({});
  }

  eliminarDiaHora(index: number) {
    // Elimina el día y la hora en la posición index de la lista
    this.diasHoras.splice(index, 1);
  }
  configureForm() {
    this.editForm = this.fb.group({
      nombre: [this.item.nombre, Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      inicio: [this.item.inicio, Validators.required],
      fin: [this.item.fin, Validators.required],
      profesor: [this.item.profesor, Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      costo: [this.item.costo, Validators.pattern(/^[0-9]{5,10}$/)],
      id: [this.item.id],
      horaInicio: ['', Validators.required],
      horaFin: [''], // También para la hora de fin
      diaSemana: ['']
    }, { validators: this.fechaInicioAntesDeFinValidator }); // <-- Usa this.fechaInicioAntesDeFinValidator
  }

  // Define la función de validación personalizada dentro de la clase del componente
  fechaInicioAntesDeFinValidator(formGroup: FormGroup<any>) {
    const inicioControl = formGroup.get('inicio');
    const finControl = formGroup.get('fin');
  
    // Verifica si los controles de inicio y fin no son null antes de acceder a sus valores
    if (inicioControl && finControl && inicioControl.value && finControl.value) {
      const inicio = inicioControl.value;
      const fin = finControl.value;
  
      if (new Date(inicio) >= new Date(fin)) {
        inicioControl.setErrors({ 'fechaInvalida': true });
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

  get Nombre() {
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
