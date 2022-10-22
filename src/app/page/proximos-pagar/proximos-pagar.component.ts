import { getLocaleDayNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { Cotizacion, listaPago } from 'src/app/models/quotation.model';
import { DatosService } from 'src/app/services/data.service';

@Component({
  selector: 'app-proximos-pagar',
  templateUrl: './proximos-pagar.component.html',
  styleUrls: ['./proximos-pagar.component.scss']
})
export class ProximosPagarComponent implements OnInit {
  
  ventasGuadadas: Cotizacion[]=[];
  listaPafos: listaPago[]=[];
  displayedColumns: string[] = ['Prestamo', 'Cliente', 'Cotizacion'];

  constructor(private data:DatosService) { 
  
    
  }


  ngOnInit(): void {
    this.obtenerTarjeta();
    
    console.log(this.fechaHoy,'fecha de hoy?', this.dia,'este es el dia')
  }

  fechaHoy = new Date();
  dia = this.fechaHoy.getDay()

  obtenerTarjeta(){
    /*this.data.getCotizacion().subscribe(cotizacion=>{
    this.ventasGuadadas = cotizacion;
    });*/
    this.ventasGuadadas=[];
    this.data.getCotizacion().subscribe(doc=>{
      doc.forEach((element:any)=>{
        this.ventasGuadadas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    
    console.log(this.ventasGuadadas,'esta es le rayd')

  }

  


}
