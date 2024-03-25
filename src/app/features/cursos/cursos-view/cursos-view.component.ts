import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-view',
  templateUrl: './cursos-view.component.html',
  styleUrls: ['./cursos-view.component.scss'],
})
export class CursosViewComponent implements OnInit {
  @Input() data?: any;
  @Output() newItemEvent = new EventEmitter<any>();
  titulo: string = 'cursos';
  profesor: string = 'Profesor';
  alumnos: string = 'Alumno';
  horario: string = 'Horario';
  dtOptions: DataTables.Settings = {};
  msg: any;



  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.setDataTableOptions();
  }
  ngAfterViewInit(): void {
    this.setDataTableOptions();
  }
  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    };
    if (op === 'Eliminar') {
      Swal.fire({
        title: '¿Desea eliminar el curso?',
        text: 'No podrá revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.newItemEvent.emit(value);
        }
      });
    } else {
      //console.log(value);

      this.newItemEvent.emit(value);
    }
  }


  someClickHandler(info: any): void {
    console.log( info, 'from datatable')
  }


  setDataTableOptions() {

      this.dtOptions = {
        // configuración específica para la vista completa
        // por ejemplo, con búsqueda, con ordenamiento, etc.
        dom: 't<"bottom"riflp><"clear">',
        language: LanguageApp.spanish_datatables,
        columnDefs: [
          { orderable: false, targets: [4] },
          { searchable: false, targets: [4] },
        ],

      };
      };
    }
  

