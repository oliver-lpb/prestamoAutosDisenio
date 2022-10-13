import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { Cotizacion, Quotation } from 'src/app/models/quotation.model';
import { DatosService } from 'src/app/services/data.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

  listPagos: [] | undefined;
  cotizacion: Quotation = {
    interesTipo: 0,
    monto: 0,
    cuotaDeseada: 0,
    interesFijo: 0,
    interesPorcentaje: 0,
    fechaPago: '',
    periodoPago: '',
    cliente: '',
    foto: '',
    capital: 0,
    resultado: 0,
    saldo: 0,
    porcentajeVariable: 0
  }

  cot: Cotizacion = {
    nombre: '',
    pagos: [],
  }




  constructor(private dataServices: DatosService) {
  }

  ngOnInit(): void {
  }

  tipoInteres(tipo: number) {
    this.cotizacion.interesTipo = tipo;
    //console.log(this.cotizacion.interesTipo)
  }
  comprobacionDatos() {
    this.cotizacion.porcentajeVariable = this.cotizacion.interesPorcentaje;
    //console.log(this.cotizacion.porcentajeVariable);
    this.cotizacion.interesPorcentaje = this.cotizacion.monto * this.cotizacion.interesPorcentaje;

    if (this.cotizacion.interesTipo == 1) {
      if (this.cotizacion.monto < this.cotizacion.cuotaDeseada || this.cotizacion.monto == 0 || this.cotizacion.cuotaDeseada == 0 || this.cotizacion.interesFijo == 0 || this.cotizacion.fechaPago == "" || this.cotizacion.periodoPago == "" || this.cotizacion.cuotaDeseada <= this.cotizacion.interesFijo) {
        console.log("Error datos no rellenados o Interes mayor a la cuota deseada")
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

      this.cot.nombre = this.cotizacion.cliente;
      this.cot.pagos.push({
        "fechaPago": this.cotizacion.fechaPago,
        "cuotaCotizacion": this.cotizacion.cuotaDeseada,
        "interesCotizacion": this.cotizacion.interesPorcentaje,
        "capitalCotizacion": this.cotizacion.capital,
        "saldoCotizacion": this.cotizacion.saldo,
        "firmaPago": "Boleta de pago"
      });
      //console.log(this.cot);

      const noboleta = '0001';
      const path = 'cotizacion/';
      this.dataServices.createDoc(this.cot, path, noboleta);


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


      this.cot.nombre = this.cotizacion.cliente;
      this.cot.pagos.push({
        "fechaPago": this.cotizacion.fechaPago,
        "cuotaCotizacion": this.cotizacion.cuotaDeseada,
        "interesCotizacion": this.cotizacion.interesFijo,
        "capitalCotizacion": this.cotizacion.capital,
        "saldoCotizacion": this.cotizacion.saldo,
        "firmaPago": "Boleta de pago"
      });
      //console.log(this.cot);

      const noboleta = '0001';
      const path = 'cotizacion/';
      this.dataServices.createDoc(this.cot, path, noboleta);


      const cot: Cotizacion = {
        nombre: this.cotizacion.cliente,
        pagos: [{
          fechaPago: this.cotizacion.fechaPago,
          cuotaCotizacion: this.cotizacion.cuotaDeseada,
          interesCotizacion: this.cotizacion.interesFijo,
          capitalCotizacion: this.cotizacion.capital,
          saldoCotizacion: this.cotizacion.capital,
          firmaPago: "Por firmar"
        }]
      }; /* console.log(cot)*/






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
    //document.writeln ("</table>");

  }

}
