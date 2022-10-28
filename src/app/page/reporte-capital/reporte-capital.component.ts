import { NgPluralCase } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { reportePagos } from 'src/app/models/pagos';
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
  reportePagos:reportePagos[]=[];
  displayedColumns: string[] = ['Cliente', 'Prestamo'];
  capitalGeneral:number=0;
  diezmoMes:number=0;
  sinver='---';
  constructor(private data:DatosService, ) { 
    /*this.capital = [{
      cantidadPrestamo: 0,
      idCliente: '',
      idCotizacion:'',
      fechaCreacion: 0,
    }];*/
  }

  ngOnInit(): void {
    this.reporteDePagosFuncion();

    console.log('esto es de ventas')
  }
  
  fechaHoy = new Date();
  mesHoy = this.fechaHoy.getMonth();
  fehaPrueba = "20/07/2022";
  sumaDelMes =0;
  
  getCapital(mes:number){
    this.sumaDelMes =0;
    this.capitalGeneral = 0;
    this.data.getreporteCapital().subscribe(places => {
      this.capital = places;
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
    this.reporteDePagosFuncion();
    for(let i=0; i<this.reportePagos.length;i++){
      if(this.reportePagos[i].reporteFecha==mes){
        this.sumaDelMes = this.sumaDelMes+this.reportePagos[i].reporteInteres;
        
      }
      
    } 

   
    
  }

    reporteDePagosFuncion(){
      this.capitalGeneral=0;
    this.data.getReportePagos().subscribe(doc=>{
      this.reportePagos=[]
      doc.forEach((element:any)=>{
        this.reportePagos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        }); 
        });
    })

    for(let i=0; i<this.reportePagos.length;i++){
      this.capitalGeneral = this.capitalGeneral+this.reportePagos[i].reporteInteres;
    
  } 

    console.log(this.reportePagos.length,'reportePagos')
  }

  calularDiezmo(){
    this.diezmoMes = this.sumaDelMes * 0.10;
  }



}
