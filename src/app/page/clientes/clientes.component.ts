import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

//importacion del modelo
import { userModel } from 'src/app/models/user.model';
//importacion de servicio
import { DatosService } from 'src/app/services/data.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  idCliente:any;
  users:userModel[]=[];
  initAddUser:boolean=false;
  displayedColumns: string[] = ['Nombre', 'DPI', 'NIT', 'Telefono', 'Botones'];

  constructor(private dataServices:DatosService, private router:Router) { }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  obtenerTarjeta(){
    this.dataServices.getUser().subscribe(doc=>{
      this.users=[]
      doc.forEach((element:any)=>{
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  editCliente(id:string){
    localStorage.setItem('id',id);
    alert('llegamos aqui pero no se porque no pasa a la otra pantalla');
    this.router.navigate(['home'])
  }


  eliminarTarjeta(id:any){

    this.dataServices.eliminarTarjeta(id).then(()=>{
    },error=>{console.log(error)})
  }

  initUser(){
    if(this.initAddUser==false){
      
      this.initAddUser=true;
    }else{
      this.initAddUser=false;
    }
  }
}
