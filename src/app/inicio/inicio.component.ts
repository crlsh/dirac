import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { StorageService } from '../servicios/storage/storage.service';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  formatosAdmitidos = 'ab123cd, abc123';
  op!: string;
  private code: string = '';
  patenteForm: any;
  searchText!: string;
  msg: any;

  playa$: any;

  constructor(
    config: NgbPopoverConfig,
    private fb: FormBuilder,

    private storageService: StorageService
  ) {
    config.autoClose = 'outside'; // Configuración para cerrar el popover al hacer clic fuera de él


    this.createForm()
  }

  ngOnInit(): void {}

  createForm() {
    this.patenteForm = this.fb.group({
      patente: [
        '',
        [
          Validators.required,
          Validators.minLength(6),

        ],
      ],
    });
  }

  get Patente() {
    // TOMA EL VALOR DEL CAMPO EN EL FORM
    return this.patenteForm.get('patente');
  }

  //TOMA LA OPERACION DEL BOTON SELECCIONADO EN EL FORM
  setOp(op: string) {
    this.op = op;
  }

  // FUNCION QUE TOMA EL DATO INGRESADO EN EL CAMPO
  // AL PULSAR ENTER O CUALQUIERA DE LOS BOTONES DE INGRESO O EGRESO



  // SI ON SUBMIT RECONOCE UN TICKET, ONSCAN  CHEQUEA QUE ESTE AUTO EN PLAYA
  // PORQUE PUEDE SER UN TICKET VIEJO

  onScan(code: string) {
    let playa = this.playa$;

    //recorre playa buscando barcode
    for (var it of playa) {
       //console.log("on Scan" ,it);

      let cod = it['codigoBarras'];
      let pat = it['patente'];
      // console.log(cod, pat);

      if (code === cod) {
     //    console.log('esta en playa', pat);
        this.msgBack("Eliminar", String(pat));
        break;
      } else {
        // console.log('NO esta en playa');
      }
    }
  }

  msgBack(op: string, str: string) {
    // ENVIA EL CONT DEL FORM AL PARENT
    let value = {
      op: op,
      item: { patente: str }, // antes    item: this.patenteForm.value,  -> chequear foramto
    };
    console.log('MSGbACK, aca emite el msj con el valor ', value);
    this.newItemEvent.emit(value);
    this.patenteForm.reset();
  }

  confirmarEgresoBC(str: string) {
    Swal.fire({
      title: '¿Desea realizar la salida del vehículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
      //  console.log('submitted barcode para egreso');
        this.onScan(str); //va a chequear el scan
      } else {
      //  console.log('operacion cancelada');
      }
    });
  }

  confirmarEgresoPat(str: string) {
    Swal.fire({
      title: '¿Desea realizar la salida del vehículo?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('submited patente para egreso');
        this.msgBack(this.op, str); //manda el form al parent
      } else {
       // console.log('Egreso cancelado');
      }
    });
  }

  confirmarIngresoPat(str: string) {
    Swal.fire({
      title: '¿Desea realizar el ingreso del vehículo?',
      //text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> ',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      // confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log('submited patente para ingreso');
        this.msgBack(this.op, str); //manda el form al parent
      } else {
        // console.log('Ingreso cancelado');
      }
    });
  }
}
