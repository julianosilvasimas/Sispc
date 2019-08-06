import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html'
})
export class TopoComponent implements OnInit {

  mostrarMenu: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  items: MenuItem[];
  indicadores: any;
  private permissoes: string;

  ngOnInit() {
    //this.permissoes = this.authService.dados[4] ;
        
    
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar =>{ 
        this.mostrarMenu = mostrar;
        this.authService.userDados()
        this.permissoes = this.authService.permissoes()
        
        if(this.permissoes === 'ROLE_ADMIN'){ 
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
                    icon: 'pi pi-fw pi-users',
                    items: [
                            {label: 'Energia Custo',
                            routerLink: '/energiaval',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Energia Kwh',
                            routerLink: '/energia',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Energia ETEs',
                            routerLink: '/energiaete',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Custos Op. Água',
                            routerLink: '/custosopa',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Volume ETA',
                            routerLink: '/volumes',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Volumes ETEs',
                            routerLink: '/volumeete',
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
                    {label: 'Administrativo',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                            {label: 'Cedoc',
                            routerLink: '/cedoc',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Transporte',
                            routerLink: '/veiculosutil',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Facilities',
                            //routerLink: '/**',
                            icon: 'pi pi-fw pi-plus'},
                            {label: 'Contratos e Medições',
                            //routerLink: '/**',
                            icon: 'pi pi-fw pi-plus'},
                            ]
                      },

                    {label: 'Comunicação',
                    icon: 'pi pi-fw pi-volume-up',
                    items: [
                            {label: 'Noticias',
                            routerLink: '/noticias',
                            icon: 'pi pi-fw pi-plus'},
                    ]
                  },

                    {label: 'Imports',
                    icon: 'pi pi-fw pi-upload',
                    items: [
                            {label: 'Update via Csv',
                            routerLink: '/import',
                            icon: 'pi pi-fw pi-plus'},
                    ]
                  },

                  {label: 'Comissão de Fraudes',
                    icon: 'pi pi-fw pi-ban',
                    items: [
                            {label: 'Gestão de Deliberação',
                            routerLink: '/painelprocess',
                            icon: 'pi pi-fw pi-plus'},
                    ]
                  },

                  {label: 'Configurações',
                  icon: 'pi pi-fw pi-cog',
                  items: [
                          {label: 'Alterar Senha',
                          routerLink: '/',
                          icon: 'pi pi-fw pi-pencil'},
                    ]
                  }
                ];
        }else if(this.permissoes === 'ROLE_COMISSAO_ADMIN'){ 

            this.items = [
              {label: 'Comissão de Fraudes',
              icon: 'pi pi-fw pi-ban',
              items: [
                      {label: 'Gestão de Deliberação',
                      routerLink: '/painelprocess',
                      icon: 'pi pi-fw pi-plus'},
                ]
              },  

              {label: 'Imports',
              icon: 'pi pi-fw pi-upload',
              items: [
                      {label: 'Update via Csv',
                      routerLink: '/import',
                      icon: 'pi pi-fw pi-plus'},
                ]
              },

              {label: 'Configurações',
              icon: 'pi pi-fw pi-cog',
              items: [
                      {label: 'Alterar Senha',
                      routerLink: '/',
                      icon: 'pi pi-fw pi-pencil'},
                ]
              }
            ];

        }else if(this.permissoes === 'ROLE_INDICADOR_COMERCIAL_USER'){
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

        {label: 'Imports',
        icon: 'pi pi-fw pi-upload',
        items: [
                {label: 'Update via Csv',
                routerLink: '/import',
                icon: 'pi pi-fw pi-plus'},
        ]
      },


      {label: 'Configurações',
      icon: 'pi pi-fw pi-cog',
      items: [
              {label: 'Alterar Senha',
              routerLink: '/',
              icon: 'pi pi-fw pi-pencil'},
        ]
      }
    ];
        }else if(this.permissoes === 'ROLE_INDICADOR_SERVICO_USER'){
          this.items = [{
        label: 'Serviços',
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

      {label: 'Configurações',
      icon: 'pi pi-fw pi-cog',
      items: [
              {label: 'Alterar Senha',
              routerLink: '/',
              icon: 'pi pi-fw pi-pencil'},
        ]
      }
    ];
        }else if(this.permissoes === 'ROLE_INDICADOR_ADMINISTRATIVO_TRANSPORTE'){
          this.items = [{
            label: 'Administrativo',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                            {label: 'Transporte',
                            routerLink: '/veiculosutil',
                            icon: 'pi pi-fw pi-plus'},
                            ]
                      },

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }else if(this.permissoes === 'ROLE_INDICADOR_COMUNICACAO_USER'){
          this.items = [{
            label: 'Comunicação',
            icon: 'pi pi-fw pi-volume-up',
            items: [
                    {label: 'Noticias',
                    routerLink: '/noticias',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }else if(this.permissoes === 'ROLE_INDICADOR_OPERACIONAL_ENERGIA'){
          this.items = [{
            label: 'Operacional',
            icon: 'pi pi-fw pi-users',
            items: [
                    {label: 'Energia Custo',
                    routerLink: '/energiaval',
                    icon: 'pi pi-fw pi-plus'},
                    {label: 'Energia Kwh',
                    routerLink: '/energia',
                    icon: 'pi pi-fw pi-plus'},
                    {label: 'Energia ETEs',
                    routerLink: '/energiaete',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },
            

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }else if(this.permissoes === 'ROLE_INDICADOR_OPERACIONAL_AGUA'){
          this.items = [{
            label: 'Operacional',
            icon: 'pi pi-fw pi-users',
            items: [
                    {label: 'Custos Op. Água',
                    routerLink: '/custosopa',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },
            

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }else if(this.permissoes === 'ROLE_INDICADOR_OPERACIONAL_VOLUME'){
          this.items = [{
            label: 'Operacional',
            icon: 'pi pi-fw pi-users',
            items: [
                    {label: 'Volume ETA',
                    routerLink: '/volumes',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },
            

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }else if(this.permissoes === 'ROLE_INDICADOR_ADMINISTRATIVO_CEDOC'){
          this.items = [{
            label: 'Administrativo',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                            {label: 'Cedoc',
                            routerLink: '/cedoc',
                            icon: 'pi pi-fw pi-plus'},
                            ]
                      },

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }else if(this.permissoes === 'ROLE_INDICADOR_OPERACIONAL_ESGOTO'){
          this.items = [{
            label: 'Operacional',
            icon: 'pi pi-fw pi-users',
            items: [
                    {label: 'Volumes ETEs ',
                    routerLink: '/volumeete',
                    icon: 'pi pi-fw pi-plus'},
                    {label: 'Energia ETEs',
                    routerLink: '/energiaete',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },
            

            {label: 'Imports',
            icon: 'pi pi-fw pi-upload',
            items: [
                    {label: 'Update via Csv',
                    routerLink: '/import',
                    icon: 'pi pi-fw pi-plus'},
            ]
          },

          {label: 'Configurações',
          icon: 'pi pi-fw pi-cog',
          items: [
                  {label: 'Alterar Senha',
                  routerLink: '/',
                  icon: 'pi pi-fw pi-pencil'},
            ]
          }
        ];
        }
      }
    );    

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

  sair(){
    //USADO PARA APAGAR LOCAL STORAGE// localStorage.clear();
    this.authService.checkAutenticado(1);
    location.reload(true);
    this.router.navigate(['/login']);
  }

}
