import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-recdir',
  templateUrl: './recdir.component.html',
  styleUrls: ['./recdir.component.css'],
  providers: [MessageService]
})
export class RecdirComponent implements OnInit, OnChanges {

  brands: string[] = ['1','2','3','4','5','6','7','8','9','10', '11','12','13',
    '14','15','16','17','18','19','20','21'];
  filteredBrands: any[];
  @Input() brand: string;
  log: string[]= [];

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
  referencia: string;
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
      
     
        this.referencia = '2019-02-01'
      this.indicador = "Receita Direta - Ciclo"
  }



filterBrands(event) {
    this.filteredBrands = [];
    for(let i = 0; i < this.brands.length; i++) {
        let brand = this.brands[i];
        if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredBrands.push(brand);
        }
    }
}

ngOnChanges(changes: SimpleChanges) {
  // changes.prop contains the old and the new value...
  console.log(changes)
}



//**************************************************************//


enviar(orc, real, com){
  
  

  //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  this.IndicadoresService.indicadoresCiclo(this.filtro, this.indicador, this.referencia)
  .subscribe(
    indicadores  => {
      this.id = indicadores[0].id
      this.orcado = orc.valueOf()
      this.realizado = real.valueOf()
      this.pdd = 0
      this.atendente = 0
      this.atendimento = 0
      this.coment = com
      this.forecast = 0


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

//*****************************************************************//


pesquisar(brands){

this.filtro = brands
//********************************************************************//
this.IndicadoresService.indicadoresCiclo(brands, this.indicador, this.referencia)
.subscribe(
  indicadores  => {
    indicadores => this.indicadores = indicadores[0].data
    this.tempo = indicadores[0].tempo
    this.orcado = indicadores[0].orcado
    this.realizado = indicadores[0].reali
    this.coment = indicadores[0].comentario
    console.log("requisicao bem sucedida!", indicadores[0]);
    },
    
    error  => {
    this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
    console.log("Erro: ", error);
    }
  );

//*************************************************************************//
  }

}