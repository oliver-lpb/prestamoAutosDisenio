import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//importacion de servicio
import { DatosService } from "src/app/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  
  form: FormGroup;
  images: string[];
  id: string | null;
  verificadorFoto=true;
  foto:string='';
  submitted = false;

  @Output() seleccionado: EventEmitter<boolean>;

  constructor(private fb: FormBuilder,private dataServices: DatosService,private aRote: ActivatedRoute,private router: Router) {
    this.images = [];
    //Valdacion de formulario
    this.id = this.aRote.snapshot.paramMap.get("id");
    console.log(this.id);
    this.form = this.fb.group({
      nombre: ["", Validators.required],
      marca: ["", Validators.required],
      modelo: ["", Validators.required],
      tipo: ["", Validators.required],
      color: ["", Validators.required],
      fotoUrl: ["", Validators.required],
    });
    this.seleccionado = new EventEmitter();
    
  }

  ngOnInit(): void {
  }

  getValidacion(validacion: string) {
    return this.form.get(validacion);
  }
  
  async newImageUpload(event:any){
    const path = 'vehicle';
    const name =  event.target.files[0].name;
    const file = event.target.files[0];
    const res = await this.dataServices.uptoadlmage(file, path, name);
    this.foto = res;
    this.verificadorFoto=false;
    
  }

  agregarEditar() {
    
    if (this.id === null) {
      
      this.registerUser();
    } else {
      
      this.actualizarUsuario(this.id);
    }
  }

  registerUser() {
    
    this.submitted = true;
    //condicion para validar formulario
    if (this.form.invalid && this.verificadorFoto) {
      console.log('paso en if validacion denegada');
      return;
    }
    const Vehicle: any = {
      nombre: this.form.value.nombre, //quite el null
      marca: this.form.value.marca,
      modelo: this.form.value.modelo,
      tipo: this.form.value.tipo,
      color: this.form.value.color,
      fotoUrl: this.foto,
      fechaCreacion: new Date(),
      fehcaActualizacion: new Date(),
    };
    
    this.dataServices.saveVehicle(Vehicle).then(
      () => {
        
        //this.toastr.success("Cliente Registrado", 'Nuevo Registro')
        console.log('se esta agregando el vehiculo')
        this.form.reset();
      },
      (error) => {
        
        //this.toastr.error("Dantos Invalidos","Error")
        console.log(error);
        
      }
    );
    
      this.seleccionado.emit(false);
    
  }

  actualizarUsuario(id: string) {
    this.submitted = true;
    //condicion para validar formulario
    if (this.form.invalid) {
      return;
    }
    const Vehicle: any = {
      nombre: this.form.value.nombre, //quite el null
      marca: this.form.value.marca,
      modelo: this.form.value.modelo,
      tipo: this.form.value.tipo,
      color: this.form.value.color,
      fotoUrl: this.foto,
      fechaCreacion: new Date(),
      fehcaActualizacion: new Date(),
    };
    
    this.dataServices.actualizarVehiculo(id, Vehicle).then(() => {
      
      console.log("Tarjeta modificada");
      //this.toastr.success('Cambios realizados con exito','Modificaion')
      this.form.reset();
    });
    this.router.navigate(["./clientesVersionDos"]);
  }

  leerEditar() {
    if (this.id !== null) {
      this.dataServices.getVehiculoEdit(this.id).subscribe((data) => {
        console.log(data);
        this.form.setValue({
          nombre: data.payload.data()["nombre"],
          marca: data.payload.data()["apellido"],
          modelo: data.payload.data()["dpi"],
          tipo: data.payload.data()["correo"],
          color: data.payload.data()["direccion"],
          fotoUrl: data.payload.data()["fotoUrl"],
          
        })}
        );
      }
  }


  cancelar() {
    this.seleccionado.emit(false);
    this.router.navigate(["/vehiculos"]);
  }

}
