import { Component, OnInit, Input } from '@angular/core';
import { Indicadores } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-recdir',
  templateUrl: './recdir.component.html',
  providers: [MessageService]
})
export class RecdirComponent implements OnInit{

  permissao: string;

  brands: string[] = ['1','2','3','4','5','6','7','8','9','10', '11','12','13',
    '14','15','16','17','18','19','20','21'];
  filteredBrands: any[];
  @Input() brand: string;
  log: string[]= [];

  indicador: string;
 
  @Input() indicadores : Indicadores
  
  angular: any;
  filtro: string;
  referencia: string;
  response: any;
  erro: any;
  hoje: Date;
  dataInicio: Date;

  id : any;
  tempo: any;
  orcado: Number;
  realizado: Number;
  pdd: Number;
  atendente : Number;
  atendimento : Number;
  coment: string;
  forecast: Number;
  acao: string;
  analise: string;
  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  caracteresComent: number = 0  
  caracteresAcao: number = 0  



  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService
    ) {}

  ngOnInit() {
    this.usuario = sessionStorage.getItem('nome')
    this.permissao = sessionStorage.getItem('permissao1')
    if(this.permissao === 'ROLE_ADMIN'){
      this.disabled = !this.disabled;
      this.checkAdmin = 1;
    }
    let today = new Date();
    this.dataInicio = new Date(today.getTime() + (-1 * 24 * 60 * 60 * 1000));
    let dataajustada= new Date(this.dataInicio.getFullYear() +"-"+ (this.dataInicio.getMonth() +1)  +"- 01");
    this.referencia = dataajustada.toISOString().substr(0,10)
    this.indicador = "Receita Direta - Ciclo"
    
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



filterBrands(event) {
    this.filteredBrands = [];
    for(let i = 0; i < this.brands.length; i++) {
        let brand = this.brands[i];
        if(brand.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
            this.filteredBrands.push(brand);
        }
    }
}

//**************************************************************//


enviar(orc, real, com, fcst){
  
  

  //Pesquisa para captura do id e dos dados do formulário
    console.log("Enviando Dados!")
  this.IndicadoresService.indicadoresCiclo(this.filtro, this.indicador, this.referencia)
  .subscribe(
    indicadores  => {
      this.id = indicadores[0].id
      this.orcado = orc.valueOf() //desnecessario caso queira passar sem parametro
      this.realizado = real.valueOf()
      this.pdd = 0
      this.atendente = 0
      this.atendimento = 0
      this.coment = com
      this.forecast = fcst.valueOf()
      if(this.checkAdmin == 1){
        this.usuario = indicadores[0].colaborador
      }


  //Enviando dados para o Backend
  this.IndicadoresService.indicadoresByDay(this.id, this.orcado, this.realizado, this.pdd, this.atendente, this.atendimento,
     this.coment, this.forecast, this.usuario, this.acao, this.analise)
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
  let dataajustada= new Date(this.dataInicio.getFullYear() +"-"+ (this.dataInicio.getMonth() +1)  +"- 01");
    this.referencia = dataajustada.toISOString().substr(0,10)

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
    this.forecast = indicadores[0].forecast
    this.acao= indicadores[0].acao
    this.analise = indicadores[0].analise
    },
    
    error  => {
    this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
    console.log("Erro: ", error);
    }
  );

//*************************************************************************//
  }

}
