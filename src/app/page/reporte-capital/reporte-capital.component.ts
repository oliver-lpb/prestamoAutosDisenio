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

  capital: reporteCapitaInterface[]=[];
  capitalMesBusqueda: ventaCapitalModel[]=[];
  displayedColumns: string[] = ['Prestamo', 'Cliente', 'Cotizacion'];
  capitalGeneral:number=0;
  diezmoMes:number=0;
  
  constructor(private data:DatosService, ) { 
    /*this.capital = [{
      cantidadPrestamo: 0,
      idCliente: '',
      idCotizacion:'',
      fechaCreacion: 0,
    }];*/
  }

  ngOnInit(): void {
    
  }
  


  getCapital(mes:number){
    this.capitalGeneral = 0;
    this.data.getreporteCapital().subscribe(places => {
      this.capital = places;

      for(let i=0; i<places.length; i++){
        if(places[i].fechaCreacion==mes){
          this.capitalGeneral=this.capitalGeneral + places[i].cantidadPrestamo;
          
        }
      };
    })
    this.diezmoMes = this.capitalGeneral;
    //cunsulta del mes para imprimr
    
    this.data.getMesCapital(mes).subscribe(doc=>{
      this.capitalMesBusqueda=[]
      doc.forEach((element:any)=>{
        this.capitalMesBusqueda.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    console.log(this.diezmoMes,'esto es lo')
  }

  calularDiezmo(){
    this.diezmoMes = this.capitalGeneral * 0.10;
  }


}
