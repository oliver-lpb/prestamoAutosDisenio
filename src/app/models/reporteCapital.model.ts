export class ventaCapitalModel {
    id?: string;
    ventaCantidad: number;
    ventaNombre: string;
    fechaVenta: string;
    
    

    constructor(
        ventaCantidad: number,
        ventaNombre: string,
        fechaVenta: string,
        
        ){
        this.ventaCantidad = ventaCantidad;
        this.ventaNombre = ventaNombre;
        this.fechaVenta = fechaVenta;
        
    }
    
    

}