export interface Quotation {
    interesTipo: number;
    monto: number;
    cuotaDeseada: number;
    interesFijo: number;
    interesPorcentaje: number;
    fechaPago: string;
    periodoPago: string;
    dpiBusqueda: string;
    idCliente: string;
    vehiculoBusqueda: string;
    idVehiculo: string;
    capital: number;
    resultado: number;
    saldo: number;
    porcentajeVariable: number;
    mora: number;
}

export interface Cotizacion {
    id?: string;
    idCliente: string;
    idVehiculo: string;
    mora?: number;
    pagos: listaPago[];
}

export interface listaPago {
    fechaPago: string;
    cuotaCotizacion: number;
    interesCotizacion: number;
    capitalCotizacion: number;
    saldoCotizacion: number;
    firmaPago: string;
}

export interface datosPDF{
    clientNombre:string;
    clientApellido:string;
    clientDpi:string;
    clientDireccion:string;
    clientTelefono:string;
    autoNombre:string;
    autoModelo:string;
    autoMarca:string;
    autoColor:string;
    clientNit?:string;
}

export interface ventaDatos{
    id?: string;
    ventaNombre:string;
    ventaFecha:number;
    ventaCantidad:number;
}