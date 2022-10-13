export class vehicleModel {
    id?: string;
    fotoUrl: string;
    nombre: string;
    marca: string;
    modelo: string;
    tipo: string;
    color: string;
    //fechas
    fechaCreacion: Date;
    fehcaActualizacion: Date;

    constructor(
        fotoUrl: string,
        nombre: string,
        marca: string,
        modelo: string,
        tipo: string,
        color: string,
        fechaCreacion:Date,
        fehcaActualizacion: Date
        ){
        this.fotoUrl = fotoUrl;
        this.nombre = nombre;
        this.marca = marca;
        this.modelo = modelo;
        this.tipo = tipo;
        this.color = color;

        this.fechaCreacion = new Date();
        this.fehcaActualizacion = new Date();
    }
    
    

}