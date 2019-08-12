import {Routes, RouterModule} from '@angular/router'

import { RecdirComponent } from './indicadores/recdir/recdir.component';
import { FaturamentocobrancaComponent } from './indicadores/faturamentocobranca/faturamentocobranca.component';
import { LigacoesqtdComponent } from './indicadores/ligacoesqtd/ligacoesqtd.component';
import { LigacoesvendasComponent } from './indicadores/ligacoesvendas/ligacoesvendas.component';
import { LigacoescvComponent } from './indicadores/ligacoescv/ligacoescv.component';
import { AtendimentoComponent } from './indicadores/atendimento/atendimento.component';
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
import { CedocComponent } from './indicadores/cedoc/cedoc.component';
import { NoticiasComponent } from './indicadores/noticias/noticias.component';
import { VeiculoutilizacaoComponent } from './indicadores/veiculoutilizacao/veiculoutilizacao.component';
import { PrintdeliberacaoComponent } from './gestaodeliberacao/printdeliberacao/printdeliberacao.component';
import { PainelprocessoComponent } from './gestaodeliberacao/painelprocesso/painelprocesso.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard.service';
import { EnergiaeteComponent } from './indicadores/energiaete/energiaete.component';
import { VolumesComponent } from './indicadores/volumes/volumes.component';
import { VolumeeteComponent } from './indicadores/volumeete/volumeete.component';
import { CustosopesgotoComponent } from './indicadores/custosopesgoto/custosopesgoto.component';

export const ROUTES: Routes = [
    {path: 'login',   component: LoginComponent},
    {path: '', component: AppComponent, canActivate: [AuthGuard] },
    {path: 'recdir', component: RecdirComponent, canActivate: [AuthGuard] },
    {path: 'fatcobranca', component: FaturamentocobrancaComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesqtd', component: LigacoesqtdComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesvendas', component: LigacoesvendasComponent, canActivate: [AuthGuard] },
    {path: 'ligacoescv', component: LigacoescvComponent, canActivate: [AuthGuard] },
    {path: 'atendimento', component: AtendimentoComponent, canActivate: [AuthGuard] },
    {path: 'fiscassert', component: FiscassertComponent, canActivate: [AuthGuard] },
    {path: 'fiscprod', component: FiscprodComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesexec', component: LigacoesexecComponent, canActivate: [AuthGuard] },
    {path: 'corte', component: CorteComponent, canActivate: [AuthGuard] },
    {path: 'religacao', component: ReligacaoComponent, canActivate: [AuthGuard] },
    {path: 'percentprazo', component: PercentprazoComponent, canActivate: [AuthGuard] },
    {path: 'energia', component: EnergiaComponent, canActivate: [AuthGuard] },
    {path: 'energiaval', component: EnergiavalComponent, canActivate: [AuthGuard] },
    {path: 'manutagua', component: ManutaguaComponent, canActivate: [AuthGuard] },
    {path: 'custosopa', component: CustosopaguaComponent, canActivate: [AuthGuard] },
    {path: 'import',   component: ImportcsvComponent, canActivate: [AuthGuard] },
    {path: 'cedoc',   component: CedocComponent, canActivate: [AuthGuard] },
    {path: 'noticias',   component: NoticiasComponent, canActivate: [AuthGuard] },
    {path: 'veiculosutil',   component: VeiculoutilizacaoComponent, canActivate: [AuthGuard] },
    {path: 'painelprocess',   component: PainelprocessoComponent, canActivate: [AuthGuard] },
    {path: 'printdelib',   component: PrintdeliberacaoComponent, canActivate: [AuthGuard] },
    {path: 'energiaete',   component: EnergiaeteComponent, canActivate: [AuthGuard] },
    {path: 'volumeete',   component: VolumeeteComponent, canActivate: [AuthGuard] },
    {path: 'volumes',   component: VolumesComponent, canActivate: [AuthGuard] },
    {path: 'custosope',   component: CustosopesgotoComponent, canActivate: [AuthGuard] }
]
