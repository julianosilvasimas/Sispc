import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from '../indicadores.model';
import { IndicadoresService } from '../indicadores.service';
import { MessageService, SelectItem } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-servcomercial',
  templateUrl: './servcomercial.component.html',
  providers: [MessageService]
})
export class ServcomercialComponent implements OnInit {

  indicador: string;
  date6: Date;
  
  @Input() indicadores : Indicadores
  
  angular: any;
  filtro: string;
  response: any;
  erro: any;
  hoje: Date;

  id : any;
  tempo: any;
  orcado: Number;
  realizado: Number;
  pdd: Number;
  atendente : Number;
  atendimento : Number;
  coment: string;
  forecast: Number;
  acao: string;
  analise: string;
  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  permissao: string;
  corte: boolean = true;

  items: SelectItem[];
  item: string;
  caracteresComent: number = 0 
  caracteresAcao: number = 0  


  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {
      if(sessionStorage.getItem('permissao1')==='ROLE_INDICADOR_COMERCIAL_USER'){
        this.items = [
          {label: 'Cortes', value: 'Cortes'},
          {label: 'Religações', value: 'Religacao'},
        ];
        this.item = 'Cortes'
      }else if(sessionStorage.getItem('permissao1')==='ROLE_INDICADOR_COMERCIAL_CONSULTA'){
        this.items = [
          {label: 'Ligações', value: 'Ligacoes Qtd'},
          {label: 'Lig.Vendas', value: 'Ligacoes - vendas Qtd'},
          {label: 'Lig.Cres.Vegetativo', value: 'Ligacoes - vegetativo Qtd'},
        ];
        this.item = 'Ligacoes Qtd'
      }else{
        this.items = [
          {label: 'Cortes', value: 'Cortes'},
          {label: 'Religações', value: 'Religacao'},
          {label: 'Ligações', value: 'Ligacoes Qtd'},
          {label: 'Lig.Vendas', value: 'Ligacoes - vendas Qtd'},
          {label: 'Lig.Cres.Vegetativo', value: 'Ligacoes - vegetativo Qtd'},
        ];
        this.item = 'Cortes'
      }
    }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('nome')
    this.permissao = sessionStorage.getItem('permissao1')
    if(this.permissao === 'ROLE_ADMIN'){
      this.disabled = !this.disabled;
      this.checkAdmin = 1;
    }   

    let today = new Date();
    let dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(dataInicio.getFullYear() +"-"+ (dataInicio.getMonth() + 1)  +"-"+ dataInicio.getDate());
    this.date6 = dataajustada;

    this.indicador = this.item
    this.pesquisar(this.date6);
  }

  onKeyComent(event: any) {
    if(event.key != 'Backspace'){
      this.caracteresComent = this.coment.length+1
    }
  }

  onKeyAcao(event: any) {
    if(event.key != 'Backspace'){
      this.caracteresAcao = this.acao.length+1
    }
  }

//**************************************************************//


  enviar(orc, real, reat, com){
    
    this.hoje = new Date();
    if (this.hoje.valueOf() - this.date6.valueOf() > parseFloat(`${API_BLOCK}`)){
        this.messageService.add({severity:'warn', summary: 'Alerta!', detail:'Não é possível edição anterior a 3 dias!!!', life: 5000});
    }else{

    //Pesquisa para captura do id e dos dados do formulário
      console.log("Enviando Dados!")
    this.IndicadoresService.indicadores(this.filtro, this.indicador)
    .subscribe(
      indicadores  => {
        this.id = indicadores[0].id
        this.orcado = orc.valueOf()
        this.realizado = real.valueOf()
        this.pdd = reat.valueOf()
        this.atendente = 0
        this.atendimento = 0
        this.coment = com
        this.forecast = 0

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcado, this.realizado, this.pdd, this.atendente,
       this.atendimento, this.coment, this.forecast, sessionStorage.getItem('nome'), this.acao, this.analise)
    .subscribe(
        response => {
          if(response === null){
            console.log("OK!!!!!!")
            this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados corretamente!!!', life: 5000});
          }
        },
        error =>  { 
          this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail:error.message, life: 5000});
          console.log(error)
    }
        );
      })

    }
    }

 //*****************************************************************//


  pesquisar(date6){

    this.filtro = date6.toISOString().substr(0,10)
    this.indicador = this.item
    if(this.indicador==='Cortes'){
      this.corte = true
    }else{
      this.corte =false
    }

  //********************************************************************//
    this.IndicadoresService.indicadores(this.filtro, this.indicador)
    .subscribe(
      indicadores  => {
        indicadores => this.indicadores = indicadores[0].data
        this.tempo = indicadores[0].tempo
        this.orcado = indicadores[0].orcado
        this.realizado = indicadores[0].reali
        this.pdd = indicadores[0].pecld
        this.coment = indicadores[0].comentario
        this.acao = indicadores[0].acao
        this.analise = indicadores[0].analise
        //console.log("requisicao bem sucedida!", indicadores[0]);
        },
      
      error  => {
        console.log("Erro: ", error);
        this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
      }
    );
  
//*************************************************************************//
    }
  
  

}