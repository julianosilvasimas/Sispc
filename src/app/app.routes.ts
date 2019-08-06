import {Routes, RouterModule} from '@angular/router'

import {IndicadoresComponent} from './indicadores/indicadores.component';
import { RecdirComponent } from './indicadores/recdir/recdir.component';
import { RecdirdiaComponent } from './indicadores/recdirdia/recdirdia.component';
import { RecindComponent } from './indicadores/recind/recind.component';
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

export const ROUTES: Routes = [
    {path: 'login',   component: LoginComponent},
    {path: '', component: AppComponent, canActivate: [AuthGuard] },
    {path: 'indicadores', component: IndicadoresComponent, canActivate: [AuthGuard] },
    {path: 'recdir', component: RecdirComponent, canActivate: [AuthGuard] },
    {path: 'recdirdia', component: RecdirdiaComponent, canActivate: [AuthGuard] },
    {path: 'recind', component: RecindComponent, canActivate: [AuthGuard] },
    {path: 'arrecadacao', component: ArrecadacaoComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesval', component: LigacoesvalComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesqtd', component: LigacoesqtdComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesvendas', component: LigacoesvendasComponent, canActivate: [AuthGuard] },
    {path: 'ligacoescv', component: LigacoescvComponent, canActivate: [AuthGuard] },
    {path: 'telecobranca', component: TelecobrancaComponent, canActivate: [AuthGuard] },
    {path: 'tmaatendimento', component: TmaatendimentoComponent, canActivate: [AuthGuard] },
    {path: 'tmeatendimento', component: TmeatendimentoComponent, canActivate: [AuthGuard] },
    {path: 'tmacall', component: TmacallComponent, canActivate: [AuthGuard] },
    {path: 'tmecall', component: TmecallComponent, canActivate: [AuthGuard] },
    {path: 'fiscassert', component: FiscassertComponent, canActivate: [AuthGuard] },
    {path: 'fiscprod', component: FiscprodComponent, canActivate: [AuthGuard] },
    {path: 'ligacoesexec', component: LigacoesexecComponent, canActivate: [AuthGuard] },
    {path: 'corte', component: CorteComponent, canActivate: [AuthGuard] },
    {path: 'religacao', component: ReligacaoComponent, canActivate: [AuthGuard] },
    {path: 'corteval', component: CortevalComponent, canActivate: [AuthGuard] },
    {path: 'religacaoval', component: ReligacaovalComponent, canActivate: [AuthGuard] },
    {path: 'percentprazo', component: PercentprazoComponent, canActivate: [AuthGuard] },
    {path: 'energia', component: EnergiaComponent, canActivate: [AuthGuard] },
    {path: 'energiaval', component: EnergiavalComponent, canActivate: [AuthGuard] },
    {path: 'fiscval', component: FiscvalComponent, canActivate: [AuthGuard] },
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
    {path: 'volumes',   component: VolumesComponent, canActivate: [AuthGuard] }
]
