import { getLocaleDayNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { getUserModel } from 'src/app/models/getUser.model';
import { Cotizacion, listaPago } from 'src/app/models/quotation.model';
import { DatosService } from 'src/app/services/data.service';
import listaPagosSemana from 'src/app/utils/prestamosSemana.interface';

@Component({
  selector: 'app-proximos-pagar',
  templateUrl: './proximos-pagar.component.html',
  styleUrls: ['./proximos-pagar.component.scss']
})
export class ProximosPagarComponent implements OnInit {
  
  ventasGuadadas: listaPagosSemana[]=[];
  displayedColumns: string[] = ['Prestamo', 'Cliente', 'Cotizacion'];

  constructor(private data:DatosService) { 
  
  }


  ngOnInit(): void {
    this.obtenerTarjeta();
    //console.log(this.fechaHoy,'fecha de hoy?', this.dia,'este es el dia')
  }

  

  obtenerTarjeta(){
    this.data.getCotizacionDos().subscribe(doc=>{
      this.ventasGuadadas=[]
      doc.forEach((element:any)=>{
        this.ventasGuadadas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  


}
