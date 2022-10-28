import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { elementAt, Observable } from 'rxjs';
import { Cotizacion, Quotation, datosPDF, ventaDatos } from 'src/app/models/quotation.model';
import { userModel } from 'src/app/models/user.model';
import { DatosService } from 'src/app/services/data.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { vehicleModel } from 'src/app/models/vehicle.model';
//alerta
import Swal from 'sweetalert2';

//para imprimir pdf
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { logoPDF } from 'src/app/models/pagos';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  
  cotizacion: Quotation = {
    interesTipo: 0,
    monto: 0,
    cuotaDeseada: 0,
    interesFijo: 0,
    interesPorcentaje: 0,
    fechaPago: '',
    periodoPago: '',
    dpiBusqueda:'',
    idCliente: '',
    vehiculoBusqueda:'',
    idVehiculo:'',
    capital: 0,
    resultado: 0,
    saldo: 0,
    porcentajeVariable: 0,
    mora:0
  }

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

  venta: ventaDatos={
    ventaNombre:'',
    ventaFecha:'',
    ventaCantidad:0,
  }


  users:userModel[]=[];
  displayedColumns: string[] = ['Nombre', 'DPI', 'NIT', 'Telefono','Direccion','Botones'];
  vehicle:vehicleModel[]=[];
  displayedColumns2: string[] = ['Vehiculo', 'Tipo', 'Color','Botones'];


  constructor(private dataServices: DatosService) {}

  ngOnInit(): void {}

  tipoInteres(tipo: number) {
    this.cotizacion.interesTipo = tipo;
  }
  comprobacionDatos() {
    this.cotizacion.porcentajeVariable = this.cotizacion.interesPorcentaje;
    this.cotizacion.interesPorcentaje = this.cotizacion.monto * this.cotizacion.interesPorcentaje;
    
    if(this.cotizacion.idCliente==""){
      Swal.fire({
        icon: 'error',
        title: 'No se ha seleccionado un cliente',
        text: 'Buscar un cliente y luego seleccionarlo antes generar la cotizacion',
      })
    }else if (this.cotizacion.monto==0){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese un monto por favor',
      })
    }else if (this.cotizacion.cuotaDeseada==0){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese una cuota deseada a pagar por favor',
      })
    }else if (this.cotizacion.interesTipo==0){
      Swal.fire({
        icon: 'error',
        title: 'Seleccione un tipo de interes por favor',
      })
    }else if (this.cotizacion.interesFijo==0 && this.cotizacion.interesPorcentaje==0 ){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese una cantidad o % para el interes por favor',
      })
    }else if (this.cotizacion.fechaPago==""){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese la fecha del pago inicial',
      })
    }else if (this.cotizacion.periodoPago==""){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese el periodo de pago (Mensual/Quincena/Semanal)',
      })
    }else if (this.cotizacion.mora==0){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese una mora en caso de atrasos',
      })
    } 
    if (this.cotizacion.interesTipo == 1) {
      if (this.cotizacion.idCliente==""|| this.cotizacion.monto < this.cotizacion.cuotaDeseada || this.cotizacion.monto == 0 || this.cotizacion.cuotaDeseada == 0 || this.cotizacion.interesFijo == 0 || this.cotizacion.fechaPago == "" || this.cotizacion.periodoPago == "" || this.cotizacion.cuotaDeseada <= this.cotizacion.interesFijo || this.cotizacion.mora==0) {
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Cotizacion generada con exito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.calcularInteresFijo();
    } else if (this.cotizacion.interesTipo == 2) {
      if (this.cotizacion.monto < this.cotizacion.cuotaDeseada || this.cotizacion.monto == 0 || this.cotizacion.cuotaDeseada == 0 || this.cotizacion.fechaPago == "" || this.cotizacion.periodoPago == "" || this.cotizacion.cuotaDeseada <= this.cotizacion.interesPorcentaje || this.cotizacion.interesPorcentaje >= this.cotizacion.cuotaDeseada || this.cotizacion.mora==0) {
        console.log("Error datos no renellados o Interes % mayor a la cuota deseada")
        return;
      } 
      Swal.fire({
        icon: 'success',
        title: 'Cotizacion generada con exito!',
        showConfirmButton: false,
        timer: 1500
      })
      this.calcularInteresPorcentaje();
    }
  }


  calcularInteresPorcentaje() {
    //console.log("Fecha_de_pago " + "Cuota fija " + "Intereses " + "Capital " + "Saldo");
    //variables
    let fecha = new Date(this.cotizacion.fechaPago);
    let contador = 2;

    //saldo inicial
    this.cotizacion.saldo = this.cotizacion.monto;

    this.cot.pagos.push({
      "fechaPago": "Saldo inicial",
      "cuotaCotizacion": 0,
      "interesCotizacion": 0,
      "capitalCotizacion": 0,
      "saldoCotizacion": this.cotizacion.monto,
      "firmaPago": ""
    });


    //para que inicie el dia que se eligio
    if (this.cotizacion.periodoPago == "mensual") {
      fecha.setDate(fecha.getDate() + 1);
      this.cotizacion.fechaPago = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    } else if (this.cotizacion.periodoPago == "quincenal") {
      fecha.setDate(fecha.getDate() );
      this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    } else if (this.cotizacion.periodoPago == "semanal") {
      fecha.setDate(fecha.getDate() );
      this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    }

    this.venta.ventaFecha=this.cotizacion.fechaPago;
    this.venta.ventaCantidad=this.cotizacion.monto;

    while (contador >= 0) {
      //capital calculo ciclo
      this.cotizacion.interesPorcentaje = this.cotizacion.saldo * this.cotizacion.porcentajeVariable;
      this.cotizacion.capital = this.cotizacion.cuotaDeseada - this.cotizacion.interesPorcentaje;
      this.cotizacion.saldo = this.cotizacion.saldo - this.cotizacion.capital;

      this.cot.idCliente = this.cotizacion.idCliente;
      this.cot.idVehiculo = this.cotizacion.idVehiculo;
      this.cot.mora = this.cotizacion.mora;
      this.cot.pagos.push({
        "fechaPago": this.cotizacion.fechaPago,
        "cuotaCotizacion": this.cotizacion.cuotaDeseada,
        "interesCotizacion": this.cotizacion.interesPorcentaje,
        "capitalCotizacion": this.cotizacion.capital,
        "saldoCotizacion": this.cotizacion.saldo,
        "firmaPago": "PAGO NO REALIZADO"
      });


      //condicion para sumar fecha 
      if (this.cotizacion.periodoPago == "mensual") {
        fecha.setMonth(fecha.getMonth() + 1);
        this.cotizacion.fechaPago = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      } else if (this.cotizacion.periodoPago == "quincenal") {
        fecha.setDate(fecha.getDate() + 15);
        this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      } else if (this.cotizacion.periodoPago == "semanal") {
        fecha.setDate(fecha.getDate() + 7);
        this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      }

      contador = this.cotizacion.saldo;
    }
  }



  calcularInteresFijo() {

    //variables
    let fecha = new Date(this.cotizacion.fechaPago);
    let contador = 2;

    //saldo inicial
    this.cotizacion.saldo = this.cotizacion.monto;

    this.cot.pagos.push({
      "fechaPago": "Saldo inicial",
      "cuotaCotizacion": 0,
      "interesCotizacion": 0,
      "capitalCotizacion": 0,
      "saldoCotizacion": this.cotizacion.monto,
      "firmaPago": ""
    });


    //para que inicie el dia que se eligio
    if (this.cotizacion.periodoPago == "mensual") {
      fecha.setDate(fecha.getDate() + 1);
      this.cotizacion.fechaPago = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    } else if (this.cotizacion.periodoPago == "quincenal") {
      fecha.setDate(fecha.getDate() );
      this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    } else if (this.cotizacion.periodoPago == "semanal") {
      fecha.setDate(fecha.getDate() );
      this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      
    }

    this.venta.ventaFecha=this.cotizacion.fechaPago;
    this.venta.ventaCantidad=this.cotizacion.monto;
    //condicion para elegir el tipo de interes
    while (contador >= 1) {
      //capital calculo ciclo
      this.cotizacion.capital = this.cotizacion.cuotaDeseada - this.cotizacion.interesFijo;
      this.cotizacion.saldo = this.cotizacion.saldo - this.cotizacion.capital;


      this.cot.idCliente = this.cotizacion.idCliente;
      this.cot.idVehiculo = this.cotizacion.idVehiculo;
      this.cot.mora = this.cotizacion.mora;
      this.cot.pagos.push({
        "fechaPago": this.cotizacion.fechaPago,
        "cuotaCotizacion": this.cotizacion.cuotaDeseada,
        "interesCotizacion": this.cotizacion.interesFijo,
        "capitalCotizacion": this.cotizacion.capital,
        "saldoCotizacion": this.cotizacion.saldo,
        "firmaPago": "PAGO NO REALIZADO"
      });
    


      //condicion para sumar fecha 
      if (this.cotizacion.periodoPago == "mensual") {
        fecha.setMonth(fecha.getMonth() + 1);
        this.cotizacion.fechaPago = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      } else if (this.cotizacion.periodoPago == "quincenal") {
        fecha.setDate(fecha.getDate() + 15);
        this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      } else if (this.cotizacion.periodoPago == "semanal") {
        fecha.setDate(fecha.getDate() + 7);
        this.cotizacion.fechaPago = (fecha.getDate() + 1 + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
      }
      //cotador para finalisar el ciclo
      contador = this.cotizacion.saldo;
    }
  }

  buscarCliente(){
    this.users=[];
    this.dataServices.getClient(this.cotizacion.dpiBusqueda).subscribe(doc=>{
      this.users=[];
      doc.forEach((element:any)=>{
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      if(this.users.length===0){
        Swal.fire({
          icon: 'error',
          title: 'Cliente No encontrado',
          text: 'El Nombre no esta registrado!',
          footer: '<a href="/clientesVersionDos">click para registrar al cliente?</a>'
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cliente encontrado',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    })
  }

  buscarVehiculo(){
    this.vehicle=[];
    this.dataServices.getVehicul(this.cotizacion.vehiculoBusqueda).subscribe(doc=>{
      this.vehicle=[]
      doc.forEach((element:any)=>{
        this.vehicle.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      if(this.vehicle.length===0){
        Swal.fire({
          icon: 'error',
          title: 'Modelo de vehiculo No encontrado',
          text: 'El Modelo no esta registrado!',
          footer: '<a href="/vehiculos">click para registrar nuevo vihiculo?</a>'
        })
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Vehiculo encontrado',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  
  seleccionarCliente(id: string, nombre:string, apellido:string, dpi:string, direccion:string, telefono:string){
    this.cotizacion.idCliente=id;
    this.datosPDF.clientNombre=nombre;
    this.datosPDF.clientApellido= apellido;
    this.datosPDF.clientDpi=dpi;
    this.datosPDF.clientDireccion= direccion;
    this.datosPDF.clientTelefono= telefono;
    this.venta.ventaNombre=nombre;
      Swal.fire({
        icon: 'success',
        title: 'Cliente seleccionado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  
  seleccionarVehiculo(id: string, nombre:string, modelo: string, marca: string, color: string){
      this.cotizacion.idVehiculo=id;
      this.datosPDF.autoNombre=nombre;
      this.datosPDF.autoModelo=modelo;
      this.datosPDF.autoMarca=marca;
      this.datosPDF.autoColor=color;
      Swal.fire({
        icon: 'success',
        title: 'Vehiculo seleccionado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }

    guardarCotizacion(guardarCot:{}){
      if(this.cotizacion.idCliente=="" || this.cot.pagos.length==0){
        Swal.fire({
          icon: 'error',
          title: 'Error al generar venta',
          text: 'Para generar una venta, primero genere una cotizacion',
        })
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Venta generada y guardada con exito!',
        showConfirmButton: false,
        timer: 1500
      })
      const path = 'cotizacion/';
      this.dataServices.createDoc(guardarCot, path);
      const path2 = 'venta/';
      this.dataServices.createDoc(this.venta, path2);
    }

    public generarPDF() {
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
        endY:635,
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
      doc.text('Firma Acreedor _______________________      Firma Cliente  _______________________',300,815,'center');
      doc.addPage();
      doc.setFontSize(12);
      doc.setFontStyle('bold');
      doc.addImage (logoPDF, 'PNG', 40, 25, 200, 75);
      doc.text('Asunto: Carta de préstamo',40,125);
      doc.setFontStyle('normal');
      doc.text('Por medio de la presente se hace constar que el cliente: '+this.datosPDF.clientNombre+' '+this.datosPDF.clientApellido,40,150);
      doc.text('DPI No. '+this.datosPDF.clientDpi+' se compromete a pagar la cantidad de: Q.'+this.venta.ventaCantidad+' en el tiempo estipulado.',40,165);
      doc.text('Dicho monto será cubierto en pagos realizados según las fechas estipuladas de este documento.',40,180);
      doc.text('A su vez se le informa al cliente: '+this.datosPDF.clientNombre+' '+this.datosPDF.clientApellido,40,205);
      doc.text('Que tendra que realizar sus pagos al menos un dia antes de las fechas de pago acordadas.',40,220);
      doc.text('En el entendido de que si no fuere de esa manera y existiera algún retraso en el pago, a partir de',40,235);
      doc.text('ese momento se cobrará una mora agregadad de: ',40,250);
      doc.setFontStyle('bold');
      doc.text('Q.'+this.cotizacion.mora+" por la fecha retrasada.",310,250);
      doc.text('Nombre del Acreedor: _______________________   Nombre del Cliente: _______________________',290,350,'center');
      doc.text('Firma Acreedor: _______________________      Firma Cliente: _______________________',300,400,'center');
      doc.save(`${new Date().toISOString()}_Cotizacion.pdf`);
    }

}
