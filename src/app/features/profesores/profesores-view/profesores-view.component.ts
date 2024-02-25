import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores-view',
  templateUrl: './profesores-view.component.html',
  styleUrls: ['./profesores-view.component.scss']
})
export class ProfesoresViewComponent implements OnInit {

 
  @Input() mostrarVista: boolean = false;
  @Input() data?: any 
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'profesores';
  cursos: string = 'Cursos';
  alumnos:string = 'Alumno';
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


  setDataTableOptions() {
    if (this.mostrarVista) {
      this.dtOptions = {
        // configuración específica para la vista completa
        // por ejemplo, con búsqueda, con ordenamiento, etc.
        dom: 't<"bottom"riflp><"clear">',
        language: LanguageApp.spanish_datatables,
        columnDefs: [
          { orderable: false, targets: [2] },
          { searchable: false, targets: [2] },
        ],
      };
    } else {
      this.dtOptions = {
        // configuración específica para la vista completa
        // por ejemplo, con búsqueda, con ordenamiento, etc.
        dom: 't<"bottom"riflp><"clear">',
        language: LanguageApp.spanish_datatables,
        columnDefs: [
          { orderable: false, targets: [5] },
          { searchable: false, targets: [5] },
        ],
      };
    }
  }

 
 


}