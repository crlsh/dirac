import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-eliminar',

  template: `
<button  class="btn btn-primary" style="border-radius: 10%; margin: 10px ; " 
[disabled]=disabled>
  <i class="fa fa-minus"> </i>
  {{name || "Eliminar"}}
</button>
  `,

  styles: [
    `

    `
  ]
})

export class BtnEliminarComponent implements OnInit {

  @Input() name?: string;
  @Input() disabled! : boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
