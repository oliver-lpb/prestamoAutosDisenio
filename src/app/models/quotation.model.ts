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
    foto: string;
    capital: number;
    resultado: number;
    saldo: number;
    porcentajeVariable: number;  
}

export interface Cotizacion {
    id?: string;
    idCliente: string;
    idVehiculo: string;
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
