import { Component, OnInit, Input } from '@angular/core';
import { GestaoDeliberacaoService } from './../gestaodeliberacao.service';
import{Delib} from './../gestaodeliberacao.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-painelprocesso',
  templateUrl: './painelprocesso.component.html',
  styleUrls: ['./painelprocesso.component.css'],
  providers: [MessageService]
 })
export class PainelprocessoComponent implements OnInit {

  fraudes: any[];
  irregs: any[];
  @Input() deliberacao: Delib

  processo: string;
  termo: string;
  idIrregularidade:number;
  dataNotificacao:string;
  matricula: number;
  contrato: number;
  cpf: string;
  hd: string;
  statusLigacao: string;
  statusContrato: string;
  nome: string;
  rua: string;
  bairro: string;
  cidade: string;
  valCusto: number;
  valMulta: number;
  valTroca: number;
  valRetro: number;
  valTotal: number;
  valDesconto: number;

  mesRetroativo: number;
  checkTitular: any;
  checkPresenca: any;
  checkCarta: any;
  checkProcedente: any;

  cliente:string;

  ano: string;
  mes: string;
  mat: string;
  del: string;

  constructor(
    private service: GestaoDeliberacaoService,
    private messageService: MessageService
     ) { }

  ngOnInit() {
    this.mesRetroativo = null;
    this.checkTitular = [];
    this.checkPresenca = [];
    this.checkCarta = [];
    this.checkPresenca = [];
  }

  

