import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, } from '@angular/forms';

import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { PlayaI } from 'src/app/interfaces/playaI'
import * as moment from 'moment';
import { Tarifas } from 'src/app/interfaces/tarifas';
import { Fechas } from 'src/app/interfaces/fechas';
import { ValidarPatenteService } from 'src/app/servicios/patentes/validar-patente.service';
import { CalculoFechasService } from 'src/app/servicios/Fechas/calculo-fechas.service';
import { EstadiaService } from 'src/app/servicios/facturacion/estadia.service';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-playa-form',
  templateUrl: './playa-form.component.html',
  styleUrls: ['./playa-form.component.css']
})
export class PlayaFormComponent implements OnInit {

  @Input() fromParent: any;
  editForm!: any;
  titulo!: string;
  item!: any;
  fecha!:Date;
  fechas: Fechas = {
    fechaDate : "",
    fechaIngreso: "",
    horaIngreso: "",
    fechaSalidaDate: "",
    fechaSalida: "",
    horaSalida: "",
    estadia:0,

};  
  fechaIngreso!:any;
  horaIngreso!:any;
  tarifas!: Tarifas [];
  componenteTarifas: string = "tarifas"
  puestoEstacionamiento!: any;
  tarifaSeleccionada!: Tarifas;
  saldo!:number;
  patenteNueva!: boolean;
  patentesPlaya!:any;
  clienteExiste:any;  

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private validacionPatente: ValidarPatenteService, private fechaService: CalculoFechasService, private estadiaService :EstadiaService, private clientesService: ClientesService
  ) {
   this.createForm();
  }

  puestoPlaya: PlayaI = {
    id: 1,
    patente: "fht231",
    fechas: {
      fechaDate: "Tue Oct 25 2022 15:09:31 GMT-0300 (hora estándar de Argentina)",
      fechaIngreso: "25-10-2022",
      horaIngreso: "15:17:23",
      fechaSalidaDate: "",
      fechaSalida: "",
      horaSalida: "",
      estadia: 0,
    },
    tarifa:{
      id: 4,
      nombre: "camioneta-basico",               // nombre de la tarifa 
      categoria: "camioneta",            // tipo de vehiculo
      fraccion: 30,             // fraccion minima de facturacion
      unidad_tiempo: "min",        // minutos, horas, dias, semanas, mes
      valor: 180,                
      tolerancia: 5,           // rango de tolerancia
    },
    descripcion: "Scania 1114",
    saldo: 0,
    codigoBarras: "fht231-15:17:23"
  };

  ngOnInit(): void {
    this.getTarifas();
    //this.getPlaya();                                                    //se traen las tarifas    
    {
      //console.log("on init form", this.fromParent);
      this.titulo = this.fromParent.modo
      this.item = this.fromParent.item;
      this.editForm.value.patente = this.fromParent.item.patente;
      //console.log(this.editForm.patente);
      
      //console.log(`esto es el item que recibe: ${this.fromParent.item.patente}`);
      //console.log(`esto es el form patente: ${this.editForm.patente}`);
      
      if(this.titulo === 'Agregar'){  
                                        //si es un ingreso nuevo, se llama a la funcion para configurar la fecha       
        /* this.getClientes();
        this.getVehiculos();  */
        //this.validarPatente();
        this.saldo = 0;
        this.item.id = "";
        this.getPlaya();
        this.configurarFecha();       
        //this.buscarPatente()
        this.buscarCliente();         
      } 
      //else if (this.titulo === 'Editar')
      else
      {                           //si es una edicion, se guardan las fechas y las tarifas y se llama a la funcion para configurar form
        //this.item = this.fromParent.item;
        this.saldo = 0;
        this.tarifaSeleccionada = this.item.tarifa;
        this.fechas = this.item.fechas;
        this.configurarForm();
        //this.validarPatente();
      }
     

    }    
   
   
  }

  createForm() {                                               
    this.editForm = this.fb.group({
      patente: ['',  [Validators.required, Validators.minLength(6), this.validacionPatente.evaluarPatente()]],  
      descripcion: [''],          
    });   
  }

  get Patente(){
    return this.editForm.get("patente")
  }

  configurarForm(){                                                          //se configura el form con los datos del objeto
    this.editForm.patchValue({ 
      patente: this.item.patente,
      descripcion: this.item.descripcion,
    })
  }

  guardarDatos(){
    /* if(this.titulo === 'Agregar'){                                      //si es un ingreso nuevo, valida la patente
     this.validarPatente() ;     
    } else 
    // if (this.titulo === "Editar")
    { 
                                     //si es una edicion, se arma el puesto con los nuevos datos
      this.armarPuestoEstacionamiento()      
    } */
    switch (this.titulo) {
      case 'Agregar': {  
        this.validarTarifa() ;  
        break;
      }      
      case 'Editar': {  
        //this.validarPatente() ;
        this.getPlaya();          
        this.validarTarifa();
        
        break;
      }
      case 'Eliminar': {  
        this.pruebaCierreHora();
        break;
      }
      case 'Reimprimir': {  
        this.armarPuestoEstacionamiento() ;   
        break;
      }
      default: {
        //console.log("algo se rompio")
        break;
      }

}
}

