import { Routes, RouterModule } from '@angular/router'
import { CursosComponent } from './cursos.component'
import { NgModule } from '@angular/core';

import { RequisitosComponent } from './requisitos/requisitos.component'
import { PeriodoComponent } from './periodo/periodo.component'
import { MinhaGradeComponent } from './minha-grade/minha-grade.component'

const routes: Routes = [
    {
        path: '',
        component: CursosComponent,
        children: [
            { path: 'minha-grade', component: MinhaGradeComponent },
            {path: 'requisitos', component: RequisitosComponent, children: [
                    { path: ':periodo', component: PeriodoComponent }
                ]
            },
        ]
    }

];
@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
})
export class CursosRoutingModule { }