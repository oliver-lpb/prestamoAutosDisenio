import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Cotizacion, datosPDF } from 'src/app/models/quotation.model';
import { userModel } from 'src/app/models/user.model';
import { DatosService } from 'src/app/services/data.service';
import jspdf from 'jspdf';
import { logoPDF, reportePagos } from 'src/app/models/pagos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

   datos:any =[];
  cot: Cotizacion = {
    idCliente: '',
    idVehiculo:'',
    mora:0,
    pagos: [],
  }
  
  datosPDF: datosPDF={
    clientNombre:'',
    clientApellido:'',
    clientDpi:'',
    clientDireccion:'',
    clientTelefono:'',
    autoNombre:'',
    autoModelo:'',
    autoMarca:'',
    autoColor:'',
  } 

  reportePagos: reportePagos={
      reporteNombre:'',
      reporteFecha:0,
      reporteSaldo:0,
      reporteInteres:0,
  }

  fechaEsp: string='';


  //listar clientes
  users:userModel[]=[];
  displayedColumns: string[] = ['Nombre', 'Correo', 'Direccion', 'Telefonos', 'Botones'];

  constructor(public data:DatosService) { }

  ngOnInit(): void {
    this.data.getDeudores()
  }

  obtenerCotizacion(id:string,nombre:string, apellido:string, direccion:string, telefono:string, dpi:string, nit:string){
    this.data.getCot2(id).then(resp=>{
      this.datos=resp;
      this.datosPDF.clientNombre=nombre;
      this.datosPDF.clientApellido=apellido;
      this.datosPDF.clientDireccion=direccion;
      this.datosPDF.clientTelefono=telefono;
      this.datosPDF.clientDpi=dpi;
      this.datosPDF.clientNit=nit;
      this.reportePagos.reporteNombre=nombre;
    });
    this.mora(id);
  }
  separadorFecha:string='';
  separadorFechaString:string[]=[];

  pago(id:string, fecha:string){
        //pdf
        var doc = new jspdf('p','pt', 'a4');
    Swal.fire({
      title: 'Desea registrar este pago?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar pago',
      denyButtonText: `No realizar cambios`,
    }).then((result) => {
  
      if (result.isConfirmed) {
        Swal.fire('Pago realizado!', '', 'success')

    this.cot.pagos=[]
    this.data.getCot2(id).then(resp=>{
    this.datos=resp;

    
      this.cot.idCliente = this.datos[0].idCliente;
      this.cot.idVehiculo = this.datos[0].idVehiculo;
      this.cot.mora = this.datos[0].mora;
      for (let i = 0; i<this.datos[0].pagos.length; i++ )
      {
        if (fecha===this.datos[0].pagos[i].fechaPago && this.datos[0].pagos[i].firmaPago != "PAGO REALIZADO" ){
          let date: Date = new Date();
          this.fechaEsp = (date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
          this.cot.pagos.push({
            "fechaPago": this.datos[0].pagos[i].fechaPago,
            "cuotaCotizacion": this.datos[0].pagos[i].cuotaCotizacion,
            "interesCotizacion": this.datos[0].pagos[i].interesCotizacion,
            "capitalCotizacion": this.datos[0].pagos[i].capitalCotizacion,
            "saldoCotizacion": this.datos[0].pagos[i].saldoCotizacion,
            "firmaPago": "PAGO REALIZADO"
          });

          //datos reporte
          
          
          this.separadorFechaString = this.datos[0].pagos[i].fechaPago.split("/");
          this.separadorFecha=this.separadorFechaString[1]
          console.log(this.separadorFecha,'esta es la fecha cantidad')
          switch(this.separadorFecha){
            case '1':
              this.reportePagos.reporteFecha = 0;
              
              break;
            case '2':
            this.reportePagos.reporteFecha = 1;
              break;
            case '3':
              this.reportePagos.reporteFecha = 2;
              break;
            case '4':
                this.reportePagos.reporteFecha = 3;
                break;
            case '5':
              this.reportePagos.reporteFecha = 4;
                break;
            case '6':
                this.reportePagos.reporteFecha = 5;
                break;
            case '7':
                this.reportePagos.reporteFecha = 6;
                break;
            case '8':
              this.reportePagos.reporteFecha = 7;
              break;
            case '9':
              this.reportePagos.reporteFecha = 8;
              break;
            case '10':
                this.reportePagos.reporteFecha = 9;
                break;
            case '11':
              this.reportePagos.reporteFecha = 10;
                break;
            case '12':
                this.reportePagos.reporteFecha = 11;
                break;
            }


          this.reportePagos.reporteSaldo = this.datos[0].pagos[i].saldoCotizacion;
          this.reportePagos.reporteInteres = this.datos[0].pagos[i].interesCotizacion;
          //PDF FACTURA
      doc.addImage (logoPDF, 'PNG', 40, 25, 200, 75);
      doc.setFontSize(9);
      doc.setFontStyle('bold');
      doc.setTextColor('#000000');
      doc.text('ID Cliente:'+this.datos[0].idCliente,430,14);
      doc.setFontSize(12);
      doc.setTextColor('#0d32ec');
      doc.text('RECIBO "PAGO DE PRESTAMO REALIZADO"',295,30);
      doc.text('DATOS DEL CLIENTE',255,50)
      doc.setTextColor('#000000');
      doc.text('Nombre:',255,65);
      doc.text('DPI:',255,80);
      doc.text('Nit:',255,95);
      doc.text('Telefono:',255,110);
      doc.setFontStyle('normal');
      doc.text(this.datosPDF.clientNombre+' '+this.datosPDF.clientApellido,305,65);
      doc.text(this.datosPDF.clientDpi,280,80);
      doc.text(this.datosPDF.clientNit,280,95);
      doc.text(this.datosPDF.clientTelefono,310,110);
      doc.setFontStyle('bold');
      doc.setTextColor('#0d32ec');
      doc.text('DETALLE:',105,125);
      doc.setFontStyle('bold');
      doc.setTextColor('#000000');
      doc.text('Fecha de pago Recibido:',75,140);
      doc.text('Fecha del Prestamo a pagar:',75,155);
      doc.text('Cuota del Prestamo:',75,170);
      doc.text('Interes del prestamo:',75,185);
      doc.text('Capital del prestamo:',75,200);
      doc.text('Saldo anterior:',75,215);
      doc.text('Saldo actual:',75,230);
      doc.text('Estado del pago:',75,245);
      doc.setFontStyle('normal');
      doc.setTextColor('#000000');
      doc.text(''+this.fechaEsp,225,140);
      doc.text(this.datos[0].pagos[i].fechaPago,240,155);
      doc.text(''+this.datos[0].pagos[i].cuotaCotizacion,195,170);
      doc.text(''+this.datos[0].pagos[i].interesCotizacion,200,185);
      doc.text(''+this.datos[0].pagos[i].capitalCotizacion,200,200);
      doc.text(''+this.datos[0].pagos[i-1].saldoCotizacion,165,215);
      doc.text(''+this.datos[0].pagos[i].saldoCotizacion,155,230);
      doc.text("PAGO REALIZADO",175,245);                                                       
      doc.setFontStyle('normal');
      doc.text('Nombre y firma del receptor ______________________________________________________',40,350);
      doc.text('Firma Cliente  ____________________________',300,395,'center'),
      doc.save(`${new Date().toISOString()}_Recibo.pdf`);
        } else {
          this.cot.pagos.push({
            "fechaPago": this.datos[0].pagos[i].fechaPago,
            "cuotaCotizacion": this.datos[0].pagos[i].cuotaCotizacion,
            "interesCotizacion": this.datos[0].pagos[i].interesCotizacion,
            "capitalCotizacion": this.datos[0].pagos[i].capitalCotizacion,
            "saldoCotizacion": this.datos[0].pagos[i].saldoCotizacion,
            "firmaPago": this.datos[0].pagos[i].firmaPago,
          });
        }
      }
      
      const path = 'cotizacion/';
      this.data.updateDoc(this.cot, path,this.datos[0].id,);

      const path2 = 'reportePagos/';
      this.data.createDoc(this.reportePagos, path2);
     
    });
      } else if (result.isDenied) {
        Swal.fire('No se realizaron cambios', '', 'info')
      }
    })
   
  }

  mora(id:string){
    this.cot.pagos=[]
    this.data.getCot2(id).then(resp=>{
    this.datos=resp;
    let dateACTUAL: Date = new Date();

    this.cot.idCliente = this.datos[0].idCliente;
    this.cot.idVehiculo = this.datos[0].idVehiculo;
    this.cot.mora = this.datos[0].mora;
    for (let i = 0; i<this.datos[0].pagos.length; i++ )
    {
      const str = this.datos[0].pagos[i].fechaPago;
      const [day, month, year] = str.split('/');
      const d = new Date(+year, +month - 1, +day+1);
     
      if (d<dateACTUAL && (this.datos[0].pagos[i].firmaPago != "PAGO REALIZADO" && this.datos[0].pagos[i].firmaPago !="MORA AGREGADA") ){
        console.log(d);
        this.datos[0].pagos[i].cuotaCotizacion += this.datos[0].mora
        this.cot.pagos.push({
          "fechaPago": this.datos[0].pagos[i].fechaPago,
          "cuotaCotizacion": this.datos[0].pagos[i].cuotaCotizacion,
          "interesCotizacion": this.datos[0].pagos[i].interesCotizacion,
          "capitalCotizacion": this.datos[0].pagos[i].capitalCotizacion,
          "saldoCotizacion": this.datos[0].pagos[i].saldoCotizacion,
          "firmaPago": "MORA AGREGADA"
        });
      } else {
        this.cot.pagos.push({
          "fechaPago": this.datos[0].pagos[i].fechaPago,
          "cuotaCotizacion": this.datos[0].pagos[i].cuotaCotizacion,
          "interesCotizacion": this.datos[0].pagos[i].interesCotizacion,
          "capitalCotizacion": this.datos[0].pagos[i].capitalCotizacion,
          "saldoCotizacion": this.datos[0].pagos[i].saldoCotizacion,
          "firmaPago": this.datos[0].pagos[i].firmaPago,
        });
      }
    }
    const path = 'cotizacion/';
    this.data.updateDoc(this.cot, path,this.datos[0].id,);
    });
  }

  imprimirPagos(){
    var tablaY=135;
      var doc = new jspdf('p','pt', 'a4');
      doc.addImage (logoPDF, 'PNG', 40, 25, 200, 75);
      doc.setFontSize(12);
      doc.setFontStyle('bold');
      doc.setTextColor('#0d32ec');
      doc.text('DATOS DEL CLIENTE',305,30);
      doc.setTextColor('#000000');
      doc.text('Nombre:',255,50);
      doc.text('DPI:',255,65);
      doc.setFontStyle('normal');
      doc.text(this.datosPDF.clientNombre+' '+this.datosPDF.clientApellido,305,50);
      doc.text(this.datosPDF.clientDpi,280,65,);
      doc.setFontStyle('bold');
      doc.text('Direccion:',255,80);
      doc.text('Telefono:',255,95);
      doc.setFontStyle('normal');
      doc.text(this.datosPDF.clientDireccion,315,80);
      doc.text(this.datosPDF.clientTelefono,310,95);
      if (this.datosPDF.autoNombre!=""){
        doc.setFontStyle('bold');
        doc.setTextColor('#0d32ec');
        doc.text('DATOS DEL VEHICULO',60,115);
        doc.setTextColor('#000000');
        doc.text('Nombre:',40,135);
        doc.text('Modelo:',40,150);
        doc.text('Marca:',40,165);
        doc.text('Color:',40,180);
        doc.setFontStyle('normal');
        doc.text(this.datosPDF.autoNombre,95,135);
        doc.text(this.datosPDF.autoModelo,90,150);
        doc.text(this.datosPDF.autoMarca,85,165);
        doc.text(this.datosPDF.autoColor,80,180);
        tablaY+=65;
      }

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
      doc.save(`${new Date().toISOString()}_Estado De Pagos.pdf`);
  }

  
  
}
