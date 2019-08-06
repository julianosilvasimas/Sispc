import { Component, OnInit, Input} from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-fiscassert',
  templateUrl: './fiscassert.component.html',
  providers: [MessageService]
})
export class FiscassertComponent implements OnInit {

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

  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {}

  ngOnInit() {
      
    let today = new Date();
    let dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(dataInicio.getFullYear() +"-"+ (dataInicio.getMonth() + 1)  +"-"+ dataInicio.getDate());
    this.date6 = dataajustada;

    this.indicador = "Fisc Assertividade"
    this.pesquisar(this.date6);
  }

//**************************************************************//


  enviar(orc, real, com){
    
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
        this.orcado = orc.valueOf()/100
        this.realizado = real.valueOf()/100
        this.pdd = indicadores[0].pecld
        this.atendente = 0
        this.atendimento = 0
        this.coment = com
        this.forecast = indicadores[0].forecast

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcado, this.realizado, this.pdd, this.atendente, this.atendimento, this.coment, this.forecast, sessionStorage.getItem('nome'))
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
      this.coment = indicadores[0].comentario
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
