import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//importacion del modelo
import { userModel } from 'src/app/models/user.model';
import { AutenticacionService } from 'src/app/services/auth.service';
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
  deletUser:boolean=false;
  displayedColumns: string[] = ['Nombre', 'DPI', 'NIT', 'Telefono', 'Botones'];

  constructor(private dataServices:DatosService, private router:Router, private auth:AutenticacionService) { }

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

  correo: string ='';
  eliminarTarjeta(id:any){
    this.auth.obternerUserLogin().subscribe(res=>{
      console.log(res?.email);
      
    })
    //this.dataServices.eliminarTarjeta(id).then(()=>{
    //},error=>{console.log(error)})
  }

  initUser(){
    if(this.initAddUser==false){
      
      this.initAddUser=true;
    }else{
      this.initAddUser=false;
    }
  }

}
