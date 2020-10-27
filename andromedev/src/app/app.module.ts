import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './modules/search/search.component';


import { AppRoutingModule } from './app.router.module';

import {CursosService} from './core/services/cursos/cursos.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,


  ],
  providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
