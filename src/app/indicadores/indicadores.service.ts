import{Injectable} from '@angular/core'
import {Indicadores} from './indicadores.model'


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
    

    indicadoresByDay(id: any, orcado: Number, real: Number, pdd: Number, atendente: Number, atendimento: Number, coment: string, forecast: Number): Observable<any>{
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
                    "forecast": forecast
          };
       
    return this.http.put(`${API_CONFIG}/inddiarios/${id}`,JSON.stringify(bodyObj) , {headers},)
                        .pipe(map(this.extractData),
                        catchError(ErrorHandler.handleError))
      }
    
      private extractData(res: Response) {
        let body = res;
        return body;
      }

    }

    
