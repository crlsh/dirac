import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Cursos } from 'src/app/interfaces/cursos';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item: Cursos;
  soloVista: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,

    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    {
      console.log('on init form', this.fromParent);
      this.titulo = this.fromParent.modo;
      this.item = this.fromParent.item;
      switch (this.titulo) {
        case 'Agregar': {
          break;
        }
        case 'Editar': {
          this.item = this.fromParent.item;
          this.configureForm(this.titulo, this.item);
          break;
        }
        case 'Mostrar': {
          this.item = this.fromParent.item;
          this.configureForm(this.titulo, this.item);
          this.soloVista = true;
          break;
        }
        case 'Eliminar': {
          this.item = this.fromParent.item;
          this.closeModal();
          break;
        }
      }
    }
  }

  configureForm(_titulo: string, item: any) {
    // console.log("configure form", titulo, item), (titulo !=='agregar');
    this.editForm.patchValue({

      nombre: item.nombre,
      inicio: item.inicio,
      fin: item.fin,
      profesor: item.profesor,
      costo: item.costo,
      id: item.id,
    });
  }

  createForm() {
      this.editForm = this.fb.group({
        nombre: ['', Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
        inicio: [''],
        fin: [''],
        profesor: ['', Validators.pattern(/^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/)],
      costo: ['', Validators.pattern(/^[0-9]{5,10}$/)],
        id: [''],
      });
  }

  closeModal() {
    if (this.titulo === 'Eliminar') {
      let value = {
        op: this.titulo,
        item: this.item,
      };
      this.activeModal.close(value);
    } else {
      let value = {
        op: this.titulo,
        item: this.editForm.value,
      };
      this.activeModal.close(value);
    }

    /*console.log("closemodal", value)
 this.activeModal.close(value); */
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
    //console.log(msg, 'from vehiculos-form');
    /* let value = {
    op: msg.op,
    item: msg.item
    
  }; */

    //console.log('closemodal', msg);
    this.activeModal.close(msg);
  }

  guardarDatos() {
    if (this.titulo === 'Agregar') {
      Swal.fire({
        title: '¿Desea guardar el cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.closeModal(); //cierra el modal
        }
      });
    } else {
      Swal.fire({
        title: '¿Desea guardar los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.closeModal(); //cierra el modal
        }
      });
    }
  }
}
