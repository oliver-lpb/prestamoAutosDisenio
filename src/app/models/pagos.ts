export class datosDeudores{
    id?: string = "";
    idCliente: string = "";
    idVehiculo: string = "";
    nombre?: string;
    apellido?: string;
    dpi?: number;
    NumNit?: number;
    correo?: string;
    direccion?: string;
    telefono?: string;
    telefonoSecundario?: string;
    mora?: string;
}

export interface reportePagos{
    id?: string;
    reporteNombre:string;
    reporteFecha:string;
    reporteSaldo:number;
    reporteInteres:number;
}

export var logoPDF:string=
    "data:image/jpeg;base64,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";
