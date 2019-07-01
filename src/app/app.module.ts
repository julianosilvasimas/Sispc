import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ROUTES} from './app.routes'
import { RouterModule, PreloadAllModules } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { IndicadoresComponent } from './indicadores/indicadores.component';
import { RecdirComponent } from './indicadores/recdir/recdir.component';
import { RecdirdiaComponent } from './indicadores/recdirdia/recdirdia.component';
import { ArrecadacaoComponent } from './indicadores/arrecadacao/arrecadacao.component';
import { LigacoesvalComponent } from './indicadores/ligacoesval/ligacoesval.component';
import { LigacoesqtdComponent } from './indicadores/ligacoesqtd/ligacoesqtd.component';
import { LigacoesvendasComponent } from './indicadores/ligacoesvendas/ligacoesvendas.component';
import { LigacoescvComponent } from './indicadores/ligacoescv/ligacoescv.component';
import { TelecobrancaComponent } from './indicadores/telecobranca/telecobranca.component';
import { TmaatendimentoComponent } from './indicadores/tmaatendimento/tmaatendimento.component';
import { TmeatendimentoComponent } from './indicadores/tmeatendimento/tmeatendimento.component';
import { TmacallComponent } from './indicadores/tmacall/tmacall.component';
import { TmecallComponent } from './indicadores/tmecall/tmecall.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ToastrModule } from 'ngx-toastr';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {FieldsetModule} from 'primeng/fieldset';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {SpinnerModule} from 'primeng/spinner';

import {IndicadoresService} from 'src/app/indicadores/indicadores.service';
import { RecindComponent } from './indicadores/recind/recind.component';
import { FiscassertComponent } from './indicadores/fiscassert/fiscassert.component';
import { FiscprodComponent } from './indicadores/fiscprod/fiscprod.component';
import { LigacoesexecComponent } from './indicadores/ligacoesexec/ligacoesexec.component';
import { CorteComponent } from './indicadores/corte/corte.component';
import { ReligacaoComponent } from './indicadores/religacao/religacao.component';
import { CortevalComponent } from './indicadores/corteval/corteval.component';
import { ReligacaovalComponent } from './indicadores/religacaoval/religacaoval.component';
import { PercentprazoComponent } from './indicadores/percentprazo/percentprazo.component';
import { EnergiaComponent } from './indicadores/energia/energia.component';
import { EnergiavalComponent } from './indicadores/energiaval/energiaval.component';
import { FiscvalComponent } from './indicadores/fiscval/fiscval.component';
import { ManutaguaComponent } from './indicadores/manutagua/manutagua.component';
import { CustosopaguaComponent } from './indicadores/custosopagua/custosopagua.component';
import { ImportcsvComponent } from './importcsv/importcsv.component';
import { FileUtil } from './importcsv/file.util';
import { CommonModule } from '@angular/common';
import {Constants} from './importcsv/importcsv.constants';
import { CedocComponent } from './indicadores/cedoc/cedoc.component';
import { NoticiasComponent } from './indicadores/noticias/noticias.component';
import { VeiculoutilizacaoComponent } from './indicadores/veiculoutilizacao/veiculoutilizacao.component';
import { GestaodeliberacaoComponent } from './gestaodeliberacao/gestaodeliberacao.component';
import { PainelprocessoComponent } from './gestaodeliberacao/painelprocesso/painelprocesso.component';
import {GestaoDeliberacaoService} from './gestaodeliberacao/gestaodeliberacao.service';
import { PrintdeliberacaoComponent } from './gestaodeliberacao/printdeliberacao/printdeliberacao.component'; 

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    IndicadoresComponent,
    RecdirComponent,
    RecdirdiaComponent,
    ArrecadacaoComponent,
    LigacoesvalComponent,
    LigacoesqtdComponent,
    LigacoesvendasComponent,
    LigacoescvComponent,
    TelecobrancaComponent,
    TmaatendimentoComponent,
    TmeatendimentoComponent,
    TmacallComponent,
    TmecallComponent,
    RecindComponent,
    FiscassertComponent,
    FiscprodComponent,
    LigacoesexecComponent,
    CorteComponent,
    ReligacaoComponent,
    CortevalComponent,
    ReligacaovalComponent,
    PercentprazoComponent,
    EnergiaComponent,
    EnergiavalComponent,
    FiscvalComponent,
    ManutaguaComponent,
    CustosopaguaComponent,
    ImportcsvComponent,
    CedocComponent,
    NoticiasComponent,
    VeiculoutilizacaoComponent,
    GestaodeliberacaoComponent,
    PainelprocessoComponent,
    PrintdeliberacaoComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule, 
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
    CalendarModule,
    FormsModule,
    MultiSelectModule,
    AutoCompleteModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    CurrencyMaskModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      toastClass: 'toast toast-bootstrap-compatibility-fix',
      preventDuplicates: false,
    }),
    InputMaskModule,
    KeyFilterModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DropdownModule,
    TabViewModule,
    TableModule,
    SpinnerModule,
    CommonModule,
    CheckboxModule
  ],
  providers: [
    IndicadoresService,
    GestaoDeliberacaoService,
    Constants,
    FileUtil
  ],
  bootstrap: [
    AppComponent,
    TopoComponent
  ]
})
export class AppModule { }
