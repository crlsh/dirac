import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // servicios modal
import { EstadoCajaService } from 'src/app/servicios/caja/estado-caja.service';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { AlumnosFormComponent } from '../alumnos-form/alumnos-form.component';

@Component({
  selector: 'app-alumnos-control',
  template: `

  <app-alumnos-view
    [data]="data$"
    [mostrarVista]="mostrarVista"
    (newItemEvent)="getMsg($event)"
  ></app-alumnos-view>
`,
styleUrls: ['./alumnos-control.component.scss'],
})

export class AlumnosControlComponent implements OnInit {

  componente: string = 'alumnos';
  data$!: any;
  $modoCaja: any;


  
  @Input() mostrarVista: boolean = false;
  mensaje: string = 'Mensaje predeterminado';

  ngOnChanges(changes: SimpleChanges) {
    console.log('Cambios en mostrarVista:', changes);
    if (changes['mostrarVista']) {
      this.actualizarMensaje(changes['mostrarVista'].currentValue);
    }
  }

  private actualizarMensaje(valor: boolean): void {
    this.mensaje = valor ? 'Mostrando vista' : 'No mostrando vista';
  }


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private storage: StorageService,
    private estadoCaja: EstadoCajaService
  ) {}

  ngOnInit(): void {
    this.data$ = this.storage.alumnos$;

  }

  getMsg(msg: any) {
    // console.log(msg, 'from parent');
    this.openForm(msg.op, msg.item);
  }

  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(AlumnosFormComponent, {
        windowClass: 'myCustomModalClass',
      /*   centered: true,
        size: 'lg', */
      });

      let info = {
        modo: modo,
        item: item,
      };

      modalRef.componentInstance.fromParent = info;
      modalRef.result.then(
        (result) => {

          this.selectCrudOp(result.op, result.item);
        },
        (reason) => {}
      );
    }
  }

  // seleccionar operacion CRUD

  selectCrudOp(op: string, item: any) {
    switch (op) {
      case 'Agregar': {
        this.storage.addItem(this.componente, item);
        break;
      }

      case 'Editar': {
        this.storage.updateItem(this.componente, item);
        break;
      }
      case 'Eliminar': {
        this.storage.deleteItem(this.componente, item);
        break;
      }
      case 'Vehiculo': {
        //this.delete( item.id);
        break;
      }
      case 'Vehiculo Agregar': {
        //console.log("llega aca?");
        this.storage.addItem('vehiculos', item);
        break;
      }
      case 'Vehiculo Editar': {
        
        //console.log("vehiculo editar", item)
        this.storage.updateItem('vehiculos', item);
        break;
      }
      case 'Vehiculo Eliminar': {
        this.storage.deleteItem('vehiculos', item);
        break;
      }

      case 'Mostrar': {
        //NO HACE NADA, SOLO MUESTRA
        break;
      }

      default: {
        //console.log('sin operacion en case crud');
        break;
      }
    }
  }
}