Automatico(){
  let value = {
    op: "Agregar",
    item: this.puestoPlaya
    
  };
   //console.log("closemodal", value)
  this.activeModal.close(value);
}

closeModal() {
    //console.log(this.puestoEstacionamiento);
    
   let value = {
   op: this.titulo,
   item: this.puestoEstacionamiento,
   
 };
  console.log("closemodal", value)
 this.activeModal.close(value);
} 


validarPatente(){   
  
  //console.log(`esto es dentro de validarPatente: ${this.editForm.patente}`);
  
  let patenteValida = this.validacionPatente.validarPatente(this.editForm.value.patente);

  if(patenteValida){
    alert("es una patente valida")
    //this.validarTarifa()
  }else{
    alert("no es una patente valida")
    this.activeModal.dismiss()
  }

}

 validarTarifa(){

    if(this.tarifaSeleccionada !== undefined){
      this.armarPuestoEstacionamiento();
    } else {
      alert("no elegiste la tarifa");
    }
 }

 buscarPatente(){
  //console.log(this.patentesPlaya);
  
  this.patenteNueva = this.validacionPatente.buscarPatentePlaya(this.editForm.value.patente, this.patentesPlaya);
  if(this.patenteNueva){
    //this.validarPatente()
  }else{
    alert("esta patente ya fue ingresada")   
    //this.titulo = "";
    //this.puestoEstacionamiento.patente = this.fromParent.item.patente
    //console.log(this.puestoEstacionamiento);
    
    this.activeModal.dismiss()

  }
 }

configurarFecha(){
                                                                       
  this.fecha = this.fechaService.fechaActual();                                                        // toma la fecha actual    
  //console.log(this.fecha);

  this.fechas.fechaIngreso = this.fechaService.fechaDia(this.fecha);                      // desgloza la fecha en formato (DD/MM/YYYY) y la guarda en el objeto fechas
  //console.log(this.fechas.fechaIngreso);

  this.fechas.horaIngreso = this.fechaService.fechaHora(this.fecha);                     // desgloza la fecha en formato (hh:mm:ss) y la guarda en el objeto fechas
  //console.log(this.fechas.horaIngreso);

  this.fechas.fechaDate = this.fecha.toString()
  ////console.log(this.fechas.fechaDate);
  

} 

