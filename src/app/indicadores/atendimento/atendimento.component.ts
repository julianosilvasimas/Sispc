import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from '../indicadores.model';
import { IndicadoresService } from '../indicadores.service';
import { MessageService, SelectItem } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  providers: [MessageService]
})
export class AtendimentoComponent implements OnInit{
 
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
  orcado: any;
  realizado: any;
  pdd: number;
  atendente : number;
  atendimento : number;
  coment: string;
  forecast: Number;
  convertido: any;
  acao: string;
  analise: string;
  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  permissao: string;

  items: SelectItem[];
  item: string;
  caracteresComent: number = 0  
  caracteresAcao: number = 0  

  hora: number;
  minutos: any;
  minuto: number;
  segundo: number;
  hms: string;

  recebido: any;
  envio: any;


  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {
      this.items = [
        {label: 'TMA Atendimento', value: 'TMA Atendimento'},
        {label: 'TME Atendimento', value: 'TME Atendimento'},
        {label: 'TMA Call Center', value: 'TMA Call Center'},
        {label: 'TME Call Center', value: 'TME Call Center'}
      ];
      this.item = 'TMA Atendimento'
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

  // recebe formato hora e converte em segundos
  horaSeg(hora: String){
    this.hora = parseInt(hora.substring(0,3)) * 3600
    this.minuto = parseInt(hora.substring(3,6)) * 60
    this.segundo = parseInt(hora.substring(6,9))
    this.convertido = this.hora.valueOf()  + this.minuto.valueOf() + this.segundo.valueOf()
  }

  // recebe segundos e converte formato hora
  segHora(seg){
    this.segundo = parseInt(seg) % 60;
    this.segundo = parseInt(this.segundo.toString())
    this.minutos = parseInt(seg) / 60;
    this.minuto = this.minutos % 60;
    this.minuto = parseInt(this.minuto.toString())
    this.hora = this.minutos / 60;
    this.hora = parseInt(this.hora.toString())
    var reserv = new Date(0,0,0,this.hora,this.minuto,this.segundo)
    this.hms = reserv.toTimeString().substring(0,8);
    console.log("Aqui agora: ", this.hms); // deve mostrar "01:16:07"
  }

//**************************************************************//


  enviar(orc, real, com, atd, atm){
   
    this.hoje = new Date();
    if (this.hoje.valueOf() - this.date6.valueOf() > parseFloat(`${API_BLOCK}`)){
        this.messageService.add({severity:'warn', summary: 'Alerta!', detail:'Não é possível edição anterior a 2 dias!!!', life: 5000});
    }else{

    //Pesquisa para captura do id e dos dados do formulário
      console.log("Enviando Dados!")
    this.IndicadoresService.indicadores(this.filtro, this.indicador)
    .subscribe(
      indicadores  => {
        this.id = indicadores[0].id
        this.horaSeg(orc)
        this.orcado = this.convertido
        this.horaSeg(real)
        this.realizado = this.convertido
        this.pdd = 0
        this.atendente = atd.valueOf()
        this.atendimento = atm.valueOf()
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

  //********************************************************************//
  this.IndicadoresService.indicadores(this.filtro, this.indicador)
  .subscribe(
    indicadores  => {
      indicadores => this.indicadores = indicadores[0].data
      this.tempo = indicadores[0].tempo
      this.segHora(indicadores[0].orcado)
      this.orcado = this.hms
      this.segHora(indicadores[0].reali)
      this.realizado = this.hms
      this.atendente = indicadores[0].atendente
      this.atendimento = indicadores[0].atendimento
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

