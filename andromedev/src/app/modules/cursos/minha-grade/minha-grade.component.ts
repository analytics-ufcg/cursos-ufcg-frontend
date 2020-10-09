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
  curso:string
  Periodo=[]

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Cursos: CursosService) { 
    }
  ngOnInit() {
    this.Cursos.getDisciplina().then(e=> {
      this.Disciplinas=e.disciplinas
    })
  }

  ngOnDestroy(){
    this.Disciplinas=[];
  }

}
