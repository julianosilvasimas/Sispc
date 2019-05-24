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