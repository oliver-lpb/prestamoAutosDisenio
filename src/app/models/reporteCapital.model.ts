export class ventaCapitalModel {
    id?: string;
    cantidadPrestamo: string;
    idCliente: string;
    idCotizacion: string;
    //fechas
    fechaCreacion:Date;
    

    constructor(
        cantidadPrestamo: string,
        idCliente: string,
        idCotizacion: string,
        fechaCreacion:Date,
        
        ){
        this.cantidadPrestamo = cantidadPrestamo;
        this.idCliente = idCliente;
        this.idCotizacion = idCotizacion;
        this.fechaCreacion = new Date();
        
    }
    
    

}