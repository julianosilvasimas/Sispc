import { SelectItem } from 'primeng/api';

export interface Indicadores{
    id: number,
    area: string,
    tipo: string,
    referencia: Date,
    tempo: Date,
    ciclo: number,
    orcado: number,
    reali: number,
    pecld: number,
    atendente: number,
    atendimento: number,
    comentario: string,
    forecast: number,
}

export interface Precos{
    id: number,
    produto: string,
    preco: number
}

export interface Supervisoes{
    id: number,
    codSupervisao: string,
    supervisao: string
}

export interface UtilizacaoVeiculos{
    placa: string,
    motorista: string,
    motor_ligado: string,
    hodometro_inicial: string,
    hodometro_final: string,
    distancia_km: string,
}