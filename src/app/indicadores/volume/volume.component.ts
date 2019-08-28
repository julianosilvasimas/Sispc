import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from '../indicadores.model';
import { IndicadoresService } from '../indicadores.service';
import { MessageService, SelectItem } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-volumeete',
  templateUrl: './volume.component.html',
  styles: []
})
export class VolumeComponent implements OnInit {

  indicador1: string;
  indicador2: string;
  indi: string;

  indicador: string;

  date6: Date;
  @Input() indicadores : Indicadores
  
  angular: any;
  filtro: string;
  response: any;
  erro: any;
  hoje: Date;

  idVolume : any;
  idVazao : any;
  tempo1: any;
  tempo2: any;
  orcvolume: Number;
  orcvazao: Number;
  realivolume: Number;
  realivazao: Number;
  pdd: Number;
  atendente : Number;
  atendimento : Number;
  comentvolume: string;
  comentvazao: string;
  forecastvolume: Number;
  forecastvazao: Number;
  acaovolume: string;
  analisevolume: string;
  acaovazao: string;
  analisevazao: string;

  items: SelectItem[];
  item: string;
  items1: SelectItem[];
  item1: string;

  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  disabledreal: boolean = false;
  permissao: string;

  caracteresComent: number = 0  
  caracteresAcao: number = 0 
  caracteresComentVazao: number = 0  
  caracteresAcaoVazao: number = 0 

  constructor(
    private IndicadoresService: IndicadoresService,
    private messageService: MessageService
  ) {
    this.usuario = sessionStorage.getItem('nome')
    this.permissao = sessionStorage.getItem('permissao1')
    if(this.permissao === 'ROLE_INDICADOR_OPERACIONAL_AGUA'  || this.permissao === 'ROLE_INDICADOR_OPERACIONAL_VOLUME'){
      this.items1 = [
        {label: 'Total Água', value: 'Produzido'}
      ];
     this.item1 = 'Produzido'
  
      this.items = [
          {label: 'ETA', value: 'ETA'}
        ];
        this.item = 'ETA'
    }else if(this.permissao === 'ROLE_INDICADOR_OPERACIONAL_ESGOTO'){
      this.items1 = [
        //{label: 'Total Esgoto', value: 'Esgoto'},
        {label: 'Volume por ETE', value: 'ETE CF'}
      ];
     this.item1 = 'ETE CF'
  
     this.items = [
      {label: 'ETE Cabo Frio', value: 'ETE CF'},
      {label: 'ETE Arraial', value: 'ETE ARRAIAL'},
      {label: 'ETE Búzios', value: 'ETE BZ'},
      {label: 'ETE Iguaba Grande', value: 'ETE IGB'},
      {label: 'ETE Jardim Esperança', value: 'ETE JARDIM'},
      {label: 'ETE Monte Alto', value: 'ETE MALTO'},
      {label: 'ETE São Pedro', value: 'ETE SPA'}
    ];
        this.item = 'ETE CF'
        this.disabledreal = !this.disabledreal;
    }else{
      this.items1 = [
            {label: 'Total Água', value: 'Produzido'},
            //{label: 'Total Esgoto', value: 'Esgoto'},
            {label: 'Volume por ETE', value: 'ETES'}
          ];

          this.item1 = 'Produzido'

          this.items = [
              {label: 'ETA', value: 'ETA'}
            ];
            this.item = 'ETA'
          }
   }

   onKeyComent(event: any) {
    if(event.key != 'Backspace'){
      this.caracteresComent = this.comentvolume.length+1
    }
  }

  onKeyAcao(event: any) {
    if(event.key != 'Backspace'){
      this.caracteresAcao = this.acaovolume.length+1
    }
  }

  onKeyComentVazao(event: any) {
    if(event.key != 'Backspace'){
      this.caracteresComentVazao = this.comentvazao.length+1
    }
  }

  onKeyAcaoVazao(event: any) {
    if(event.key != 'Backspace'){
      this.caracteresAcaoVazao = this.acaovazao.length+1
    }
  }
//this.disabledreal = !this.disabledreal;
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

    this.indicador1 = "Volume "
    this.indicador2 = "Vazao "
    this.pesquisar(this.date6);
  }

  alteraIndicador(ind){
    
    this.item1 = ind

    if(this.item1 === 'Produzido'){
      this.items = [
        {label: 'ETA', value: 'Produzido'}
      ];
      this.item = 'ETA'
      this.disabledreal = false;
    }else if (this.item1 === 'Esgoto'){
      this.items = [
        {label: 'ETES', value: 'Esgoto'}
      ];
      this.item = 'Esgoto'
    }else{ 
      this.items = [
        {label: 'ETE Cabo Frio', value: 'ETE CF'},
        {label: 'ETE Arraial', value: 'ETE ARRAIAL'},
        {label: 'ETE Búzios', value: 'ETE BZ'},
        {label: 'ETE Iguaba Grande', value: 'ETE IGB'},
        {label: 'ETE Jardim Esperança', value: 'ETE JARDIM'},
        {label: 'ETE Monte Alto', value: 'ETE MALTO'},
        {label: 'ETE São Pedro', value: 'ETE SPA'}
      ];
      this.item = 'ETE CF'
      this.disabledreal = !this.disabledreal;
    }

    this.pesquisar(this.date6);
  }

  