  pesquisarNot(termo: string){
    this.irregs = [
      { codigo: '105' , fraude: 'MULTA BY-PASS RAMAL 3/4-RES' , valor: '600.84'},
      { codigo: '143' , fraude: 'MULTA DANOS REDE PUBLICA-RES' , valor: '1976.34'},
      { codigo: '150' , fraude: 'MULTA LIG. CLANDESTINA AGUA 3/4-RES' , valor: '600.84'},
      { codigo: '164' , fraude: 'MULTA VIOLACAO DE CORTE CAVALETE 3/4"' , valor: '400.57'},
      { codigo: '171' , fraude: 'MULTA VIOLACAO/DANOS HD 3/4-RES' , valor: '400.57'},
      { codigo: '179' , fraude: 'MULTA VIOLACAO DE CORTE RAMAL 3/4"' , valor: '583.69'},
      { codigo: '181' , fraude: 'MULTA DERIV. P/SUPRIM. IMOVEL 3/4 -RES' , valor: '150.2'},
      { codigo: '186' , fraude: 'MULTA INTERC. ALIM. 3/4' , valor: '400.54'},
      { codigo: '205' , fraude: 'MULTA BY-PASS RAMAL 3/4-RES - DEL 3119 20%' , valor: '480.67'},
      { codigo: '243' , fraude: 'MULTA DANOS REDE PUBLICA-RES - DEL 3119 20%' , valor: '1581.07'},
      { codigo: '250' , fraude: 'MULTA LIG. CLANDESTINA AGUA 3/4-RES - DEL 3119 20%' , valor: '480.67'},
      { codigo: '264' , fraude: 'MULTA VIOLACAO DE CORTE CAVALETE 3/4" - DEL 3119 20%' , valor: '320.46'},
      { codigo: '271' , fraude: 'MULTA VIOLACAO/DANOS HD 3/4-RES - DEL 3119 20%' , valor: '320.46'},
      { codigo: '279' , fraude: 'MULTA VIOLACAO DE CORTE RAMAL 3/4" - DEL 3119 20%' , valor: '466.95'},
      { codigo: '281' , fraude: 'MULTA DERIV. P/SUPRIM. IMOVEL 3/4 -RES - DEL 3119 20%' , valor: '120.16'},
      { codigo: '286' , fraude: 'MULTA INTERC. ALIM. 3/4 - DEL 3119 20%' , valor: '320.43'},
      { codigo: '405' , fraude: 'MULTA BY-PASS RAMAL 3/4-RES - DEL 3119 40%' , valor: '360.5'},
      { codigo: '443' , fraude: 'MULTA DANOS REDE PUBLICA-RES - DEL 3119 40%' , valor: '1185.8'},
      { codigo: '450' , fraude: 'MULTA LIG. CLANDESTINA AGUA 3/4-RES - DEL 3119 40%' , valor: '360.5'},
      { codigo: '464' , fraude: 'MULTA VIOLACAO DE CORTE CAVALETE 3/4" - DEL 3119 40%' , valor: '240.34'},
      { codigo: '471' , fraude: 'MULTA VIOLACAO/DANOS HD 3/4-RES - DEL 3119 40%' , valor: '240.34'},
      { codigo: '479' , fraude: 'MULTA VIOLACAO DE CORTE RAMAL 3/4" - DEL 3119 40%' , valor: '350.21'},
      { codigo: '481' , fraude: 'MULTA DERIV. P/SUPRIM. IMOVEL 3/4 -RES - DEL 3119 40%' , valor: '90.12'},
      { codigo: '486' , fraude: 'MULTA INTERC. ALIM. 3/4 - DEL 3119 40%' , valor: '240.32'},
    ];
   

    // Realiza a busca da notificação
      this.service.notificacao(termo)
        .subscribe(
          delib  => {
            try{
              delib => this.deliberacao = delib.data
              this.idIrregularidade = delib[0].idIrregularidade

              this.termo = delib[0].num_termo_ocorrencia
              this.contrato = delib[0].contrato["contrato"]
              this.matricula = delib[0].contrato["matricula"]
              this.cpf = delib[0].contrato["num_doc_1"]
              this.hd = delib[0].contrato["num_medidor"]
              this.statusLigacao = delib[0].contrato["sit_lig"]
              this.statusContrato = delib[0].contrato["sit_contrato"]
              this.nome = delib[0].contrato["nom_cliente"]
              this.cliente = delib[0].contrato["nom_cliente"]
              this.rua = delib[0].contrato["nom_logradouro"] +" , "+ delib[0].contrato["nro"] 
              + " "+ delib[0].contrato["dsc_complemento"]
              this.bairro = delib[0].contrato["nom_bairro"]
              this.cidade = delib[0].contrato["cidade"]
              //verificar como fazer a data notificaçao
              this.dataNotificacao = delib[0].dat_notificacao
              console.log(this.dataNotificacao)

              this.valCusto = delib[0].val_custos
              this.valMulta = delib[0].val_multa
              this.valTroca = delib[0].val_troca_hd
              this.valRetro = delib[0].val_dif_consumo
              this.valTotal = delib[0].val_total
              this.valDesconto = this.valTotal - (this.valCusto + this.valMulta + this.valTroca + 
                this.valRetro)
              this.fraudes = [];
              for (var i in this.irregs){
                if(delib[0].cod_ocorrencia_1.toString() === this.irregs[i].codigo.toString()){
                this.fraudes.push(this.irregs[i]);
              }else if(delib[0].cod_ocorrencia_2.toString() === this.irregs[i].codigo.toString()){
                this.fraudes.push(this.irregs[i]);
              }else if(delib[0].cod_ocorrencia_3.toString() === this.irregs[i].codigo.toString()){
                this.fraudes.push(this.irregs[i]);
              }
            }
          }catch(e){
            this.messageService.add({severity:'error', summary: 'Notificação não encontrada!', 
            detail:"já existe o termo "+this.termo+" na base de dados!", life: 60000});
          }  
          //console.log("requisicao bem sucedida! ", this.fraudes);
        },
        
        error  => {
          console.log("Erro: ", error);
          this.messageService.add({severity:'error', summary: "Falha na Consulta!",
           detail:error.message, life: 5000});
        }
      );
  }
 // 0000.00-000000/000000
  formatarProcesso(){
    this.ano = this.processo.substring(0,4);
    this.mes = this.processo.substring(4,6);
    this.mat = this.processo.substring(6,12);
    this.del = this.processo.substring(12,18)

    this.processo = this.ano +'.'+ this.mes +'-'+ this.mat +'/'+ this.del
  }

 
  async enviar(){
    var n;
    var p;
    var c;
    var cp;

    if(this.checkPresenca == 1 && this.checkTitular != 1 ){
      n = this.nome;
    }else{
      n = this.cliente;
    }
    if(this.checkPresenca == 1){
      p = "1"
    }else{
      p = "0"
    }
    if(this.checkCarta == 1){
      c = "1"
    }else{
      c = "0"
    }
    if(this.checkProcedente == 1){
      cp = "1"
    }else{
      cp = "0"
    }

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

    //Pesquisa irreg na tabela de gestão
    this.service.processo(this.idIrregularidade)
        .subscribe(
          processo  => {
            try{
              this.processo = processo[0].processo;
              this.formatarProcesso()
              this.messageService.add({severity:'error', summary: 'Dados não Enviados!', 
              detail:"já existe o processo "+this.processo+" para essa irregularidade", life: 60000});
              console.log(processo);
            }catch(e){

              this.service.InputDeliberacao(this.idIrregularidade,	null,	null,	 null,	
                this.mesRetroativo,
                n,	p,	this.contrato,	this.matricula, c, cp)
              .subscribe(
                response => {
                  if(response.status === 201){
                    this.messageService.add({severity:'success', summary: 'Sucesso!', 
                    detail:'Dados enviados corretamente!!!', life: 60000});
                    console.log('Dados enviados com sucesso!')
                  }
                },
                error =>  { 
                  this.messageService.add({severity:'error', summary: "Dados não Enviados!", 
                  detail:error.message, life: 5000});
                  console.log(error)
                }
              );
            }
          },  
          error  => {
            console.log("Erro: ", error);
            this.messageService.add({severity:'error', summary: "Falha na Consulta!", 
            detail:error.message, life: 5000});
          }

        );
      await delay(300);
      this.service.processo(this.idIrregularidade)
        .subscribe(
          processo  => {
            this.processo = processo[0].processo;
            this.formatarProcesso()
          },
        );
  }



  limpar(){
    this.processo = null;
    this.termo = null;
    this.idIrregularidade = null;
    this.dataNotificacao= null;
    this.matricula = null;
    this.contrato = null;
    this.cpf = null;
    this.hd = null;
    this.statusLigacao = null;
    this.statusContrato = null;
    this.nome = null;
    this.rua = null;
    this.bairro = null;
    this.cidade = null;
    this.valCusto = null;
    this.valMulta = null;
    this.valTroca = null;
    this.valRetro = null;
    this.valTotal = null;
    this.valDesconto = null;
    this.mesRetroativo = null;
    this.checkTitular = [];
    this.checkPresenca = [];
    this.checkCarta = [];
    this.checkPresenca = [];
    this.cliente = null;
    this.fraudes = [];
  }
 
}
