import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from '../indicadores.model';
import { IndicadoresService } from '../indicadores.service';
import { MessageService, SelectItem } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-prazos',
  templateUrl: './prazos.component.html',
  providers: [MessageService]
})
export class PrazosComponent implements OnInit {

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
  orcado: number;
  realizado: number;
  pdd: number;
  atendente : Number;
  atendimento : Number;
  coment: string;
  forecast: number;
  acao: string;
  analise: string;
  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  permissao: string;

  items: SelectItem[];
  item: string;
  checkItem: boolean = true;
  caracteresComent: number = 0  
  caracteresAcao: number = 0 

  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {
      this.items = [
        {label: 'Percentual', value: 'perc'},
        {label: 'Quantidade', value: 'qtd'},
      ];
      this.item = 'perc'
      
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


  enviar(){
    
    this.hoje = new Date();
    if (this.hoje.valueOf() - this.date6.valueOf() > parseFloat(`${API_BLOCK}`)){
        this.messageService.add({severity:'warn', summary: 'Alerta!', detail:'Não é possível edição anterior a 2 dias!!!', life: 5000});
    }else{

        if(this.item==='perc'){
         //Enviando dados para o Backend
          this.IndicadoresService.indicadoresByDay(this.id, this.orcado/100 , this.realizado/100 , this.pdd/100, this.atendente, 
            this.atendimento, this.coment, this.forecast/100,   this.usuario, this.acao, this.analise)
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
        }else{
          //Enviando dados para o Backend
          this.IndicadoresService.indicadoresByDay(this.id, this.orcado , this.realizado , this.pdd, this.atendente, 
            this.atendimento, this.coment, this.forecast,  this.usuario, this.acao, this.analise)
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
        }

      }
    }

 //*****************************************************************//


  pesquisar(date6){

    this.filtro = date6.toISOString().substr(0,10)
    if (this.item==='perc'){
      this.checkItem = true;
      this.indicador = "Prazo Servicos"
      //********************************************************************//
      this.IndicadoresService.indicadores(this.filtro, this.indicador)
      .subscribe(
        indicadores  => {
          indicadores => this.indicadores = indicadores[0].data
          this.id = indicadores[0].id
          this.tempo = indicadores[0].tempo
          this.orcado = indicadores[0].orcado * 100
          this.realizado = indicadores[0].reali * 100
          this.pdd = indicadores[0].pecld * 100
          this.coment = indicadores[0].comentario
          this.forecast = indicadores[0].forecast * 100
          this.acao = indicadores[0].acao
          this.analise = indicadores[0].analise
          if(this.checkAdmin == 1){
            this.usuario = indicadores[0].colaborador
          }
          console.log("requisicao bem sucedida!", indicadores[0]);
          },
          
          error  => {
          console.log("Erro: ", error);
          this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
          }
        );
      //*************************************************************************//
    }else{
      this.checkItem = false;
      this.indicador = "Prazo Servicos Qtd"
      //********************************************************************//
      this.IndicadoresService.indicadores(this.filtro, this.indicador)
      .subscribe(
        indicadores  => {
          indicadores => this.indicadores = indicadores[0].data
          this.id = indicadores[0].id
          this.tempo = indicadores[0].tempo
          this.orcado = indicadores[0].orcado
          this.realizado = indicadores[0].reali
          this.pdd = indicadores[0].pecld
          this.coment = indicadores[0].comentario
          this.forecast = indicadores[0].forecast
          this.acao = indicadores[0].acao
          this.analise = indicadores[0].analise
          if(this.checkAdmin == 1){
            this.usuario = indicadores[0].colaborador
          }
          console.log("requisicao bem sucedida!", indicadores[0]);
          },
          
          error  => {
          console.log("Erro: ", error);
          this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
          }
        );
      //*************************************************************************//
    }
  }
    
  

}
