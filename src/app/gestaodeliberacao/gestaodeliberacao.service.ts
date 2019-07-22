import{Injectable} from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

import{Delib, InputDelib, Process, Teste, Entrega} from './gestaodeliberacao.model';

import {API_CONFIG} from '../app.api'

@Injectable()
export class GestaoDeliberacaoService{
    constructor(private http: HttpClient){}
   
    //Pesquisar notificação
    notificacao(termo : string, stat: string): Observable<Delib[]>{
        return  this.http.get(`${API_CONFIG}/birregularidades/termo/${termo}/status/${stat}`) 
        .pipe(map((res : Delib[]) => res, catchError(ErrorHandler.handleError)))
     }

     idProcesso(idProcesso : string): Observable<Process[]>{
      return  this.http.get(`${API_CONFIG}/gestaodeliberacao/${idProcesso}`) 
      .pipe(map((res : Process[]) => res, catchError(ErrorHandler.handleError)))
   }

     processo(idIrreg : number): Observable<Process[]>{
        return  this.http.get(`${API_CONFIG}/gestaodeliberacao/irreg/${idIrreg}`) 
        .pipe(map((res : Process[]) => res, catchError(ErrorHandler.handleError)))
     }

     endentrega(matricula : number): Observable<Entrega[]>{
      return  this.http.get(`${API_CONFIG}/endentrega/${matricula}`) 
      .pipe(map((res : Entrega[]) => res, catchError(ErrorHandler.handleError)))
   }

     InputTeste(ask: string, bid: string, epoch: string, id: string, quote: string, symbol: string): Observable<any>{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      return this.http.post<Teste>(`${API_CONFIG}/zteste`,
      {ask: ask, bid: bid, epoch: epoch,id: id,quote: quote,symbol: symbol},
      { observe: 'response'})
      .pipe(
        map((response) => ({data: response.headers, 
                            status: response.status,
                            statusTexto: response.statusText,
                            })) 
      );
     }

     //Inputar os dados de Deliberação
     InputDeliberacao(idIrregularidade: number,	dataAviso1: Date,	dataAviso2: Date,	dataAviso3: Date,	mesRetroativo: number,
            titular: string,	usuarioPresente: string,	contrato: number,	num_ligacao: number,
            	carta: string,	cartaProcedente: string, ro: string, num_termo: string): Observable<any>{
          let headers = new HttpHeaders();
          headers = headers.set('Content-Type', 'application/json; charset=utf-8');
          headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
          return this.http.post<InputDelib>(`${API_CONFIG}/gestaodeliberacao`,
          {idIrregularidade: idIrregularidade,	dataAviso1: dataAviso1,	dataAviso2: dataAviso2,	dataAviso3: dataAviso3,	mesRetroativo: mesRetroativo,
            titular: titular,	usuarioPresente: usuarioPresente,	contrato: contrato,	num_ligacao: num_ligacao,
            	carta: carta,	cartaProcedente: cartaProcedente, ro: ro, num_termo: num_termo},
          { observe: 'response'})
          .pipe(
            map((response) => ({data: response.headers, 
                                status: response.status,
                                statusTexto: response.statusText,
                                })) 
        );
      }   

}