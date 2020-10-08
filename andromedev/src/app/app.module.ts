import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CursosComponent } from './modules/cursos/cursos.component';
import { SearchComponent } from './modules/search/search.component';
import {CursosService} from './core/services/cursos/cursos.service';
import { MinhaGradeComponent } from './modules/cursos/minha-grade/minha-grade.component';
import { RequisitosComponent } from './modules/cursos/requisitos/requisitos.component';
import { PeriodoComponent } from './modules/cursos/periodo/periodo.component'
@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    SearchComponent,
    MinhaGradeComponent,
    RequisitosComponent,
    PeriodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
