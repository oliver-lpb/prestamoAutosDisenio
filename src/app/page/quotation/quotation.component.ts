import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { elementAt, Observable } from 'rxjs';
import { Cotizacion, Quotation } from 'src/app/models/quotation.model';
import { userModel } from 'src/app/models/user.model';
import { DatosService } from 'src/app/services/data.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { vehicleModel } from 'src/app/models/vehicle.model';


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
    foto: '',
    capital: 0,
    resultado: 0,
    saldo: 0,
    porcentajeVariable: 0,
  }

  cot: Cotizacion = {
    idCliente: '',
    idVehiculo:'',
    pagos: [],
  }

  users:userModel[]=[];
  displayedColumns: string[] = ['Nombre', 'DPI', 'NIT', 'Telefono','Direccion','Botones'];
  vehicle:vehicleModel[]=[];
  displayedColumns2: string[] = ['Vehiculo', 'Tipo', 'Color','Botones'];


  constructor(private dataServices: DatosService) {}

  ngOnInit(): void {}

  tipoInteres(tipo: number) {
    this.cotizacion.interesTipo = tipo;
    //console.log(this.cotizacion.interesTipo)
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
    }else if(this.cotizacion.idVehiculo==""){
      Swal.fire({
        icon: 'error',
        title: 'No se ha seleccionado un Vehiculo',
        text: 'Buscar un vehiculo y luego seleccionarlo antes de generar la cotizacion',
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
    }
    if (this.cotizacion.interesTipo == 1) {
      if (this.cotizacion.idCliente=="" ||this.cotizacion.idVehiculo=="" || this.cotizacion.monto < this.cotizacion.cuotaDeseada || this.cotizacion.monto == 0 || this.cotizacion.cuotaDeseada == 0 || this.cotizacion.interesFijo == 0 || this.cotizacion.fechaPago == "" || this.cotizacion.periodoPago == "" || this.cotizacion.cuotaDeseada <= this.cotizacion.interesFijo) {
        return;
      }
      this.calcularInteresFijo();
    } else if (this.cotizacion.interesTipo == 2) {
      if (this.cotizacion.monto < this.cotizacion.cuotaDeseada || this.cotizacion.monto == 0 || this.cotizacion.cuotaDeseada == 0 || this.cotizacion.fechaPago == "" || this.cotizacion.periodoPago == "" || this.cotizacion.cuotaDeseada <= this.cotizacion.interesPorcentaje || this.cotizacion.interesPorcentaje >= this.cotizacion.cuotaDeseada) {
        console.log("Error datos no renellados o Interes % mayor a la cuota deseada")
        return;
      } this.calcularInteresPorcentaje();
    }
  }


  calcularInteresPorcentaje() {
    //console.log("Fecha_de_pago " + "Cuota fija " + "Intereses " + "Capital " + "Saldo");
    //variables
    let fecha = new Date(this.cotizacion.fechaPago);
    let contador = 2;

    //saldo inicial
    this.cotizacion.saldo = this.cotizacion.monto;


    //para que inicie el dia que se eligio
    if (this.cotizacion.periodoPago == "mensual") {
      fecha.setDate(fecha.getDate() + 1);
      this.cotizacion.fechaPago = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    }

    while (contador >= 0) {
      //capital calculo ciclo
      this.cotizacion.interesPorcentaje = this.cotizacion.saldo * this.cotizacion.porcentajeVariable;
      this.cotizacion.capital = this.cotizacion.cuotaDeseada - this.cotizacion.interesPorcentaje;
      this.cotizacion.saldo = this.cotizacion.saldo - this.cotizacion.capital;

      this.cot.idCliente = this.cotizacion.idCliente;
      this.cot.idVehiculo = this.cotizacion.idVehiculo;
      this.cot.idCliente = this.cotizacion.idCliente;
      this.cot.pagos.push({
        "fechaPago": this.cotizacion.fechaPago,
        "cuotaCotizacion": this.cotizacion.cuotaDeseada,
        "interesCotizacion": this.cotizacion.interesPorcentaje,
        "capitalCotizacion": this.cotizacion.capital,
        "saldoCotizacion": this.cotizacion.saldo,
        "firmaPago": "Boleta de pago"
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
    const path = 'cotizacion/';
    this.dataServices.createDoc(this.cot, path);
  }



  calcularInteresFijo() {

    //variables
    let fecha = new Date(this.cotizacion.fechaPago);
    let contador = 2;

    //saldo inicial
    this.cotizacion.saldo = this.cotizacion.monto;

    //para que inicie el dia que se eligio
    if (this.cotizacion.periodoPago == "mensual") {
      fecha.setDate(fecha.getDate() + 1);
      this.cotizacion.fechaPago = (fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear());
    }


    //condicion para elegir el tipo de interes
    while (contador >= 1) {
      //capital calculo ciclo
      this.cotizacion.capital = this.cotizacion.cuotaDeseada - this.cotizacion.interesFijo;
      this.cotizacion.saldo = this.cotizacion.saldo - this.cotizacion.capital;


      this.cot.idCliente = this.cotizacion.idCliente;
      this.cot.idVehiculo = this.cotizacion.idVehiculo;
      this.cot.pagos.push({
        "fechaPago": this.cotizacion.fechaPago,
        "cuotaCotizacion": this.cotizacion.cuotaDeseada,
        "interesCotizacion": this.cotizacion.interesFijo,
        "capitalCotizacion": this.cotizacion.capital,
        "saldoCotizacion": this.cotizacion.saldo,
        "firmaPago": "Boleta de pago"
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
    //guardar cotizacion
    const path = 'cotizacion/';
    this.dataServices.createDoc(this.cot, path);
  }

  buscarCliente(){
    this.dataServices.getClient(this.cotizacion.dpiBusqueda).subscribe(doc=>{
      this.users=[];
      doc.forEach((element:any)=>{
        this.users.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    
    if(this.users.length==0){
      Swal.fire({
        icon: 'error',
        title: 'Cliente No encontrado',
        text: 'El DPI no esta registrado!',
        footer: '<a href="/clientesVersionDos">click para registrar al cliente?</a>'
      })
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente encontrado',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  buscarVehiculo(){
    this.dataServices.getVehicul(this.cotizacion.vehiculoBusqueda).subscribe(doc=>{
      this.vehicle=[]
      doc.forEach((element:any)=>{
        this.vehicle.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
    if(this.vehicle.length===0){
      Swal.fire({
        icon: 'error',
        title: 'Modelo de vehiculo No encontrado',
        text: 'El Modelo no esta registrado!',
        footer: '<a href="/clientesVersionDos">click para registrar nuevo vihiculo?</a>'
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
  }
  
  seleccionarCliente(id: string){
    this.cotizacion.idCliente=id;
      Swal.fire({
        icon: 'success',
        title: 'Cliente seleccionado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  
  seleccionarVehiculo(id: string){
      this.cotizacion.idVehiculo=id;
      Swal.fire({
        icon: 'success',
        title: 'Vehiculo seleccionado con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }


}
