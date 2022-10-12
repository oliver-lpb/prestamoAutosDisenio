export class userModel {
    fotoUrl: string;
    id?: string;
    nombre: string;
    apellido: string;
    dpi: number;
    NumNit: number;
    correo: string;
    direccion: string;
    telefono: string;
    telefonoSecundario: string;
    sexo: string;

    casa:string;
    estadoCivil:string;

    refNombrePrimer:string;
    refTelefonoPrimer:string;
    refParentescoPrimer:string;

    refNombreSegundo:string;
    refTelefonoSegundo:string;
    refParentescoSegundo:string;

    refNombreTercer:string;
    refTelefonoTercer:string;
    refParentescoTercer:string;
    

    //fechas
    fechaCreacion: Date;
    fehcaActualizacion: Date;

    constructor(
        nombre:string,
        apellido:string,
        dpi: number,correo: string,
        direccion: string,
        NumNit: number,
        telefono: string,
        telefonoSecundario: string,
        fotoUrl: string,
        sexo: string,
        
        casa:string,
        estadoCivil:string,
        refNombrePrimer:string,
        refTelefonoPrimer:string,
        refParentescoPrimer:string,
        refNombreSegundo:string,
        refTelefonoSegundo:string,
        refParentescoSegundo:string,
        refNombreTercer:string,
        refTelefonoTercer:string,
        refParentescoTercer:string,

        fechaCreacion:Date,
        fehcaActualizacion: Date
        ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dpi = dpi;
        this.correo = correo;
        this.direccion = direccion;
        this.NumNit = NumNit;
        this.telefono = telefono;
        this.telefonoSecundario = telefonoSecundario;
        this.fotoUrl = fotoUrl;
        this.sexo = sexo;

        this.casa= casa;
        this.estadoCivil = estadoCivil;
        this.refNombrePrimer = refNombrePrimer;
        this.refTelefonoPrimer = refTelefonoPrimer;
        this.refParentescoPrimer = refParentescoPrimer
        this.refNombreSegundo = refNombreSegundo;
        this.refTelefonoSegundo = refTelefonoSegundo;
        this.refParentescoSegundo = refParentescoSegundo;
        this.refNombreTercer = refNombreTercer
        this.refTelefonoTercer = refTelefonoTercer;
        this.refParentescoTercer = refParentescoTercer;

        this.fechaCreacion = new Date();
        this.fehcaActualizacion = new Date();
    }
    
    

}