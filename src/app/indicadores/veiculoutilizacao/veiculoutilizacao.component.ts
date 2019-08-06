import { Component, OnInit, Input } from '@angular/core';
import { UtilizacaoVeiculos } from './../indicadores.model';
import { IndicadoresService } from './../indicadores.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-veiculoutilizacao',
  templateUrl: './veiculoutilizacao.component.html',
  providers: [MessageService]
})

export class VeiculoutilizacaoComponent implements OnInit {
  @Input() utilizacao : UtilizacaoVeiculos;

  km: Number; 
  placa: String;
  condutor: String;
  inicio: any;
  fim: any;
  date6: Date;
  

  constructor(private IndicadoresService: IndicadoresService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  //Função que formata o número antes de calcular
  formatar(varialvel){
    var virg = /,/gi;
    var km = / Km/gi;
    var valor =  varialvel.value.replace(virg, ".");
    var valorFinal = +valor.replace(km, "");
   
    return valorFinal
  }
  // evento que faz o cálculo da distância percorrida
  onKey(event: any, variante) { 
    this.km = this.formatar(event.target) - variante
    
  }

  //Função que insere os dados no banco
  enviar(placa: String, motorista: String, motor_ligado: Date, hodometro_inicial: Number, hodometro_final: Number, distancia_km: Number){

    this.IndicadoresService.InputVeiculosUtilizacao(placa, motorista, motor_ligado, hodometro_inicial, hodometro_final, distancia_km)
    .subscribe(
      response => {
        if(response.status === 201){
          this.messageService.add({severity:'success', summary: 'Sucesso!', detail:'Dados enviados corretamente!!!', life: 5000});
          this.placa = '';
          this.condutor = '';
          this.inicio = '';
          this.fim = '';
          this.km = 0;
        }
      },
      error =>  { 
        this.messageService.add({severity:'error', summary: "Dados não Enviados!", detail:error.message, life: 5000});
        console.log(error)
      }
    );

  }

}
