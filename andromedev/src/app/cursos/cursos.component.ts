import { Component, OnInit } from '@angular/core';
import { Curso } from '../interface/cursos.interface';
import {Observable} from 'rxjs'

import {CursosService as Cursos} from './cursos.service'
import {Disciplina} from '../interface/disciplina.interface'
import { ChildActivationStart } from '@angular/router';

@Component({
  selector: 'cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  Curso=[];

  voltar:boolean=true
  
  constructor( private Cursos:Cursos) { }

  ngOnInit(): void {
    this.Cursos.getCursos().subscribe(data => this.Curso=data)
  }

  VoltarCurso(){
    this.voltar=!this.voltar
  }


}
