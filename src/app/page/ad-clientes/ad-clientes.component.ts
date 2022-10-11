import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//importacion del modelo
import { userModel } from "src/app/models/user.model";
//importacion de servicio
import { DatosService } from "src/app/services/data.service";

import { ActivatedRoute, Route, Router } from "@angular/router";

@Component({
  selector: "app-ad-clientes",
  templateUrl: "./ad-clientes.component.html",
  styleUrls: ["./ad-clientes.component.scss"],
})
export class AdClientesComponent implements OnInit {
  //id para busacar
  id: string | null;
  //validacion de correo
  submitted = false;

  @Output() seleccionado: EventEmitter<boolean>;

  constructor(
    private fb: FormBuilder,
    private dataServices: DatosService,
    private aRote: ActivatedRoute,
    private router: Router
  ) {
    //Valdacion de formulario
    this.id = this.aRote.snapshot.paramMap.get("id");
    console.log(this.id);

    this.form = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      dpi: [
        "",
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      correo: ["", [Validators.required, Validators.email]],
      direccion: ["", Validators.required],
      NumNit: [
        "",
        [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
      ],
      telefono: ["", Validators.required],
      telefonoSecundario: ["", Validators.required],
      fotoUrl: ["", Validators.required],
      sexo: ["", Validators.required],
    });

    this.seleccionado = new EventEmitter();
  }

  form: FormGroup;
  loading = false;
  titulo = "Agregar Cliente";

  ngOnInit(): void {
    this.leerEditar();
  }

  agregarEditar() {
    
    if (this.id === null) {
      
      this.registerUser();
    } else {
      
      this.actualizarUsuario(this.id);
    }
  }

  registerUser() {
    
    console.log('paso en if registrar');
    
    this.submitted = true;
    //condicion para validar formulario
    if (this.form.invalid) {
      console.log('paso en if validacion');
      return;
    }
    const User: any = {
      nombre: this.form.value.nombre, //quite el null
      apellido: this.form.value.apellido,
      dpi: this.form.value.dpi,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,

      NumNit: this.form.value.NumNit,
      telefono: this.form.value.telefono,
      telefonoSecundario: this.form.value.telefonoSecundario,
      fotoUrl: this.form.value.fotoUrl,
      sexo: this.form.value.sexo,
      
      fechaCreacion: new Date(),
      fehcaActualizacion: new Date(),
    };
    
    this.dataServices.saveUser(User).then(
      () => {
        this.loading = false;
        //this.toastr.success("Cliente Registrado", 'Nuevo Registro')
        
        this.form.reset();
      },
      (error) => {
        this.loading = false;
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
    const User: any = {
      nombre: this.form.value.nombre, //null para que se registre de forma vacia
      apellido: this.form.value.apellido,
      dpi: this.form.value.dpi,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
      NumNit: this.form.value.NumNit,
      telefono: this.form.value.telefono,
      telefonoSecundario: this.form.value.telefonoSecundario,

      fotoUrl: this.form.value.fotoUrl,
      sexo: this.form.value.sexo,
      fehcaActualizacion: new Date(),
    };
    this.loading = true;
    this.dataServices.actualizaUsuario(id, User).then(() => {
      this.loading = false;
      console.log("Tarjeta modificada");
      //this.toastr.success('Cambios realizados con exito','Modificaion')
      this.form.reset();
    });
    this.router.navigate(["./listUser"]);
  }

  leerEditar() {
    this.titulo = "Actualizar Usuario";
    if (this.id !== null) {
      this.dataServices.getUsuario(this.id).subscribe((data) => {
        console.log(data);
        this.form.setValue({
          nombre: data.payload.data()["nombre"],
          apellido: data.payload.data()["apellido"],
          dpi: data.payload.data()["dpi"],
          correo: data.payload.data()["correo"],
          direccion: data.payload.data()["direccion"],
          NumNit: data.payload.data()["NumNit"],
          telefono: data.payload.data()["telefono"],
          telefonoSecundario: data.payload.data()["telefonoSecundario"],
          fotoUrl: data.payload.data()["fotoUrl"],
          sexo: data.payload.data()["sexo"],
        });
      });
    }
  }

  getValidacion(validacion: string) {
    return this.form.get(validacion);
  }

  cancelar() {
    this.seleccionado.emit(false);
    this.router.navigate(["/clientesVersionDos"]);
  }
}
