import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-energia',
  templateUrl: './energia.component.html',
  styleUrls: ['./energia.component.css'],
  providers: [MessageService]
})
export class EnergiaComponent implements OnInit, OnChanges {

  indicador1: string;
  indicador2: string;

  date6: Date;
  dates: Date[];
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>
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
      let month = today.getMonth();
      let year = today.getFullYear();
      let prevMonth = (month === 0) ? 11 : month -1;
      let prevYear = (prevMonth === 11) ? year - 1 : year;
      let nextMonth = (month === 11) ? 0 : month + 1;
      let nextYear = (nextMonth === 0) ? year + 1 : year;
      this.minDate = new Date();
      this.minDate.setMonth(prevMonth);
      this.minDate.setFullYear(prevYear);
      this.maxDate = new Date();
      this.maxDate.setMonth(nextMonth);
      this.maxDate.setFullYear(nextYear);
      let invalidDate = new Date();
      invalidDate.setDate(today.getDate() - 1);
      this.invalidDates = [today,invalidDate];

      this.indicador1 = "Energia kW Agua"
      this.indicador2 = "Energia kW Esgoto"
  }


  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes)
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
        this.pdd = 0
        this.atendente = 0
        this.atendimento = 0
        this.comentagua = comentagua
        this.forecastagua = foreagua.valueOf()


    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcagua, this.realiagua, this.pdd, this.atendente, this.atendimento, this.comentagua, this.forecastagua)
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
        this.pdd = 0
        this.atendente = 0
        this.atendimento = 0
        this.comentesgoto = comentesgoto
        this.forecastesgoto =  foreesgoto.valueOf()

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcesgoto, this.realiesgoto, this.pdd, this.atendente, this.atendimento, this.comentesgoto, this.forecastesgoto)
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
