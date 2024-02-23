import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cursos } from 'src/app/interfaces/cursos';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/servicios/storage/storage.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CursosFormComponent implements OnInit {
  @Input() fromParent: any;
  editForm: any;
  titulo: string;
  item: Cursos;
  diasSemana: string[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];
  modoEdicion = false; // Variable para controlar el modo de vista del formulario
  alumnos$!: any;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.createFormVacio();
    this.titulo = this.fromParent.modo;
    this.item = this.fromParent.item;
    this.handleTitle(this.titulo);
    this.alumnos$ = this.storage.alumnos$;
  }

  handleTitle(titulo: string) {
    switch (titulo) {
      case 'Agregar':
        break;
      case 'Editar':
      case 'Mostrar':
        this.configureForm();
        // if (titulo === 'Mostrar') this.soloVista = true;
        break;
      case 'Eliminar':
        this.closeModal();
        break;
    }
  }

  createFormVacio() {
    this.editForm = this.fb.group(
      {
        nombre: [
          { value: '', disabled: !this.modoEdicion },
          Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),
        ],
        inicio: [
          { value: '', disabled: !this.modoEdicion },
          Validators.required,
        ],
        fin: [{ value: '', disabled: !this.modoEdicion }, Validators.required],
        profesor: [
          { value: '', disabled: !this.modoEdicion },
          Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/),
        ],
        costo: [
          { value: '', disabled: !this.modoEdicion },
          Validators.pattern(/^[0-9]{5,10}$/),
        ],
        id: [''],
        horarios: this.fb.array([]),
      },
      { validators: this.fechaInicioAntesDeFinValidator }
    );
  }

  configureForm() {
    // Actualiza los valores del item en el formulario
    this.editForm.patchValue({
      nombre: this.item.nombre,
      inicio: this.item.inicio,
      fin: this.item.fin,
      profesor: this.item.profesor,
      costo: this.item.costo,
      id: this.item.id,
    });
    // Llenar el FormArray de horarios con los datos recibidos
    this.item.horarios.forEach((horario: any) => {
      this.agregarHorario(horario);
    });
    // Deshabilitar el formulario al principio si está en modo de vista
    if (!this.modoEdicion) {
      this.editForm.disable();
    }
  }

  agregarHorario(horario?: any) {
    const horarioGroup = this.fb.group({
      dia: [horario ? horario.dia : '', Validators.required],
      horaInicio: [horario ? horario.horaInicio : '', Validators.required],
      horaFin: [horario ? horario.horaFin : '', Validators.required],
    });
    this.horarios.push(horarioGroup);
  }

  quitarHorario(index: number) {
    this.horarios.removeAt(index);
  }

  get horarios() {
    return this.editForm.get('horarios') as FormArray;
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

  cambiarModoEdicion() {
    this.modoEdicion = !this.modoEdicion;

    // Habilitar o deshabilitar el formulario según el modo de edición
    if (this.modoEdicion) {
      this.titulo = 'Editar';
      this.editForm.enable();
    } else {
      this.editForm.disable();
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
