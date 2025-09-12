export interface MovimientoDTO {
    ejeInicioX: number;
    ejeFinalX: number;
    ejeInicioY: number;
    ejeFinalY: number;
    ejeZ: number;

    //aspersion
    velocidad: number;
    flujo: number;
    cobertura: number;

    //capas de recubrimiento
    pasadas: number;
}


export interface ControlTiempoDTO {
    duracion: number;
    accion: string;
}