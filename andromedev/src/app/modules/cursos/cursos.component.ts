import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs'

import {CursosService as Cursos} from '../../core/services/cursos/cursos.service'
import {Disciplina} from '../../shared/models/disciplina.interface'
import { Curso } from '../../shared/models/cursos.interface';

import { ChildActivationStart } from '@angular/router';

@Component({
  selector: 'cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  Curso=[];
  Disciplinas=[]
  voltar:boolean=true
  
  constructor( private Cursos:Cursos) { }

  ngOnInit(): void {
    this.Cursos.getCursos().subscribe(data => this.Curso=data)
  }

  getDisciplina(disciplina:string){
    this.Cursos.getDisciplina(disciplina).then(data => this.Disciplinas=data)
    this.voltar=!this.voltar
  }

  VoltarCursos(){
    this.voltar=!this.voltar
  }


}
