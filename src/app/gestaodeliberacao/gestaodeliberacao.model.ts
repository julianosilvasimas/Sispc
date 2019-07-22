export interface  Delib{
    idIrregularidade: number;
    contrato: any[];
    cod_ocorrencia_1: number;
    cod_ocorrencia_2: number;
    cod_ocorrencia_3: number;
    dat_notificacao: any;
    num_ligacao: number;
    num_termo_ocorrencia: string;
    sit_notificacao: string;
    val_custos: number;
    val_dif_consumo: number;
    val_entrada: number;
    val_multa: number;
    val_regularizacao: number;
    val_total: number;
    val_troca_hd: number;
}

export interface InputDelib{
    idIrregularidade: number,
    dataAviso1: Date,
    dataAviso2: Date,
    dataAviso3: Date,
    mesRetroativo: number,
    titular: string,
    usuarioPresente: string,
    contrato: number,
    num_ligacao: number,
    carta: string,
    cartaProcedente: string
}

export interface Teste{
    ask: string,
    bid: string,
    epoch: string,
    id: string,
    quote: string,
    symbol: string,
}

export interface Irregs{
    codigo: string,
    fraude: string,
    valor: string
}

export interface Process{
    carta: string,
    cartaProcedente: string,
    contrato: number,
    dataAviso1: number,
    dataAviso2: number,
    dataAviso3: Date,
    dataJulgado: number,
    deliberacao: number,
    idIrregularidade: number,
    mesRetroativo: number,
    num_ligacao: number,
    processo: string,
    titular: string,
    usuarioPresente: string,
    ro: string,
    num_termo: string
}

export interface Entrega{
    matricula: number,
    nome: string,
    rua: string,
    numero: string,
    complemento: string,
    bairro: string,
    cidade: string
}