pruebaCierreHora(){  
 
  //console.log(this.item);  
  //console.log(this.titulo);
  
  this.fechas.fechaSalidaDate = this.fechaService.fechaActual().toString(); // entrega la diferencia entre la fecha ingresada y el momento actual en minutos
  console.log("esta es la fecha de salida: ", this.item.fechas.fechaSalidaDate);

  this.fechas.fechaSalida = this.fechaService.fechaDia(this.item.fechas.fechaSalidaDate);
  console.log("esta es el dia de la salida: ", this.item.fechas.fechaSalida);

  this.fechas.horaSalida = this.fechaService.fechaHora(this.item.fechas.fechaSalidaDate);
  console.log("esta es la de la salida: ", this.item.fechas.horaSalida); 

  this.fechas.estadia = this.fechaService.pruebaCierreHora(this.fechas.fechaDate);
  console.log("esta es la fecha.estadia: ", this.fechas.estadia);


  this.saldoEstadia();
  

  
}

getTarifas()  {
  this.tarifas = JSON.parse(localStorage.getItem("tarifas")||`{}`)
  console.log("estas son las tarifas: ", this.tarifas);  
  
}

changeTarifa(e: any) {
  console.log(e.target.value)    
  let tarifaForm   //crea una variable para usarlo con la funcion filter

  tarifaForm = this.tarifas.filter(function(tarifas:any){       //filter recorre el array tarifas y devuelve otro array con lo que sea q coincida con el parametro
    return tarifas.nombre === e.target.value
  })
  
  this.tarifaSeleccionada = tarifaForm[0];               //se guarda el nombre de la tarifa seleccionada en la variable
  console.log(this.tarifaSeleccionada);
  
}

saldoEstadia( ){ 
  this.saldo = this.estadiaService.saldoEstadia(this.item.tarifa, this.fechas.estadia );

  this.armarPuestoEstacionamiento();
} 

armarPuestoEstacionamiento() {     
  //la funcion arma el puesto
    this.puestoEstacionamiento = {
    id: this.item.id, 
    patente: this.editForm.value.patente,
    fechas: this.fechas,
    tarifa : this.tarifaSeleccionada,
    descripcion:this.editForm.value.descripcion,
    saldo: this.saldo,
    codigoBarras: `${ this.fromParent.item.patente}-${this.fechas.fechaIngreso}-${this.fechas.horaIngreso}`
  }  
  //if (tarifa="undifined"){


  
  this.item= this.puestoEstacionamiento;;                         //gurda el puesto en "item" para poder enviarlo
  //console.log("este es el item final: ", this.puestoEstacionamiento)
  this.closeModal();
}

getPlaya()  {
  //console.log("pasa por aca?");
  
  /* this.servicioDatosService.getAll("playa").subscribe (
    datos => {this.patentesPlaya = datos;
    console.log("get all Playa", this.patentesPlaya)  
    this.buscarPatente()
    }      
  ); */
  this.patentesPlaya = JSON.parse(localStorage.getItem("playa")||`{}`)
  //console.log(this.patentesPlaya);  
  this.buscarPatente()
  
}

buscarCliente(){
  /* console.log(this.vehiculos);
  console.log(this.clientes); */
  let consulta = this.clientesService.buscarPatente(this.fromParent.item.patente); 
  console.log(consulta);

  if(consulta.clienteExiste){                         //este camino es si el cliente existe en la base de datos
    //console.log(consulta.datosCliente);
    this.clienteExiste = consulta.datosVehiculo;
    //console.log(this.clienteExiste);
    
    this.tarifaSeleccionada = this.buscarTarifa(this.clienteExiste.idTarifa);
    console.log(this.tarifaSeleccionada);

    
  
    this.armarPuestoEstacionamiento()

  }else{                                              //este camino es si el cliente NO existe en la base de datos
    this.editForm.patchValue({ 
      patente: this.fromParent.item.patente,
      descripcion: "",
    })
  }

  
  
}

buscarTarifa(id:number){
  let tarifas = JSON.parse(localStorage.getItem("tarifas")||`{}`)

  tarifas = tarifas.filter(function(tarifa:any){
    return tarifa.id === id;
  }); 
  //console.log(tarifas[0]);
  
  return tarifas[0]
}
  
}
