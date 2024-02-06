import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos-view',
  templateUrl: './alumnos-view.component.html',
  styleUrls: ['./alumnos-view.component.scss']
})
export class AlumnosViewComponent implements OnInit {

 

  @Input() data?: any 
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'clientes';
  vehiculo: string = 'Vehiculo';
  dtOptions: DataTables.Settings = {};
  msg: any
  




  constructor(private storageService: StorageService,) { }
  
  ngOnInit(): void {
    this.setDataTableOptions();
    
}


  msgBack(op: string, item: any) {    
    let value = {
      op: op,
      item: item,
    }
    if(op === 'Eliminar'){
      Swal.fire({
        title: '¿Desea eliminar el cliente?',
        text: "No podrá revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.newItemEvent.emit(value);
        }
      })
    }else{
      //console.log(value);
      
      this.newItemEvent.emit(value);
    }
  }


setDataTableOptions(){
  this.dtOptions = {
    // searching: false,
    dom: 't<"bottom"riflp><"clear">',
    language: LanguageApp.spanish_datatables,
    columnDefs: [
      { orderable: false, targets: [7] },
      { searchable: false, targets: [7] },
      /* { width: '3rem', targets: 0}, */
  ]
  };
}

 
 


}