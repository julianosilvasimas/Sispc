import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-percentprazo',
  templateUrl: './percentprazo.component.html',
  styleUrls: ['./percentprazo.component.css'],
  providers: [MessageService]
})
export class PercentprazoComponent implements OnInit, OnChanges {

  indicador: string;
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
  tempo: any;
  orcado: Number;
  realizado: Number;
  pdd: Number;
  atendente : Number;
  atendimento : Number;
  coment: string;
  forecast: Number;

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

      this.indicador = "Prazo Servicos"
  }


  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes)
  }



//**************************************************************//


  enviar(dentropend, dentroexec, fora, meta, coment){
    
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
        this.orcado = meta.valueOf()/100             //meta 
        this.realizado = dentroexec.valueOf()/100    //dentro executado
        this.pdd = dentropend.valueOf()/100          //dentro pendente
        this.atendente = 0
        this.atendimento = 0
        this.coment = coment
        this.forecast = fora.valueOf()/100          //fora pendente

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcado, this.realizado, this.pdd, this.atendente, this.atendimento, this.coment, this.forecast)
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

  //********************************************************************//
  this.IndicadoresService.indicadores(this.filtro, this.indicador)
  .subscribe(
    indicadores  => {
      indicadores => this.indicadores = indicadores[0].data
      this.tempo = indicadores[0].tempo
      this.orcado = indicadores[0].orcado * 100
      this.realizado = indicadores[0].reali * 100
      this.pdd = indicadores[0].pecld * 100
      this.coment = indicadores[0].comentario
      this.forecast = indicadores[0].forecast * 100
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
