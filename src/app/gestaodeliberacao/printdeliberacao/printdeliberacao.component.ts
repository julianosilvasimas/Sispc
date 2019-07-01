import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-printdeliberacao',
  templateUrl: './printdeliberacao.component.html',
  styleUrls: ['./printdeliberacao.component.css']
})
export class PrintdeliberacaoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  criaPDF() {
    var minhaTabela = document.getElementById('tabela').innerHTML;

    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Empregados</title>');   // <title> CABEÇALHO DO PDF
    //************************************Criando a Tabela ***********************************************//

    win.document.write(style);                       // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(minhaTabela);                   // O CONTEUDO DA TABELA DENTRO DO COMPONENT HTML
    win.document.write('</body></html>');
    
    //****************************************************************************************************//
    win.document.close(); 	                            // FECHA A JANELA

    win.print();                                        // IMPRIME O CONTEUDO
}

}
