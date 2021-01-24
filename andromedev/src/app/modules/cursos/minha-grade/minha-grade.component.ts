import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import {CursosService} from '../../../core/services/cursos/cursos.service'


@Component({
  selector: 'app-minha-grade',
  templateUrl: './minha-grade.component.html',
  styleUrls: ['./minha-grade.component.css']
})
export class MinhaGradeComponent implements OnInit {
  inscricao: Subscription;
  Disciplinas=[]
  DisciplinasPeriodo=[]
  curso:string
  Periodo=[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Cursos: CursosService) { 
    }
  ngOnInit() {
    this.Cursos.getDisciplina().then(e=> {
      this.Disciplinas=e.disciplinas
      this.Periodo=e.disciplinas.map(p=>{
        return p.semestre
      })
      this.Periodo=this.Periodo.filter(p=>{
        return p!=null
      })
      this.Periodo=[...new Set(this.Periodo)]
      this.Periodo.map(e=>{
        const DisciplinaP = this.Disciplinas.filter(f=>{
          return e==f.semestre
        })
        this.DisciplinasPeriodo.push(DisciplinaP)
      })    
      console.log(this.DisciplinasPeriodo)
    })
  }
  selectPeriod(periodo){
    console.log(periodo)
  }
  selectDiscipline(disciplina){
    console.log(disciplina)
  }
  ngOnDestroy(){
    this.Disciplinas=[];
  }

}