//**************************************************************//


enviar(){
  /*
  this.hoje = new Date();
  if (this.hoje.valueOf() - this.date6.valueOf() > parseFloat(`${API_BLOCK}`)){
      this.messageService.add({severity:'warn', summary: 'Alerta!', detail:'Não é possível edição anterior a 3 dias!!!', life: 5000});
  }else{
*/
  //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  

  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.idVolume, this.orcvolume, this.realivolume, this.pdd, this.atendente, this.atendimento, 
    this.comentvolume, this.forecastvolume, sessionStorage.getItem('nome'), this.acaovolume, this.analisevolume)
  .subscribe(
      response => {
        if(response === null){
          console.log("OK!!!!!!")
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados de volume!!!', life: 5000});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados de volume não Enviados!", detail:error.message, life: 5000});
        console.log(error)
  }
      );
    
    //*****************************************************************
    
    console.log("Enviando Dados!")


  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.idVazao, this.orcvazao, this.realivazao, this.pdd, this.atendente, 
    this.atendimento, this.comentvazao, this.forecastvazao, sessionStorage.getItem('nome'), this.acaovolume, this.analisevolume)
  .subscribe(
      response => {
        if(response === null){
          console.log("OK!!!!!!")
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados de vazao!!!', life: 5000});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados de vazao não Enviados!", detail:error.message, life: 5000});
        console.log(error)
  }
  );
  //*****************************************************************//
  //}   <- se colocar o if de bloqueio de data
  }

//*****************************************************************//


pesquisar(date6){
this.filtro = date6.toISOString().substr(0,10)
console.log(this.item1)
if(this.item1 === 'ETES'){
  this.indicador = this.indicador1+this.item;
  this.indi = this.indicador2+this.item1;
}else{
  this.indicador = this.indicador1+this.item1;
  this.indi = this.indicador2+this.item;
}


//********************************************************************//
this.IndicadoresService.indicadores(this.filtro, this.indicador)
.subscribe(
  indicadores  => {
    indicadores => this.indicadores = indicadores[0].data
    this.idVolume = indicadores[0].id
    this.tempo1 = indicadores[0].tempo
    this.orcvolume = indicadores[0].orcado
    this.realivolume = indicadores[0].reali
    this.pdd = indicadores[0].pecld
    this.atendente = indicadores[0].atendente
    this.atendimento = indicadores[0].atendimento
    this.comentvolume = indicadores[0].comentario
    this.forecastvolume = indicadores[0].forecast
    this.acaovolume = indicadores[0].acao
    this.analisevolume = indicadores[0].analise
    console.log("requisicao bem sucedida!", indicadores[0]);

    /*
    this.id = indicadores[0].id
      this.orcvazao = orcvazao.valueOf()
      this.realivazao = realivazao.valueOf()
      this.pdd = indicadores[0].pecld
      this.atendente = 0
      this.atendimento = 0
      this.comentvazao = comentvazao
      this.forecastvazao =  forevazao.valueOf()
    */
    },
    
    error  => {
    console.log("Erro: ", error);
    this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
    }
  );
//*************************************************************************//

    console.log(this.indi)
  if(this.item1 === 'Produzido'){
    this.IndicadoresService.indicadores(this.filtro, this.indi)
    .subscribe(
      indicadores  => {
        indicadores => this.indicadores = indicadores[0].data
        this.idVazao = indicadores[0].id
        this.tempo2 = indicadores[0].tempo
        this.orcvazao = indicadores[0].orcado
        this.realivazao = indicadores[0].reali
        this.pdd = indicadores[0].pecld
        this.atendente = indicadores[0].atendente
        this.atendimento = indicadores[0].atendimento
        this.comentvazao = indicadores[0].comentario
        this.forecastvazao = indicadores[0].forecast
        this.acaovazao = indicadores[0].acao
        this.analisevazao = indicadores[0].analise
        console.log("requisicao bem sucedida!", indicadores[0]);
        },
        
        error  => {
        console.log("Erro: ", error);
        this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
        }
      );
    }else{
      this.tempo2 = null
      this.orcvazao = null
      this.realivazao = null
      this.pdd = null
      this.atendente = null
      this.atendimento = null
      this.comentvazao = null
      this.forecastvazao = null
      this.acaovazao = null
      this.analisevazao = null
    }
//*************************************************************************//
  }

}
