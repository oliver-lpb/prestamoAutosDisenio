import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-validation-rol',
  templateUrl: './validation-rol.component.html',
  styleUrls: ['./validation-rol.component.scss']
})
export class ValidationRolComponent implements OnInit {

  @Output() seleccionado: EventEmitter<boolean>;

  constructor() { 
    this.seleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  validacicion(){
    this.seleccionado.emit(true)
  }

}
