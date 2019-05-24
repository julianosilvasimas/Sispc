import { Component, OnInit, ViewChild } from "@angular/core";
import { Router }                       from "@angular/router";
import { FileUtil }                     from './file.util';
import { Constants }                    from './importcsv.constants';
 

@Component({
  selector: 'app-importcsv',
  templateUrl: './importcsv.component.html',
  styleUrls: ['./importcsv.component.css']
})
export class ImportcsvComponent implements OnInit {

  id: number[];
  area: string[];
  atendente: number[];
  atendimento: number[];
  ciclo: number[];
  orcado: number[];
  pecld: number[];
  reali: number[];
  referencia: Date[];
  tempo: Date[];
  tipo: string[]; 
  comentario: string[];
  forecast: number[];

  @ViewChild('fileImportInput')
  fileImportInput: any;

  csvRecords = [];

  constructor(private _router: Router,
    private _fileUtil: FileUtil
  ) { }

  ngOnInit() { }

  //Método chamado quando o CSV é importado
  fileChangeListener($event): void {

    var text = [];
    var target = $event.target || $event.srcElement;
    var files = target.files; 

    if(Constants.validateHeaderAndRecordLengthFlag){
      if(!this._fileUtil.isCSVFile(files[0])){
        alert("Por favor, importe um arquivo .csv válido.");
        this.fileReset();
      }
    }

    var input = $event.target;
    var reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      let csvData = reader.result;
      let csvRecordsArray = csvData.toString().split(/\r\n|\n/);

      var headerLength = -1;
      if(Constants.isHeaderPresentFlag){
        let headersRow = this._fileUtil.getHeaderArray(csvRecordsArray, Constants.tokenDelimeter);
        headerLength = headersRow.length; 
      }
      
      this.csvRecords = this._fileUtil.getDataRecordsArrayFromCSVFile(csvRecordsArray, 
          headerLength, Constants.validateHeaderAndRecordLengthFlag, Constants.tokenDelimeter);

      //***********************************Aqui começarei a gravar meus arrays de dados*****************************************// 
      
      var area = [];
      var atendente = [];
      var atendimento = [];
      var ciclo = [];
      var orcado = [];
      var pecld = [];
      var reali = [];
      var referencia = [];
      var tempo = [];
      var tipo = [];
      var comentario = [];
      var forecast = [];

      for (var i in this.csvRecords){
        if (i != "0"){
          
          area.push(this.csvRecords[i][0])
          atendente.push(this.csvRecords[i][1])
          atendimento.push(this.csvRecords[i][2])
          ciclo.push(this.csvRecords[i][3])
          orcado.push(this.csvRecords[i][4])
          pecld.push(this.csvRecords[i][5])
          reali.push(this.csvRecords[i][6])
          referencia.push(this.csvRecords[i][7])
          tempo.push(this.csvRecords[i][8])
          tipo.push(this.csvRecords[i][9])
          comentario.push(this.csvRecords[i][10])
          forecast.push(this.csvRecords[i][11])

        }
      }   
      
      this.area = Array.from( area );
      this.atendente = Array.from( atendente );
      this.atendimento = Array.from( atendimento );
      this.ciclo = Array.from( ciclo );
      this.orcado = Array.from( orcado );
      this.pecld = Array.from( pecld );
      this.reali = Array.from( reali );
      this.referencia = Array.from( referencia );
      this.tempo = Array.from( tempo );
      this.tipo = Array.from( tipo );
      this.comentario = Array.from( comentario );
      this.forecast = Array.from( forecast );

      //*****************************************Final de gravação de arrays de dados*******************************************// 
      
      if(this.csvRecords == null){
        //Se o controle estiver aqui, isso significa que o arquivo csv contém erro, redefinir o arquivo.
        this.fileReset();
      } 
    }

    reader.onerror = function () {
      alert('Incapaz de ler' + input.files[0]);
    };
  };

  fileReset(){
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }

  //Método para obtenção id
  buscaId(){

  }

  //***********************************************************************************************************************//
  //***********************************Aqui começarei a gravar meus dados no banco*****************************************// 
  //***********************************************************************************************************************//

}
