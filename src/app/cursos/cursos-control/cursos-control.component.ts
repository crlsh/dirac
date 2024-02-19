import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // servicios modal
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { CursosFormComponent } from '../cursos-form/cursos-form.component';


@Component({
  selector: 'app-cursos-control',
  template: `

  <app-cursos-view
  [mostrarVista]="mostrarVista"
    [data]="data$"
    (newItemEvent)="getMsg($event)"
  ></app-cursos-view>
`,

  styleUrls: ['./cursos-control.component.scss']
})
export class CursosControlComponent implements OnInit {

  componente: string = 'cursos';
  data$!: any;


  // el input determina el comportamiento del componente, como crud o como auxiliar de otro

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
    private storage: StorageService,
  ) { }

  ngOnInit(): void {
    this.data$ = this.storage.cursos$;
    console.log("cursos component", this.data$)

  }

  getMsg(msg: any) {
    // console.log(msg, 'from parent');
    this.openForm(msg.op, msg.item);
  }

  openForm(modo: string, item: any) {
    {
      const modalRef = this.modalService.open(CursosFormComponent, {
        windowClass: 'myCustomModalClass',
        //  centered: true,
        size: 'xs',
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
        (reason) => { }
      );
    }
  }

  // seleccionar operacion CRUD

  selectCrudOp(op: string, item: any): void {
    const operaciones: { [key: string]: () => void } = {
      'Agregar': () => this.storage.addItem(this.componente, item),
      'Editar': () => this.storage.updateItem(this.componente, item),
      'Eliminar': () => this.storage.deleteItem(this.componente, item),
      'default': () => { /* console.log('sin operacion en case crud'); */ }
    };

    const operacion = operaciones[op] || operaciones['default'];
    operacion();
  }

}



