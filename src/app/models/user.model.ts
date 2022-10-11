export class userModel {
    id?: string;
    nombre: string;
    apellido: string;
    dpi: number;
    correo: string;
    direccion: string;
    NumNit: number;
    telefono: string;
    telefonoSecundario: string;
    fotoUrl: string;
    sexo: string;
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
        this.fechaCreacion = new Date();
        this.fehcaActualizacion = new Date();
    }
    
    

}