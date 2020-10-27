import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CursosComponent} from './cursos.component'
import {MinhaGradeComponent} from './minha-grade/minha-grade.component'
import {PeriodoComponent} from './periodo/periodo.component'
import {CursosRoutingModule} from './cursos.router.module';
import { FluxogramaComponent } from './fluxograma/fluxograma.component'
import {CarouselModule} from 'primeng/carousel';

import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    CursosComponent,
    MinhaGradeComponent,
    PeriodoComponent,
    FluxogramaComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    CollapseModule.forRoot(),
    CarouselModule ]
})
export class CursosModule { }
