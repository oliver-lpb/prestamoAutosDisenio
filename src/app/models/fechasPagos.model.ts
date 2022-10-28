export class fechasPagos {
    nombre: string;
    fecha: string;
    fotoUrl:string;
    constructor(
        nombre: string,
        fecha: string,
        fotoUrl:string
        ){
        this.nombre = nombre;
        this.fecha = fecha;
        this.fotoUrl = fotoUrl;
    }
}