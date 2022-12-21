import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageApp } from 'src/app/shared/DTLanguage';

@Component({
  selector: 'app-caja-view',
  templateUrl: './caja-view.component.html',
  styleUrls: ['./caja-view.component.scss'],
})
export class CajaViewComponent implements OnInit {
  @Input() data?: any;
  @Input() usuario?: any;
  @Input() cajaLog: any;
  @Input() $estadoCaja: any;

  @Output() newItemEvent = new EventEmitter<any>();
  //titulo: string = 'caja';
  @Input() saldo: number;
  msg: any;
  searchText!: string;
  dtOptions: DataTables.Settings = {};

  constructor() {}

  ngOnInit(): void {
    console.log ("caja View", JSON.stringify(this.cajaLog))
    console.log("data: ", this.data);
    
    //opciones para dataTable
    this.dtOptions = {
      searching: false,
      dom: 't<"bottom"riflp><"clear">',
      language: LanguageApp.spanish_datatables,
      columnDefs: [
        //   { orderable: false, targets: [7,8,9] },
        // { searchable: false, targets: [ 7,8,9] },
      ],
      responsive: true,
    };
  }

  msgBack(op: string, item: any) {
    let value = {
      op: op,
      item: item,
    };
    this.newItemEvent.emit(value);
  }
}
