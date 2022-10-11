import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AutenticacionService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-retrive-password',
  templateUrl: './retrive-password.component.html',
  styleUrls: ['./retrive-password.component.scss']
})
export class RetrivePasswordComponent implements OnInit {

  recuperar:FormGroup;
  error = false;
  @Output() seleccionado: EventEmitter<boolean>;
  constructor(private fb:FormBuilder, private aAuth: AutenticacionService, private router:Router) { 
    this.recuperar = this.fb.group({
      email:['', Validators.required],
      
    })
    this.seleccionado = new EventEmitter();
  }

  ngOnInit(): void {
  }

  retriveUser(){
    const email = this.recuperar.value.email;
    this.aAuth.retriveUsers(email).then(()=>{
      //this.toastr.info('Se envio un correo para restablecer la contrasenia','Recuperar password')
    
      this.seleccionado.emit(true);
    }).catch((error)=>{
      console.log('error en la recuperacion')
      
      //this.toastr.error(this.aAuth.firebaseError(error.code),error);
    })
  }

}
