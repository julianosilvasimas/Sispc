import {Routes, RouterModule} from '@angular/router'

import { RecdirComponent } from './indicadores/recdir/recdir.component';
import { FaturamentocobrancaComponent } from './indicadores/faturamentocobranca/faturamentocobranca.component';
import { AtendimentoComponent } from './indicadores/atendimento/atendimento.component';
import { AssertividadeComponent } from './indicadores/assertividade/assertividade.component';
import { ProdutividadeComponent } from './indicadores/produtividade/produtividade.component';
import { ServicosComponent } from './indicadores/servicos/servicos.component';
import { ServcomercialComponent } from './indicadores/servcomercial/servcomercial.component';
import { PrazosComponent } from './indicadores/prazos/prazos.component';
import { EnergiaComponent } from './indicadores/energia/energia.component';
import { CustosopaguaComponent } from './indicadores/custosopagua/custosopagua.component';
import { ImportcsvComponent } from './importcsv/importcsv.component';
import { CedocComponent } from './indicadores/cedoc/cedoc.component';
import { NoticiasComponent } from './indicadores/noticias/noticias.component';
import { VeiculoutilizacaoComponent } from './indicadores/veiculoutilizacao/veiculoutilizacao.component';
import { PrintdeliberacaoComponent } from './gestaodeliberacao/printdeliberacao/printdeliberacao.component';
import { PainelprocessoComponent } from './gestaodeliberacao/painelprocesso/painelprocesso.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard.service';
import { VolumesComponent } from './indicadores/volumes/volumes.component';
import { VolumeeteComponent } from './indicadores/volumeete/volumeete.component';
import { CustosopesgotoComponent } from './indicadores/custosopesgoto/custosopesgoto.component';

export const ROUTES: Routes = [
    {path: 'login',   component: LoginComponent},
    {path: '', component: AppComponent, canActivate: [AuthGuard] },
    {path: 'recdir', component: RecdirComponent, canActivate: [AuthGuard] },
    {path: 'fatcobranca', component: FaturamentocobrancaComponent, canActivate: [AuthGuard] },
    {path: 'atendimento', component: AtendimentoComponent, canActivate: [AuthGuard] },
    {path: 'assertividade', component: AssertividadeComponent, canActivate: [AuthGuard] },
    {path: 'produtividade', component: ProdutividadeComponent, canActivate: [AuthGuard] },
    {path: 'servicos', component: ServicosComponent, canActivate: [AuthGuard] },
    {path: 'servcomercial', component: ServcomercialComponent, canActivate: [AuthGuard] },
    {path: 'prazos', component: PrazosComponent, canActivate: [AuthGuard] },
    {path: 'energia', component: EnergiaComponent, canActivate: [AuthGuard] },
    {path: 'custosopa', component: CustosopaguaComponent, canActivate: [AuthGuard] },
    {path: 'import',   component: ImportcsvComponent, canActivate: [AuthGuard] },
    {path: 'cedoc',   component: CedocComponent, canActivate: [AuthGuard] },
    {path: 'noticias',   component: NoticiasComponent, canActivate: [AuthGuard] },
    {path: 'veiculosutil',   component: VeiculoutilizacaoComponent, canActivate: [AuthGuard] },
    {path: 'painelprocess',   component: PainelprocessoComponent, canActivate: [AuthGuard] },
    {path: 'printdelib',   component: PrintdeliberacaoComponent, canActivate: [AuthGuard] },
    {path: 'volumeete',   component: VolumeeteComponent, canActivate: [AuthGuard] },
    {path: 'volumes',   component: VolumesComponent, canActivate: [AuthGuard] },
    {path: 'custosope',   component: CustosopesgotoComponent, canActivate: [AuthGuard] }
]
