import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validator, Validators} from '@angular/forms';
import { AutenticacionService } from 'src/app/services/auth.service';

import { userAdminModel } from 'src/app/models/adminUser.model';
import { DatosService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersAdmins:userAdminModel[]=[];
  registerUser:FormGroup;
  submitted = false;
  displayedColumns: string[] = ['Nombre', 'Correo', 'Rol'];

  constructor(private fb:FormBuilder, private aAuth: AutenticacionService, private datos:DatosService) { 
    this.registerUser = this.fb.group({
      nombre:['', Validators.required],
      rol:['', Validators.required],
      correo:['', Validators.required],
      password:['', Validators.required],
    
    })
  }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  registrar(){
    const correo = this.registerUser.value.correo;
    const password = this.registerUser.value.password;
    
    this.aAuth.register(correo,password).then(()=> {
      this.aAuth.verifictedUsers();
      console.log('entro aqui en verificaines')
      this.registerUserAdmin();
      //this.toastr.success('Se envia correo','Usario Registrado')
    })
    .catch((error)=>{
      console.log(error, 'todo mal');
      //this.toastr.error(this.aAuth.firebaseError(error.code),'Error')
    })
  }

  registerUserAdmin() {
    this.submitted = true;
    //condicion para validar formulario
    if (this.registerUser.invalid) {
      return;
    }
    const User: any = {
      nombre: this.registerUser.value.nombre, //quite el null
      rol: this.registerUser.value.rol,
      correo: this.registerUser.value.correo,
      password: this.registerUser.value.password,
      
    };
    
    this.datos.saveUserAdmin(User).then(
      () => {
        
        this.registerUser.reset();
        //location.reload();
      },
      (error) => {
        //this.toastr.error('No se logro registrar al Usarui','Error')
        console.log(error);
      }
    );
    
    
  }

  obtenerTarjeta(){
    this.datos.getUserAdmin().subscribe(doc=>{
      this.usersAdmins=[];
      doc.forEach((element:any)=>{   
        this.usersAdmins.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

}
