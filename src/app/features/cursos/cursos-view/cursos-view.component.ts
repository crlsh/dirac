import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { StorageService } from 'src/app/servicios/storage/storage.service';
import { LanguageApp } from 'src/app/shared/DTLanguage';
import Swal from 'sweetalert2';

declare var $: any; // Declaramos la variable $ para acceder a jQuery y DataTables

@Component({
  selector: 'app-cursos-view',
  templateUrl: './cursos-view.component.html',
  styleUrls: ['./cursos-view.component.scss'],
})
export class CursosViewComponent implements OnInit, OnChanges, AfterViewInit {
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
    // No inicializamos DataTables aquí
  }

  ngOnChanges(changes: SimpleChanges): void {
    // No inicializamos DataTables aquí
  }

  ngAfterViewInit(): void {
    // Inicializamos DataTables aquí después de que la vista se haya cargado
    this.setDataTableOptions();
    $('#dataTable').DataTable(this.dtOptions); // Inicializamos DataTables
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
      this.newItemEvent.emit(value);
    }
  }

  someClickHandler(info: any): void {
    console.log(info, 'from datatable');
  }

  setDataTableOptions() {
    this.dtOptions = {
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
        { orderable: false, targets: [4] },
        { searchable: false, targets: [4] },
      ],
    };
  }
}
