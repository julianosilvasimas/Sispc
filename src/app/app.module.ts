import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ROUTES} from './app.routes'
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { RecdirComponent } from './indicadores/recdir/recdir.component';
import { FaturamentocobrancaComponent } from './indicadores/faturamentocobranca/faturamentocobranca.component';
import { LigacoesqtdComponent } from './indicadores/ligacoesqtd/ligacoesqtd.component';
import { LigacoesvendasComponent } from './indicadores/ligacoesvendas/ligacoesvendas.component';
import { LigacoescvComponent } from './indicadores/ligacoescv/ligacoescv.component';
import { AtendimentoComponent } from './indicadores/atendimento/atendimento.component';
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
import { FiscassertComponent } from './indicadores/fiscassert/fiscassert.component';
import { FiscprodComponent } from './indicadores/fiscprod/fiscprod.component';
import { LigacoesexecComponent } from './indicadores/ligacoesexec/ligacoesexec.component';
import { CorteComponent } from './indicadores/corte/corte.component';
import { ReligacaoComponent } from './indicadores/religacao/religacao.component';
import { PercentprazoComponent } from './indicadores/percentprazo/percentprazo.component';
import { EnergiaComponent } from './indicadores/energia/energia.component';
import { EnergiavalComponent } from './indicadores/energiaval/energiaval.component';
import { ManutaguaComponent } from './indicadores/manutagua/manutagua.component';
import { CustosopaguaComponent } from './indicadores/custosopagua/custosopagua.component';
import { ImportcsvComponent } from './importcsv/importcsv.component';
import { FileUtil } from './importcsv/file.util';
import { CommonModule } from '@angular/common';
import {Constants} from './importcsv/importcsv.constants';
import { CedocComponent } from './indicadores/cedoc/cedoc.component';
import { NoticiasComponent } from './indicadores/noticias/noticias.component';
import { VeiculoutilizacaoComponent } from './indicadores/veiculoutilizacao/veiculoutilizacao.component';
import { PainelprocessoComponent } from './gestaodeliberacao/painelprocesso/painelprocesso.component';
import {GestaoDeliberacaoService} from './gestaodeliberacao/gestaodeliberacao.service';
import { PrintdeliberacaoComponent } from './gestaodeliberacao/printdeliberacao/printdeliberacao.component';
import { LoginComponent } from './login/login.component'; 
import{AuthService} from './login/auth.service';
import { AuthGuard } from './guards/auth.guard.service';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EnergiaeteComponent } from './indicadores/energiaete/energiaete.component';
import { VolumesComponent } from './indicadores/volumes/volumes.component';
import { VolumeeteComponent } from './indicadores/volumeete/volumeete.component';
import { CustosopesgotoComponent } from './indicadores/custosopesgoto/custosopesgoto.component';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RecdirComponent,
    FaturamentocobrancaComponent,
    LigacoesqtdComponent,
    LigacoesvendasComponent,
    LigacoescvComponent,
    AtendimentoComponent,
    FiscassertComponent,
    FiscprodComponent,
    LigacoesexecComponent,
    CorteComponent,
    ReligacaoComponent,
    PercentprazoComponent,
    EnergiaComponent,
    EnergiavalComponent,
    ManutaguaComponent,
    CustosopaguaComponent,
    ImportcsvComponent,
    CedocComponent,
    NoticiasComponent,
    VeiculoutilizacaoComponent,
    PainelprocessoComponent,
    PrintdeliberacaoComponent,
    LoginComponent,
    EnergiaeteComponent,
    VolumesComponent,
    VolumeeteComponent,
    CustosopesgotoComponent,
  ],
  imports: [
BrowserModule,
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
    DynamicDialogModule,
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
    PrintdeliberacaoComponent,
    AuthService,
    AuthGuard,
    Constants,
    MessageService,
    FileUtil
  ],
  bootstrap: [
    AppComponent,
    TopoComponent
  ]
})
export class AppModule { }
