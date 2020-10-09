import { Routes, RouterModule } from '@angular/router'
import { CursosComponent } from './cursos.component'
import { NgModule } from '@angular/core';

import { PeriodoComponent } from './periodo/periodo.component'
import { MinhaGradeComponent } from './minha-grade/minha-grade.component'
import { FluxogramaComponent } from './fluxograma/fluxograma.component'
const routes: Routes = [
    {
        path: '',
        component: CursosComponent,
        children: [
            { path: 'minha-grade', component: MinhaGradeComponent },
            { path: 'fluxograma', component: FluxogramaComponent, },
            { path: 'fluxograma/:periodo', component: PeriodoComponent }
        ]
    }

];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class CursosRoutingModule { }