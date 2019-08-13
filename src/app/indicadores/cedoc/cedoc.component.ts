import { Component, OnInit, Input,} from '@angular/core';
import { Indicadores, Supervisoes } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService, SelectItem } from 'primeng/api';
import { API_BLOCK } from '../../app.api';


@Component({
  selector: 'app-cedoc',
  templateUrl: './cedoc.component.html',
  providers: [MessageService]
})
export class CedocComponent implements OnInit { 

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
  acao: string;
  analise: string;
  usuario: string;
  checkAdmin: number = 0;
  disabled: boolean = true;
  permissao: string;

  items: SelectItem[];
  item: Supervisoes;
  caracteresComent: number = 0  
  caracteresAcao: number = 0 


  constructor(private IndicadoresService: IndicadoresService,
              private messageService: MessageService) {
    //**************************Carga das supervisoes para o filtro******************************************//
    this.items = []
      
    this.IndicadoresService.supervisoes()
      .subscribe(
        Supervisoes  => {
          Supervisoes => this.indicadores = Supervisoes.data
            this.items = Object.assign([], Supervisoes)
        },
        error  => {
          console.log("Erro: ", error);
          this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
        }
      );
    //********************************************************************************************************** */
    }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('nome')
    this.permissao = sessionStorage.getItem('permissao1')
    if(this.permissao === 'ROLE_ADMIN'){
      this.disabled = !this.disabled;
      this.checkAdmin = 1;
    }
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

  enviar(dentroprazo, foraprazo, foraprazo2018, dentroprazo2018, indicador, coment){    

    this.indicador = "Cedoc - "+ indicador
    console.log('indicador é: '+ indicador)
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
        this.orcado = dentroprazo.valueOf() 
        this.realizado = foraprazo.valueOf()
        this.pdd = foraprazo2018.valueOf()         
        this.atendente = 0
        this.atendimento = 0
        this.coment = coment
        this.forecast = dentroprazo2018.valueOf()           

    //Enviando dados para o Backend
    this.IndicadoresService.indicadoresByDay(this.id, this.orcado, this.realizado, this.pdd, this.atendente,
       this.atendimento, this.coment, this.forecast, sessionStorage.getItem('nome'), this.acao, this.analise)
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


 pesquisar(date6: Date, indicador: string){ 
  if(this.item['supervisao'] ==="undefined"){
    //Desenvolver retirada de erro ao selecionar a data sem selecionar o setor, dessa forma não funcionou
  }else{
    this.indicador = "Cedoc - "+ indicador
    console.log('indicador é: '+ indicador)
    this.filtro = date6.toISOString().substr(0,10)

    //********************************************************************//
    this.IndicadoresService.indicadores(this.filtro, this.indicador)
      .subscribe(
        indicadores  => {
          indicadores => this.indicadores = indicadores[0].data
          this.tempo = indicadores[0].tempo
          this.orcado = indicadores[0].orcado 
          this.realizado = indicadores[0].reali 
          this.pdd = indicadores[0].pecld 
          this.coment = indicadores[0].comentario
          this.forecast = indicadores[0].forecast 
          this.acao = indicadores[0].acao
          this.analise = indicadores[0].analise
          //console.log("requisicao bem sucedida!", indicadores[0]);
        },
        error  => {
          console.log("Erro: ", error);
          this.messageService.add({severity:'error', summary: "Falha na Consulta!", detail:error.message, life: 5000});
        }
      );
  }
//*************************************************************************//
}
  

}
