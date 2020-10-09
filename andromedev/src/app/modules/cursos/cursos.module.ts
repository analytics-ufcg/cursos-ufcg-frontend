import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CursosComponent} from './cursos.component'
import {MinhaGradeComponent} from './minha-grade/minha-grade.component'
import {PeriodoComponent} from './periodo/periodo.component'

import {CursosRoutingModule} from './cursos.router.module';
import { FluxogramaComponent } from './fluxograma/fluxograma.component'

@NgModule({
  declarations: [
    CursosComponent,
    MinhaGradeComponent,
    PeriodoComponent,
    FluxogramaComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
