import{Injectable} from '@angular/core'
import {Indicadores, Precos, Supervisoes, UtilizacaoVeiculos} from './indicadores.model'


import {API_CONFIG} from '../app.api'


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandler } from 'src/app/app.error-handler';

@Injectable()
export class IndicadoresService{

    constructor(private http: HttpClient){}

    
    indicadores(filtro : string, indicador : string): Observable<Indicadores[]>{
       return  this.http.get(`${API_CONFIG}/inddiarios/${indicador}/${filtro}`) 
       .pipe(map((res : Indicadores[]) => res, catchError(ErrorHandler.handleError)))
    }

    indicadoresCiclo(filtro : string, indicador : string, referencia : String): Observable<Indicadores[]>{
      return  this.http.get(`${API_CONFIG}/inddiarios/${indicador}/${filtro}/${referencia}`) 
      .pipe(map((res : Indicadores[]) => res, catchError(ErrorHandler.handleError)))
    }

    // Busca da lista de supervisoes
    supervisoes(): Observable<Supervisoes[]>{
      return  this.http.get(`${API_CONFIG}/supervisoes`) 
      .pipe(map((res : Supervisoes[]) => res, catchError(ErrorHandler.handleError)))
   }

    // Busca da lista de precos de produto
    precos(): Observable<Precos[]>{
      return  this.http.get(`${API_CONFIG}/precos`) 
      .pipe(map((res : Precos[]) => res, catchError(ErrorHandler.handleError)))
   }

    // Busca de precos de produto por id
    precosById(id : string): Observable<Precos[]>{
      return  this.http.get(`${API_CONFIG}/precos/${id}`) 
      .pipe(map((res : Precos[]) => res, catchError(ErrorHandler.handleError)))
   }
    
   // Método put para tabela de preços
   precosUpdate(id: any, produto: string, preco: number): Observable<any>{
    const headers = new HttpHeaders()
    .set("Content-Type", "application/json",
    );
    let bodyObj = {
                    "id": id,
                    "produto": produto,
                    "preco": preco
                   };
   
    return this.http.put(`${API_CONFIG}/precos/${id}`,JSON.stringify(bodyObj) , {headers},)
                    .pipe(map(this.extractData),
                    catchError(ErrorHandler.handleError))
  }

  // Método put para tabela de indicadores diário
  indicadoresByDay(id: any, orcado: Number, real: Number, pdd: Number, atendente: Number, atendimento: Number, coment: string, 
    forecast: Number, colaborador: string, acao: string, analise): Observable<any>{
        const headers = new HttpHeaders()
        .set("Content-Type", "application/json",
        );
        let bodyObj = {
                    "orcado": orcado,
                    "reali": real,
                    "pecld": pdd,
                    "atendente": atendente,
                    "atendimento": atendimento,
                    "comentario": coment,
                    "forecast": forecast,
                    "colaborador": colaborador,
                    "acao": acao,
                    "analise": analise
          };
       
    return this.http.put(`${API_CONFIG}/inddiarios/${id}`,JSON.stringify(bodyObj) , {headers},)
                        .pipe(map(this.extractData),
                        catchError(ErrorHandler.handleError))
      }
    
      private extractData(res: Response) {
        let body = res;
        return body;
      }

    InputVeiculosUtilizacao(placa: String, motorista: String, motor_ligado: Date, hodometro_inicial: Number, hodometro_final: Number, 
      distancia_km: Number): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        return this.http.post<UtilizacaoVeiculos>(`${API_CONFIG}/veiculos_utilizacao`,
        {placa: placa, motorista: motorista, motor_ligado: motor_ligado, hodometro_inicial: hodometro_inicial, hodometro_final: hodometro_final, 
          distancia_km: distancia_km},
        { observe: 'response'})
        .pipe(
          map((response) => ({data: response.headers, 
                              status: response.status,
                              statusTexto: response.statusText})) 
      );
    }  


    }
