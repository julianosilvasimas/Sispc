 import { Injectable, EventEmitter  } from '@angular/core';
import { Usuario } from './login.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { API_CONFIG } from '../app.api';
import { map, catchError, findIndex } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";
import { ErrorHandler } from '../app.error-handler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private usuarioAutenticado: boolean = false;
  private permissao: string;
  private auth: string[] = [];

  mostrarMenuEmitter = new EventEmitter<boolean>();
  dados: any = [];

  constructor(
    private router: Router,
    private http:HttpClient
    ) { }

  private extractData(res: Response) {
    let body = res;
    return body;
  }

  //Requisições Http
  fazerLogin(usuario: Usuario): Observable<any>{
    let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        var stat

        return this.http.post<any>(`${API_CONFIG}/login`,
            {email: usuario.email, senha: usuario.senha},
            { observe: 'response'})
            .pipe(
                map((response) => ({data: response.headers, 
                                    status: response.status,
                                    statusTexto: response.statusText,
                                  }),
                                  catchError(ErrorHandler.handleError)
                                  ) 
            );
  }
  
  senhaUpdate(id: number, senha: string): Observable<any>{
      const headers = new HttpHeaders()
      .set("Content-Type", "application/json",
      );
      let bodyObj = {
                      "senha": senha
                    };
     
      return this.http.put(`${API_CONFIG}/usuarios/attsenha/${id}`,JSON.stringify(bodyObj) , {headers},)
                      .pipe(map(this.extractData),
                      catchError(ErrorHandler.handleError))
  }

  // Obtendo e decodificando o Token e permissoes
  getToken(token) {
    return this.token = token
  }

  getDecodedAccessToken(token): any {
    try{
      return jwt_decode(this.token);
    }
    catch(Error){
      return null;
    }
  }

  //Métodos de checagem
  checkAutenticado(status){
    if (status == 200) {
  
      this.usuarioAutenticado = true;
  
      this.mostrarMenuEmitter.emit(true);
  
      
  
    }else {
      this.usuarioAutenticado = false;
  
      this.mostrarMenuEmitter.emit(false);
    }
      
    return this.usuarioAutenticado;
  } 
  
  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

 userDados(){
  var tokenDecode = this.getDecodedAccessToken(this.token);

  function capitalizar(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];

        if( w.length > 3){ 
           w = firstLetter.toUpperCase() + w.slice(1);
        }else if(w.length == 1 && firstLetter != 'e'){
          w = firstLetter.toUpperCase();
        }else {
           w = firstLetter + w.slice(1);
        }

        words[a] = w;
    }
    return words.join(" ");
  }
  
  this.dados.push({ key: 'idUser' , valor: tokenDecode.jti, lista: [] });
  //console.log('Id: '+this.dados[0].valor)
  
  
  this.dados.push({ key: 'email' , valor: tokenDecode.sub, lista: [] });
  sessionStorage.setItem('nome', capitalizar(this.dados[1].valor.toString().substring(0, this.dados[1].valor.indexOf('.')))+' '+capitalizar(this.dados[1].valor.toString().substring(this.dados[1].valor.indexOf('.')+1, this.dados[1].valor.indexOf('@'))))
  this.dados.push({ key: 'datalogin' , valor: tokenDecode.iat, lista: [] });
  this.dados.push({ key: 'dataexpire' , valor: tokenDecode.exp, lista: [] });
  

  var dateIni = new Date(0)
  var dateExp = new Date(0)

  dateIni.setUTCSeconds(parseInt(this.dados[2].valor))
  dateExp.setUTCSeconds(parseInt(this.dados[3].valor))
  
  //console.log('Data Login: '+ dateIni);
  //console.log('Data Validade: '+ dateExp);

  // Verificando permissões
  
  tokenDecode.roles.forEach(element => {
    this.auth.push(element['authority']);
  });

  return this.dados
  }

  permissoes(){
    var permissao1 = this.auth[0]
    //console.log(permissao1)
    return permissao1
  }

  

}
