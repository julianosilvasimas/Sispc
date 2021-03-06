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
import { AssertividadeComponent } from './indicadores/assertividade/assertividade.component';
import { ProdutividadeComponent } from './indicadores/produtividade/produtividade.component';
import { ServicosComponent } from './indicadores/servicos/servicos.component';
import { ServcomercialComponent } from './indicadores/servcomercial/servcomercial.component';
import { PrazosComponent } from './indicadores/prazos/prazos.component';
import { EnergiaComponent } from './indicadores/energia/energia.component';
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
import { VolumeComponent } from './indicadores/volume/volume.component';
import { CustosopesgotoComponent } from './indicadores/custosopesgoto/custosopesgoto.component';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RecdirComponent,
    FaturamentocobrancaComponent,
    AtendimentoComponent,
    AssertividadeComponent,
    ProdutividadeComponent,
    ServicosComponent,
    ServcomercialComponent,
    PrazosComponent,
    EnergiaComponent,
    CustosopaguaComponent,
    ImportcsvComponent,
    CedocComponent,
    NoticiasComponent,
    VeiculoutilizacaoComponent,
    PainelprocessoComponent,
    PrintdeliberacaoComponent,
    LoginComponent,
    VolumeComponent,
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
