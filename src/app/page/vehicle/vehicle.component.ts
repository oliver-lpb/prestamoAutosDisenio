import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { vehicleModel } from 'src/app/models/vehicle.model';
import { AutenticacionService } from 'src/app/services/auth.service';
import { DatosService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Modelo', 'Marca', 'Tipo', 'Color'];
  initAddUser:boolean=false;
  vehicle:vehicleModel[]=[];

  constructor(private dataServices:DatosService, private router:Router, private auth:AutenticacionService) { }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  initUser(){
    if(this.initAddUser==false){
      
      this.initAddUser=true;
    }else{
      this.initAddUser=false;
    }
  }

  eliminarTarjeta(id:any){
    this.auth.obternerUserLogin().subscribe(res=>{
      console.log(res?.email);
      
    })
    //this.dataServices.eliminarTarjeta(id).then(()=>{
    //},error=>{console.log(error)})
  }

  obtenerTarjeta(){
    this.dataServices.getVehiculo().subscribe(doc=>{
      this.vehicle=[]
      doc.forEach((element:any)=>{
        this.vehicle.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

}
