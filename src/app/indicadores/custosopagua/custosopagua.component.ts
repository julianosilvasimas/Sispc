import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from '../indicadores.model';
import { MessageService, SelectItem } from 'primeng/api';
import { IndicadoresService } from './../indicadores.service';


@Component({
  selector: 'app-custosopagua',
  templateUrl: './custosopagua.component.html',
  styleUrls: ['./custosopagua.component.css'],
  providers: [MessageService]
})
export class CustosopaguaComponent implements OnInit {

  indicadore: string[];
  precoPQ: string[];
  indicador: string;
  

  id: number;
  pac: number;
  fluor: number;
  cal: number;
  cloro: number;
  polimero: number;
  sal: number;
  orcado:number;
  meta:number;
  realizado: number;
  Kg: number;

  tempo : Date;
  orc : number;
  reali : number;
  coment : string;
  forecast : number;

  aData: Date;
  date6: Date;
   
  items: SelectItem[];
  item: String;


  @Input() indicadores : Indicadores

  constructor(
              private IndicadoresService: IndicadoresService,
              private messageService: MessageService
  ) { 
    this.items = [
      {label: 'Água Tratada', value: ''},
      {label: 'Água Bruta', value: 'Bruta'}
    ];
  }

  ngOnInit() {
      
    this.indicadore = ["Preços","Pac(Sulfato)", "Fluor", "Cal", "Cloro", "Polimero",
     "Turbidez", "Cor", "pH", "Cloro Ind", "Fluor Ind","Metas"];
    this.precoPQ = ["Pac(Sulfato)", "Fluor", "Cal", "Cloro", "Polimero","Sal"];
    
    let today = new Date();
    let dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(dataInicio.getFullYear() +"-"+ (dataInicio.getMonth() + 1)  +"-"+ dataInicio.getDate());
    this.date6 = dataajustada;

    this.aData = dataajustada;
 
//**************************Carga dos Preços na inicialização do painel******************************************//
    this.IndicadoresService.precos()
      .subscribe(
        precos  => {
        precos => this.indicadores = precos.data
      
        this.pac = precos[0].preco
        this.fluor = precos[1].preco
        this.cal = precos[2].preco
        this.cloro = precos[3].preco
        this.polimero = precos[4].preco
        this.sal = precos[5].preco
      
        console.log("requisicao bem sucedida!", precos);
      },
      
      error  => {
        console.log("Erro: ", error);
        this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
      }
    );
  
//**************************************************************************************************************//
  }  // Aqui termina o On Init

  gravarData(date6){
      this.aData = date6;
      this.pesquisar(this.aData, (this.indicador+" "+this.item).trim());
  }
 
  // Função para calcular custo do produto químico
  onKey(event: any, variante) { 
    var virg = /,/gi;
    var quilo = / Kg/gi;
    var valor =  event.target.value.replace(virg, ".");
    var valorFinal = +valor.replace(quilo, "");
    var valorPQ;
    
    switch(variante) { 
      case "Pac(Sulfato)": { 
         valorPQ = this.pac;
         break; 
      }
      case "Fluor": { 
        valorPQ = this.fluor;
        break; 
     }
     case "Cal": { 
      valorPQ = this.cal;
      break; 
     }
     case "Cloro": { 
      valorPQ = this.cloro;
      break; 
     }
     case "Polimero": { 
      valorPQ = this.polimero;
      break; 
     }
     case "Sal": { 
      valorPQ = this.sal;
      break; 
     }
    }

    this.reali =  valorFinal * valorPQ;
  }
//*********************************************************************************************************************************************//
//****************************************Métodos para Atualização da tabela Preco*************************************************************//
//*********************************************************************************************************************************************//  
  escreverPreco(id, item, preco){
    this.IndicadoresService.precosUpdate(id , item , preco)
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

  enviarPreco(pac, fluor, cal, cloro, polimero, sal){
    var i = 1;

    for (var n in this.precoPQ){
      
      switch(i) { 
        case 1: { 
           this.escreverPreco(1, "produto", pac.valueOf());
           break; 
        } 
        case 2: { 
          this.escreverPreco(2, "produto", fluor.valueOf());
           break; 
        }
        case 3: { 
          this.escreverPreco(3, "produto", cal.valueOf());
          break; 
        }
        case 4: { 
          this.escreverPreco(4, "produto", cloro.valueOf());
          break; 
        } 
        case 5: { 
          this.escreverPreco(5, "produto", polimero.valueOf());
          break; 
        }
        case 6: { 
          this.escreverPreco(6, "produto", sal.valueOf());
          break; 
        } 
     } 
      i++; 
    };
    
 }

//*********************************************************************************************************************************************//
//****************************************Métodos para Pesquisa dos dados de Produtos Químicos*************************************************//
//*********************************************************************************************************************************************//

 pesquisar(date, ind){

   var filtro = date.toISOString().substr(0,10)

  //********************************************************************//
  this.IndicadoresService.indicadores(filtro, ind)
  .subscribe(
    indicadores  => {
      indicadores => this.indicadores = indicadores[0].data
      this.id = indicadores[0].id
      this.tempo = indicadores[0].tempo
      this.orc = indicadores[0].orcado
      this.reali = indicadores[0].reali
      this.Kg = indicadores[0].pecld
      this.coment = indicadores[0].comentario
      this.forecast = indicadores[0].forecast
      console.log("requisicao bem sucedida!", indicadores[0]);
      },
      
      error  => {
      console.log("Erro: ", error);
      this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
      }
    );

  }

  
  //Método "Vigia" Alteração da aba
  handleChange(e) {
    this.item = '';
    this.indicador = this.indicadore[e.index];
    
    this.pesquisar(this.aData, (this.indicador+" "+this.item).trim());
}

  combo(e){
    var indTemp = '';
    indTemp = (this.indicador +" "+ this.item).trim();
    this.pesquisar(this.aData,indTemp)

    return indTemp;
  }

//*********************************************************************************************************************************************//
//****************************************Métodos para Gravar os dados no banco****************************************************************//
//*********************************************************************************************************************************************//

  gravarDados(orc, forecast, reali, coment){
    this.IndicadoresService.indicadoresByDay(this.id, orc, reali, this.Kg, 0, 0, coment, forecast)
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
