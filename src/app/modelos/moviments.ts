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

    //tiempo
    duracion: number;
    pasadas: number;
}