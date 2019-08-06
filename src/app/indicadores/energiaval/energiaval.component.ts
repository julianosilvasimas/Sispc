import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-energiaval',
  templateUrl: './energiaval.component.html',
  providers: [MessageService]
})
export class EnergiavalComponent implements OnInit {

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
  orcagua: Number;
  orcesgoto: Number;
  realiagua: Number;
  realiesgoto: Number;
  pdd: Number;
  atendente : Number;
  atendimento : Number;
  comentagua: string;
  comentesgoto: string;
  forecastagua: Number;
  forecastesgoto: Number;


  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {}

  ngOnInit() {
      
    let today = new Date();
    let dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(dataInicio.getFullYear() +"-"+ (dataInicio.getMonth() + 1)  +"-"+ dataInicio.getDate());
    this.date6 = dataajustada;

    this.indicador1 = "Energia Val Agua"
    this.indicador2 = "Energia Val Esgoto"
    this.pesquisar(this.date6);
  }

//**************************************************************//


  enviar(orcagua, orcesgoto, realiagua, realiesgoto, comentagua, comentesgoto, foreagua, foreesgoto){
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
        this.orcagua = orcagua.valueOf()
        this.realiagua = realiagua.valueOf()
        this.pdd = indicadores[0].pecld
        this.atendente = 0
        this.atendimento = 0
        this.comentagua = comentagua
        this.forecastagua = foreagua.valueOf()

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcagua, this.realiagua, this.pdd, this.atendente, this.atendimento, this.comentagua, this.forecastagua, sessionStorage.getItem('nome'))
    .subscribe(
        response => {
          if(response === null){
            console.log("OK!!!!!!")
            this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados de água!!!', life: 5000});
          }
        },
        error =>  { 
          this.messageService.add({severity:'error', summary: "Dados de água não Enviados!", detail:error.message, life: 5000});
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
        this.orcesgoto = orcesgoto.valueOf()
        this.realiesgoto = realiesgoto.valueOf()
        this.pdd = indicadores[0].pecld
        this.atendente = 0
        this.atendimento = 0
        this.comentesgoto = comentesgoto
        this.forecastesgoto =  foreesgoto.valueOf()

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcesgoto, this.realiesgoto, this.pdd, this.atendente, this.atendimento, this.comentesgoto, this.forecastesgoto, sessionStorage.getItem('nome'))
    .subscribe(
        response => {
          if(response === null){
            console.log("OK!!!!!!")
            this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados de esgoto!!!', life: 5000});
          }
        },
        error =>  { 
          this.messageService.add({severity:'error', summary: "Dados de esgoto não Enviados!", detail:error.message, life: 5000});
          console.log(error)
    }
        );
      })
    //*****************************************************************//
    //}   <- se colocar o if de bloqueio de data
    }

 //*****************************************************************//


 pesquisar(date6){

  this.filtro = date6.toISOString().substr(0,10)

  //********************************************************************//
  this.IndicadoresService.indicadores(this.filtro, this.indicador1)
  .subscribe(
    indicadores  => {
      indicadores => this.indicadores = indicadores[0].data
      this.tempo1 = indicadores[0].tempo
      this.orcagua = indicadores[0].orcado
      this.realiagua = indicadores[0].reali
      this.comentagua = indicadores[0].comentario
      this.forecastagua = indicadores[0].forecast
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
      this.orcesgoto = indicadores[0].orcado
      this.realiesgoto = indicadores[0].reali
      this.comentesgoto = indicadores[0].comentario
      this.forecastesgoto = indicadores[0].forecast
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
