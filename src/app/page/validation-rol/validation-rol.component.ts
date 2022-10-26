import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-validation-rol',
  templateUrl: './validation-rol.component.html',
  styleUrls: ['./validation-rol.component.scss']
})
export class ValidationRolComponent implements OnInit {

  @Output() seleccionado: EventEmitter<boolean>;

  constructor(private router: Router,) { 
    this.seleccionado = new EventEmitter();
  }

  ngOnInit(): void {
    this.validacicion();
  }

  validacicion(){
    this.router.navigate(['/casa']);
  }

}
