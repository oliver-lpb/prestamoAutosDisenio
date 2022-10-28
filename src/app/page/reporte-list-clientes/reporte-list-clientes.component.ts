import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/data.service';
import { userModel } from 'src/app/models/user.model';

import jspdf from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-reporte-list-clientes',
  templateUrl: './reporte-list-clientes.component.html',
  styleUrls: ['./reporte-list-clientes.component.scss']
})
export class ReporteListClientesComponent implements OnInit {

  users:userModel[]=[];
  displayedColumns: string[] = ['Nombre', 'DPI', 'NIT', 'Telefono'];

  constructor(private data:DatosService) { }

  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  obtenerTarjeta(){
    this.data.getUser().subscribe(doc=>{
      this.users=[]
      doc.forEach((element:any)=>{
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  public generarPDF() {
    var tablaY=135;
    var doc = new jspdf('p','pt', 'a4');
    doc.text('Listado de Clientes',305,30);
    doc.setTextColor('#000000');
    doc.autoTable({
      html:'#table',
      startY:tablaY,
      styles:{
        fontSize:10,
        cellWidth:'wrap'
      },
      columnStyles:{
        1:{
          columnWidth:'auto'
        }
      }
    });
    doc.setFontSize(12);
    doc.setFontStyle('normal');
    
    doc.save(`ListadoClientes./${new Date().toISOString()}.pdf`);
  }

}
