import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//para la manipulacion del formulario
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//importacion del modelo


import { ActivatedRoute, Route, Router } from '@angular/router';

import { AutenticacionService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  //validacion de correo
  error = false;

  usario = {
    email: '',
    pass: ''
  }


  @Output() seleccionado: EventEmitter<boolean>;

  constructor(
    private fb: FormBuilder,
    private aRote: ActivatedRoute,
    private router: Router,

    private authServices: AutenticacionService
  ) {


    this.seleccionado = new EventEmitter();
  }

  loading = false;

  ngOnInit(): void {

  }

  redener(){
    this.seleccionado.emit(false)
  }

  

  ingresar() {
    const { email, pass } = this.usario

    this.authServices.login(email, pass)
      .then(response => {
        if (response.user?.emailVerified) {
          this.router.navigate(['/home']);
          this.seleccionado.emit(true);
          console.log('aqui va el status',email)
          localStorage.setItem('correo',email);

        } else {
          alert('No esta verificado revise el correo')
        }

        // this.router.navigate(['/home'])
      }
      )
      .catch(() => {

        this.error = true;
      });
  }


}
