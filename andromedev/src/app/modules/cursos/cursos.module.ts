import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CursosComponent} from './cursos.component'
import {MinhaGradeComponent} from './minha-grade/minha-grade.component'
import {PeriodoComponent} from './periodo/periodo.component'
import {RequisitosComponent} from './requisitos/requisitos.component'

import {CursosRoutingModule} from './cursos.router.module'

@NgModule({
  declarations: [
    CursosComponent,
    MinhaGradeComponent,
    PeriodoComponent,
    RequisitosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule
  ]
})
export class CursosModule { }
