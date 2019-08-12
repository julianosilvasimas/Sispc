import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-volumes',
  templateUrl: './volumes.component.html',
  styles: []
})
export class VolumesComponent implements OnInit {

  indicador1: string;
  indicador2: string;

  date6: Date;
  @Input() indicadores : Indicadores
  
  angular: any;
  filtro: string;
  response: any;
  erro: any;
  hoje: Date;

  id : any;
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


  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {}

  ngOnInit() {
    let today = new Date();
    let dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(dataInicio.getFullYear() +"-"+ (dataInicio.getMonth() + 1)  +"-"+ dataInicio.getDate());
    this.date6 = dataajustada;

    this.indicador1 = "Volume Produzido"
    this.indicador2 = "Vazao ETA"
    this.pesquisar(this.date6);
  }

  
//**************************************************************//


enviar(orcvolume, orcvazao, realivolume, realivazao, comentvolume, comentvazao, forevolume, forevazao){
  /*
  this.hoje = new Date();
  if (this.hoje.valueOf() - this.date6.valueOf() > parseFloat(`${API_BLOCK}`)){
      this.messageService.add({severity:'warn', summary: 'Alerta!', detail:'Não é possível edição anterior a 3 dias!!!', life: 5000});
  }else{
*/
  //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  this.IndicadoresService.indicadores(this.filtro, this.indicador1)
  .subscribe(
    indicadores  => {
      this.id = indicadores[0].id
      this.orcvolume = orcvolume.valueOf()
      this.realivolume = realivolume.valueOf()
      this.pdd = indicadores[0].pecld
      this.atendente = 0
      this.atendimento = 0
      this.comentvolume = comentvolume
      this.forecastvolume = forevolume.valueOf()

  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.id, this.orcvolume, this.realivolume, this.pdd, this.atendente, 
    this.atendimento, this.comentvolume, this.forecastvolume, sessionStorage.getItem('nome'), this.acaovolume, this.analisevolume)
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
    })
    
    //*****************************************************************//
    //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  this.IndicadoresService.indicadores(this.filtro, this.indicador2)
  .subscribe(
    indicadores  => {
      this.id = indicadores[0].id
      this.orcvazao = orcvazao.valueOf()
      this.realivazao = realivazao.valueOf()
      this.pdd = indicadores[0].pecld
      this.atendente = 0
      this.atendimento = 0
      this.comentvazao = comentvazao
      this.forecastvazao =  forevazao.valueOf()

  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.id, this.orcvazao, this.realivazao, this.pdd, this.atendente, 
    this.atendimento, this.comentvazao, this.forecastvazao, sessionStorage.getItem('nome'), this.acaovazao, this.analisevazao)
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
    })
  //*****************************************************************//
  //}   <- se colocar o if de bloqueio de data
  }

//*****************************************************************//


pesquisar(date6){
  console.log('o que está acontecendo??')

this.filtro = date6.toISOString().substr(0,10)

//********************************************************************//
this.IndicadoresService.indicadores(this.filtro, this.indicador1)
.subscribe(
  indicadores  => {
    indicadores => this.indicadores = indicadores[0].data
    this.tempo1 = indicadores[0].tempo
    this.orcvolume = indicadores[0].orcado
    this.realivolume = indicadores[0].reali
    this.comentvolume = indicadores[0].comentario
    this.forecastvolume = indicadores[0].forecast
    console.log("requisicao bem sucedida!", indicadores[0]);
    },
    
    error  => {
    console.log("Erro: ", error);
    this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
    }
  );

//*************************************************************************//
this.IndicadoresService.indicadores(this.filtro, this.indicador2)
.subscribe(
  indicadores  => {
    indicadores => this.indicadores = indicadores[0].data
    this.tempo2 = indicadores[0].tempo
    this.orcvazao = indicadores[0].orcado
    this.realivazao = indicadores[0].reali
    this.comentvazao = indicadores[0].comentario
    this.forecastvazao = indicadores[0].forecast
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
