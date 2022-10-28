import { getLocaleDayNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { fechasPagos } from 'src/app/models/fechasPagos.model';
import { getUserModel } from 'src/app/models/getUser.model';
import { Cotizacion, listaPago } from 'src/app/models/quotation.model';
import { userModel } from 'src/app/models/user.model';
import { DatosService } from 'src/app/services/data.service';
import listaPagosSemana from 'src/app/utils/prestamosSemana.interface';

@Component({
  selector: 'app-proximos-pagar',
  templateUrl: './proximos-pagar.component.html',
  styleUrls: ['./proximos-pagar.component.scss']
})
export class ProximosPagarComponent implements OnInit {
  
  ventasGuadadas: Cotizacion[]=[];
  pagosHoy:fechasPagos[]=[];
  users:userModel[]=[];
  displayedColumns: string[] = ['Prestamo', 'Cliente', 'Cotizacion'];

  constructor(private data:DatosService) { 
    this.pagosHoy=[{
      nombre:'',
      fecha:'',
      fotoUrl:'',
    }]
  }


  ngOnInit(): void {
    this.obtenerTarjeta();
    this.fechado();
    //console.log(this.fechaHoy,'fecha de hoy?', this.dia,'este es el dia')
  }

  fecha='';

  fechado(){
    let fechaHoy = new Date();
    this.fecha = (fechaHoy.getDate() + "/" + (fechaHoy.getMonth() + 1) + "/" + fechaHoy.getFullYear()) 
    console.log(this.fecha);
  }
  
  obtenerTarjeta(){
    let cliente='';
    let nombreCliete='';
    let fotoCliente='';
    this.pagosHoy=[];

    this.data.getCotizacionDos().subscribe(doc=>{
      this.ventasGuadadas=[]
      doc.forEach((element:any)=>{
        this.ventasGuadadas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //console.log(this.ventasGuadadas[0].pagos[1].fechaPago)

    
        for(let i=0; i<this.ventasGuadadas.length; i++){
          //console.log(this.ventasGuadadas[i].idCliente)
          cliente = this.ventasGuadadas[i].idCliente;
          this.data.getUsuario(cliente).subscribe(doc=>{
            nombreCliete = doc.payload.data()["nombre"]
            localStorage.setItem('nombre',nombreCliete)
            fotoCliente = doc.payload.data()["fotoUrl"]
            localStorage.setItem('foto',fotoCliente)
          });
          for(let j=0; j<this.ventasGuadadas[i].pagos.length; j++){
            //console.log(this.ventasGuadadas[i].pagos[j].fechaPago)
            if(this.fecha == this.ventasGuadadas[i].pagos[j].fechaPago){
              console.log('este es el dia de pago');
              //se selecciona el cliente
              console.log(nombreCliete,'este es el nombre')
              console.log(this.ventasGuadadas[i].pagos[j].fechaPago,'este es la fecha')
              let descargaNombre = localStorage.getItem('nombre');
              let fotos = localStorage.getItem('fotoUrl');
              
              this.pagosHoy.push({
                nombre:  descargaNombre || "sin",
                fecha: this.ventasGuadadas[i].pagos[j].fechaPago,
                fotoUrl: fotos || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE7O3jaT4a31_a-7EE_Szoo6wVE0TabQk7jogLziA&s",
              }
              )
            }
          }
        }
      
    })
  }
  

}
