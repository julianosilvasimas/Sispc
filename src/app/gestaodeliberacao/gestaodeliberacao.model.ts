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

export interface Process{
    carta: string,
    cartaProcedente: string,
    contrato: number,
    dataAviso1: number,
    dataAviso2: number,
    dataAviso3: number,
    dataJulgado: number,
    deliberacao: number,
    idIrregularidade: number,
    mesRetroativo: number,
    num_ligacao: number,
    processo: string,
    titular: string,
    usuarioPresente: string
}