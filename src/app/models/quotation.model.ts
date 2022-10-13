export interface Quotation {
    interesTipo: number;
    monto: number;
    cuotaDeseada: number;
    interesFijo: number;
    interesPorcentaje: number;
    fechaPago: string;
    periodoPago: string;
    cliente: string;
    foto: string;
    capital: number;
    resultado: number;
    saldo: number;
    porcentajeVariable: number;
}

export interface Cotizacion {
    nombre: string;
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
