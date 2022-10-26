import { Component, OnInit } from '@angular/core';
import { Cotizacion } from 'src/app/models/quotation.model';
import { userModel } from 'src/app/models/user.model';
import { DatosService } from 'src/app/services/data.service';

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
    pagos: [],
  }

  //listar clientes
  users:userModel[]=[];
  displayedColumns: string[] = ['Nombre', 'Correo', 'Direccion', 'Telefonos', 'Botones'];

 
  constructor(public data:DatosService) { }

  ngOnInit(): void {
    this.data.getDeudores()
  }

  obtenerCotizacion(id:string,nombre:string){
    this.data.getCot2(id).then(resp=>{
      this.datos=resp;
      /*console.log(this.datos[0].id,"datos llegando");
      console.log(this.datos[0].idCliente,"id cliente");
      console.log(this.datos[0].idVehiculo,"datos llegando");
      console.log(this.datos[0].pagos[1].fechaPago,"datos llegando");*/
      console.log(nombre);
    });
  }



  pago(id:string, fecha:string){
    console.log(id);
    console.log(fecha);
    

  }

  mora(id:string, fecha:string){
    console.log(id);
    console.log(fecha);
  }


  
   

  
}
