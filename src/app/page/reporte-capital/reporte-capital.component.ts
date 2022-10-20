import { NgPluralCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ventaCapitalModel } from 'src/app/models/reporteCapital.model';
import { DatosService } from 'src/app/services/data.service';
import reporteCapitaInterface from 'src/app/utils/reporteCapital.interface';

@Component({
  selector: 'app-reporte-capital',
  templateUrl: './reporte-capital.component.html',
  styleUrls: ['./reporte-capital.component.scss']
})
export class ReporteCapitalComponent implements OnInit {

  capital: reporteCapitaInterface[];
  displayedColumns: string[] = ['Prestamo', 'Cliente', 'Cotizacion', 'Fecha'];

  constructor(private data:DatosService, ) { 
    this.capital = [{
      cantidadPrestamo: 0,
      idCliente: '',
      idCotizacion:'',
      fecha: "",
    }];
  }

  ngOnInit(): void {
    this.getCapital();
  }

  capitalGeneral = 0;

  getCapital(){
    this.data.getreporteCapital().subscribe(places => {
      this.capital = places;
      for(let i=0; i<places.length; i++){
        this.capitalGeneral=this.capitalGeneral + places[i].cantidadPrestamo;
      }
    })
    
  }


}
