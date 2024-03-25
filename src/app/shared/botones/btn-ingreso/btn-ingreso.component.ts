import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-ingreso',
  template: `
      <button class="btn btn-success align-middle" style="border-radius: 10%; margin: 10px;" [disabled]="disabled">
      <i       
        class="fa fa-plus"
        style=" vertical-align: middle;"
      ></i>
      {{ name || 'Agregar' }}
      </button>
    `,
  
    styles: [`
 
    `],
})
export class BtnIngresoComponent implements OnInit {

  @Input() name?: string;
  @Input() disabled!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
