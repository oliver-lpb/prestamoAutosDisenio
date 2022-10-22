export class ventaCapitalModel {
    id?: string;
    cantidadPrestamo: number;
    idCliente: string;
    idCotizacion: string;
    //fechas
    fechaCreacion:number;
    

    constructor(
        cantidadPrestamo: number,
        idCliente: string,
        idCotizacion: string,
        fechaCreacion:number,
        
        ){
        this.cantidadPrestamo = cantidadPrestamo;
        this.idCliente = idCliente;
        this.idCotizacion = idCotizacion;
        this.fechaCreacion = fechaCreacion;
        
    }
    
    

}