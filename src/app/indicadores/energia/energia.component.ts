import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from '../indicadores.model';
import { IndicadoresService } from '../indicadores.service';
import { MessageService, SelectItem } from 'primeng/api';
import { API_BLOCK } from '../../app.api';

@Component({
  selector: 'app-energia',
  templateUrl: './energia.component.html',
  styles: []
})
export class EnergiaComponent implements OnInit {

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
  orcconsumo: Number;
  orccusto: Number;
  realiconsumo: Number;
  realicusto: Number;
  pdd: Number;
  atendente : Number;
  atendimento : Number;
  comentconsumo: string;
  comentcusto: string;
  forecastconsumo: Number;
  forecastcusto: Number;
  acaoconsumo: string;
  analiseconsumo: string;
  acaocusto: string;
  analisecusto: string;

  items1: SelectItem[];
  item1: string

  items: SelectItem[];
  item: string;

  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  disabledreal: boolean = true;
  permissao: string;
  caracteresComent: number = 0  
  caracteresAcao: number = 0 
  caracteresComentCusto: number = 0  
  caracteresAcaoCusto: number = 0 

  constructor(
    private IndicadoresService: IndicadoresService,
    private messageService: MessageService
  ) {
    this.usuario = sessionStorage.getItem('nome')
    this.permissao = sessionStorage.getItem('permissao1')
    if(this.permissao === 'ROLE_INDICADOR_OPERACIONAL_AGUA'){
      this.items1 = [
        {label: 'Total Água', value: 'Agua'}
      ];
     this.item1 = 'Agua'
  
      this.items = [
          {label: 'ETA', value: 'Agua'}
        ];
        this.item = 'Agua'
    }else if(this.permissao === 'ROLE_INDICADOR_OPERACIONAL_ESGOTO'){
      this.items1 = [
        {label: 'Total Esgoto', value: 'Esgoto'},
        {label: 'Energia por ETE', value: 'ETES'}
      ];
     this.item1 = 'Esgoto'
  
      this.items = [
          {label: 'ETES', value: 'Esgoto'}
        ];
        this.item = 'Esgoto'
    }else{
      this.items1 = [
            {label: 'Total Água', value: 'Agua'},
            {label: 'Total Esgoto', value: 'Esgoto'},
            {label: 'Energia por ETE', value: 'ETES'}
          ];

          this.item1 = 'Agua'

          this.items = [
              {label: 'ETA', value: 'Agua'}
            ];
            this.item = 'Agua'
          }
    }

    onKeyComent(event: any) {
      if(event.key != 'Backspace'){
        this.caracteresComent = this.comentconsumo.length+1
      }
    }
  
    onKeyAcao(event: any) {
      if(event.key != 'Backspace'){
        this.caracteresAcao = this.acaoconsumo.length+1
      }
    }

    onKeyComentCusto(event: any) {
      if(event.key != 'Backspace'){
        this.caracteresComent = this.comentconsumo.length+1
      }
    }
  
    onKeyAcaoCusto(event: any) {
      if(event.key != 'Backspace'){
        this.caracteresAcao = this.acaoconsumo.length+1
      }
    }
//ROLE_INDICADOR_OPERACIONAL_ENERGIA
  ngOnInit() {
    this.usuario = sessionStorage.getItem('nome')
    this.permissao = sessionStorage.getItem('permissao1')
    if(this.permissao === 'ROLE_ADMIN'){
      this.disabled = !this.disabled;
      this.disabledreal = !this.disabledreal;
      this.checkAdmin = 1;
    }else if(this.permissao === 'ROLE_INDICADOR_OPERACIONAL_ENERGIA'){
      this.disabledreal = !this.disabledreal;
    }

    let today = new Date();
    let dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(dataInicio.getFullYear() +"-"+ (dataInicio.getMonth() + 1)  +"-"+ dataInicio.getDate());
    this.date6 = dataajustada;

    this.indicador1 = "Energia kW "
    this.indicador2 = "Energia Val "
    this.pesquisar(this.date6);
  }

  alteraIndicador(ind){
    
    this.item1 = ind

    if(this.item1 === 'Agua'){
      this.items = [
        {label: 'ETA', value: 'Agua'}
      ];
      this.item = 'Agua'
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
    }

    this.pesquisar(this.date6);
  }

  
//**************************************************************//


enviar(orcconsumo, orccusto, realiconsumo, realicusto, comentconsumo, comentcusto, foreconsumo, forecusto){
  /*
  this.hoje = new Date();
  if (this.hoje.valueOf() - this.date6.valueOf() > parseFloat(`${API_BLOCK}`)){
      this.messageService.add({severity:'warn', summary: 'Alerta!', detail:'Não é possível edição anterior a 3 dias!!!', life: 5000});
  }else{
*/
  //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  this.IndicadoresService.indicadores(this.filtro, this.indicador1+this.item)
  .subscribe(
    indicadores  => {
      this.id = indicadores[0].id
      this.orcconsumo = orcconsumo.valueOf()
      this.realiconsumo = realiconsumo.valueOf()
      this.pdd = indicadores[0].pecld
      this.atendente = 0
      this.atendimento = 0
      this.comentconsumo = comentconsumo
      this.forecastconsumo = foreconsumo.valueOf()

  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.id, this.orcconsumo, this.realiconsumo, this.pdd, this.atendente, 
    this.atendimento, this.comentconsumo, this.forecastconsumo, sessionStorage.getItem('nome'), this.acaoconsumo, this.analiseconsumo)
  .subscribe(
      response => {
        if(response === null){
          console.log("OK!!!!!!")
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados de consumo!!!', life: 5000});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados de consumo não Enviados!", detail:error.message, life: 5000});
        console.log(error)
  }
      );
    })
    
    //*****************************************************************//
    //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  this.IndicadoresService.indicadores(this.filtro, this.indicador2+this.item)
  .subscribe(
    indicadores  => {
      this.id = indicadores[0].id
      this.orccusto = orccusto.valueOf()
      this.realicusto = realicusto.valueOf()
      this.pdd = indicadores[0].pecld
      this.atendente = 0
      this.atendimento = 0
      this.comentcusto = comentcusto
      this.forecastcusto =  forecusto.valueOf()

  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.id, this.orccusto, this.realicusto, this.pdd, this.atendente, 
    this.atendimento, this.comentcusto, this.forecastcusto, sessionStorage.getItem('nome'), this.acaocusto, this.analisecusto)
  .subscribe(
      response => {
        if(response === null){
          console.log("OK!!!!!!")
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados de custo!!!', life: 5000});
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados de custo não Enviados!", detail:error.message, life: 5000});
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
this.IndicadoresService.indicadores(this.filtro, this.indicador1+this.item)
.subscribe(
  indicadores  => {
    indicadores => this.indicadores = indicadores[0].data
    this.tempo1 = indicadores[0].tempo
    this.orcconsumo = indicadores[0].orcado
    this.realiconsumo = indicadores[0].reali
    this.comentconsumo = indicadores[0].comentario
    this.forecastconsumo = indicadores[0].forecast
    console.log("requisicao bem sucedida!", indicadores[0]);
    },
    
    error  => {
    console.log("Erro: ", error);
    this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
    }
  );

//*************************************************************************//
this.IndicadoresService.indicadores(this.filtro, this.indicador2+this.item)
.subscribe(
  indicadores  => {
    indicadores => this.indicadores = indicadores[0].data
    this.tempo2 = indicadores[0].tempo
    this.orccusto = indicadores[0].orcado
    this.realicusto = indicadores[0].reali
    this.comentcusto = indicadores[0].comentario
    this.forecastcusto = indicadores[0].forecast
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
