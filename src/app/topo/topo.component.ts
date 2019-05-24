import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  constructor() { }

  items: MenuItem[];
  indicadores: any;

  ngOnInit() {
    
    this.items = [{
                  label: 'Comercial', 
                  icon: 'pi pi-fw pi-dollar',
                  items: [
                      {label: 'Receita Direta Ciclo',
                      routerLink: '/recdir',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Receita Direta Dia',
                      routerLink: '/recdirdia',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Receita Indireta',
                      routerLink: '/recind',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Arrecadação',
                      routerLink: '/arrecadacao',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Fiscalização $',
                      routerLink: '/fiscval',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Corte $',
                      routerLink: '/corteval',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Religação $',
                      routerLink: '/religacaoval',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Cortes - Execução ',
                      routerLink: '/corte',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Ligações ($)',
                      routerLink: '/ligacoesval',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Ligações (Qtd.)',
                      routerLink: '/ligacoesqtd',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Ligações - Vendas(Qtd.)',
                      routerLink: '/ligacoesvendas',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Ligações - Crescimento Vegetativo(Qtd.)',
                      routerLink: '/ligacoescv',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Telecobrança ($)',
                      routerLink: '/telecobranca',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'TMA Atendimento ',
                      routerLink: '/tmaatendimento',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'TME Atendimento ',
                      routerLink: '/tmeatendimento',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'TMA Call Center ',
                      routerLink: '/tmacall',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'TME Call Center ',
                      routerLink: '/tmecall',
                      icon: 'pi pi-fw pi-plus'}
                  ]
              },
              {label: 'Operacional',
              icon: 'pi pi-fw pi-cog',
              items: [
                      {label: 'Energia Custo',
                      routerLink: '/energiaval',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Energia Kwh',
                      routerLink: '/energia',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Custos Op. Água',
                      routerLink: '/custosopa',
                      icon: 'pi pi-fw pi-plus'},
              ]
            },
              {label: 'Serviços',
              icon: 'pi pi-fw pi-briefcase',
              items: [
                      {label: 'Produtividade Manutenção Água ',
                      routerLink: '/manutagua',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Produtividade Fiscalização ',
                      routerLink: '/fiscprod',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Produtividade Fiscalização ',
                      routerLink: '/fiscprod',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Assertividade Fiscalização ',
                      routerLink: '/fiscassert',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Ligação Nova - Execução ',
                      routerLink: '/ligacoesexec',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Religação Execução ',
                      routerLink: '/religacao',
                      icon: 'pi pi-fw pi-plus'},
                      {label: 'Prazo Serv.',
                      routerLink: '/percentprazo',
                      icon: 'pi pi-fw pi-plus'},
              ]},
              {label: 'Imports',
              icon: 'pi pi-fw pi-upload',
              items: [
                      {label: 'Update via Csv',
                      routerLink: '/import',
                      icon: 'pi pi-fw pi-plus'},
              ]
            },
          ];
      
  }

  activeMenu(event) {

    let node;
    if (event.target.tagName === "A") {
      node = event.target;
    } else {
      node = event.target.parentNode;
    }
    let menuitem = document.getElementsByClassName("ui-menuitem-link");
    for (let i = 0; i < menuitem.length; i++) {
      menuitem[i].classList.remove("active");
    }
    node.classList.add("active")
  }

}
