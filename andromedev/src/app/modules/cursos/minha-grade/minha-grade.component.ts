import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import {CursosService} from '../../../core/services/cursos/cursos.service'
import { threadId } from 'worker_threads';


@Component({
  selector: 'app-minha-grade',
  templateUrl: './minha-grade.component.html',
  styleUrls: ['./minha-grade.component.css']
})
export class MinhaGradeComponent implements OnInit {
  inscricao: Subscription;
  Disciplinas=[]
  curso:string
  Periodo=[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Cursos: CursosService) { 
    }
  ngOnInit() {
    this.Cursos.getDisciplina().then(e=> {
      this.Periodo=e.map(p=>{
        return p.semestre
      })
      this.Periodo=this.Periodo.filter(p=>{
        return p!=null
      })
      this.Periodo=[...new Set(this.Periodo)]
      console.log(this.Periodo)
    })
  }

  ngOnDestroy(){
    this.Disciplinas=[];
  }

}
