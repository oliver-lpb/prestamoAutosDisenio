import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
//importacion de servicio
import { DatosService } from "src/app/services/data.service";
import { ActivatedRoute, Router } from "@angular/router";


//import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

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
  checked = true;
  form: FormGroup;
  loading = false;
  titulo = "Agregar Cliente";
  foto:string='';
  panelOpenState = false;
  step = 0;
  images: string[];
  verificadorFoto=true;

  @Output() seleccionado: EventEmitter<boolean>;

  constructor(private fb: FormBuilder,private dataServices: DatosService,private aRote: ActivatedRoute,private router: Router,/*private storage: Storage*/) {
    this.images = [];
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
      telefonoSecundario: [""],
      fotoUrl: ["", Validators.required],
      sexo: ["", Validators.required],

      casa: ["", Validators.required],
      estadoCivil: ["", Validators.required],

      refNombrePrimer: ["", Validators.required],
      refTelefonoPrimer: ["", Validators.required],
      refParentescoPrimer: ["", Validators.required],

      refNombreSegundo: ["", Validators.required],
      refTelefonoSegundo: ["", Validators.required],
      refParentescoSegundo: ["", Validators.required],

      refNombreTercer: ["", Validators.required],
      refTelefonoTercer: ["", Validators.required],
      refParentescoTercer: ["", Validators.required],



    });
    this.seleccionado = new EventEmitter();
    
  }

  

  ngOnInit(): void {
    this.leerEditar();
    this.panelOpenState = false;
    this.step = 0;
    
  }

  async newImageUpload(event:any){
    const path = 'images';
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
    const User: any = {
      nombre: this.form.value.nombre, //quite el null
      apellido: this.form.value.apellido,
      dpi: this.form.value.dpi,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,

      NumNit: this.form.value.NumNit,
      telefono: this.form.value.telefono,
      telefonoSecundario: this.form.value.telefonoSecundario,
      fotoUrl: this.foto,
      sexo: this.form.value.sexo,
      //new
      casa:this.form.value.casa,
      estadoCivil:this.form.value.estadoCivil,
      //referencias primer
      refNombrePrimer:this.form.value.refNombrePrimer,
      refTelefonoPrimer:this.form.value.refTelefonoPrimer,
      refParentescoPrimer:this.form.value.refParentescoPrimer,
      //referencias segundo
      refNombreSegundo:this.form.value.refNombreSegundo,
      refTelefonoSegundo:this.form.value.refTelefonoSegundo,
      refParentescoSegundo:this.form.value.refParentescoSegundo,
      //referencias tercer
      refNombreTercer:this.form.value.refNombreTercer,
      refTelefonoTercer:this.form.value.refTelefonoTercer,
      refParentescoTercer:this.form.value.refParentescoTercer,
      
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

      //new
      casa:this.form.value.casa,
      estadoCivil:this.form.value.estadoCivil,
      //referencias primer
      refNombrePrimer:this.form.value.refNombrePrimer,
      refTelefonoPrimer:this.form.value.refTelefonoPrimer,
      refParentescoPrimer:this.form.value.refParentescoPrimer,
      //referencias segundo
      refNombreSegundo:this.form.value.refNombreSegundo,
      refTelefonoSegundo:this.form.value.refTelefonoSegundo,
      refParentescoSegundo:this.form.value.refParentescoSegundo,
      //referencias tercer
      refNombreTercer:this.form.value.refNombreTercer,
      refTelefonoTercer:this.form.value.refTelefonoTercer,
      refParentescoTercer:this.form.value.refParentescoTercer,

      fotoUrl: this.foto,
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
    this.router.navigate(["./clientesVersionDos"]);
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
              //new
          casa:data.payload.data()["casa"],
          estadoCivil:data.payload.data()["estadoCivil"],
          //referencias primer
          refNombrePrimer:data.payload.data()["refNombrePrimer"],
          refTelefonoPrimer:data.payload.data()["refTelefonoPrimer"],
          refParentescoPrimer:data.payload.data()["refParentescoPrimer"],
          //referencias segundo
          refNombreSegundo:data.payload.data()["refNombreSegundo"],
          refTelefonoSegundo:data.payload.data()["refTelefonoSegundo"],
          refParentescoSegundo:data.payload.data()["refParentescoSegundo"],
          //referencias tercer
          refNombreTercer:data.payload.data()["refNombreTercer"],
          refTelefonoTercer:data.payload.data()["refTelefonoTercer"],
          refParentescoTercer:data.payload.data()["refParentescoTercer"],
        })}
        );
      }
  }


  getValidacion(validacion: string) {
    return this.form.get(validacion);
  }

  cancelar() {
    this.seleccionado.emit(false);
    this.router.navigate(["/clientesVersionDos"]);
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  
}
