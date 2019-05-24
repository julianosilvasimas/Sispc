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


export const ROUTES: Routes = [
    {path: 'indicadores', component: IndicadoresComponent},
    {path: 'recdir', component: RecdirComponent},
    {path: 'recdirdia', component: RecdirdiaComponent},
    {path: 'recind', component: RecindComponent},
    {path: 'arrecadacao', component: ArrecadacaoComponent},
    {path: 'ligacoesval', component: LigacoesvalComponent},
    {path: 'ligacoesqtd', component: LigacoesqtdComponent},
    {path: 'ligacoesvendas', component: LigacoesvendasComponent},
    {path: 'ligacoescv', component: LigacoescvComponent},
    {path: 'telecobranca', component: TelecobrancaComponent},
    {path: 'tmaatendimento', component: TmaatendimentoComponent},
    {path: 'tmeatendimento', component: TmeatendimentoComponent},
    {path: 'tmacall', component: TmacallComponent},
    {path: 'tmecall', component: TmecallComponent},
    {path: 'fiscassert', component: FiscassertComponent},
    {path: 'fiscprod', component: FiscprodComponent},
    {path: 'ligacoesexec', component: LigacoesexecComponent},
    {path: 'corte', component: CorteComponent},
    {path: 'religacao', component: ReligacaoComponent},
    {path: 'corteval', component: CortevalComponent},
    {path: 'religacaoval', component: ReligacaovalComponent},
    {path: 'percentprazo', component: PercentprazoComponent},
    {path: 'energia', component: EnergiaComponent},
    {path: 'energiaval', component: EnergiavalComponent},
    {path: 'fiscval', component: FiscvalComponent},
    {path: 'manutagua', component: ManutaguaComponent},
    {path: 'custosopa', component: CustosopaguaComponent},
    {path: 'import',   component: ImportcsvComponent}
]
