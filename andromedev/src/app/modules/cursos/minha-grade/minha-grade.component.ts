import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import {CursosService} from '../../../core/services/cursos/cursos.service'
import {Disciplina} from '../../../shared/models/disciplina.interface'
import { Curso } from '../../../shared/models/cursos.interface';

@Component({
  selector: 'app-minha-grade',
  templateUrl: './minha-grade.component.html',
  styleUrls: ['./minha-grade.component.css']
})
export class MinhaGradeComponent implements OnInit {
  inscricao: Subscription;
  Disciplinas=[]
  curso:string

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Cursos: CursosService) { 
    }
  ngOnInit() {
        this.Cursos.getDisciplina().then(data => this.Disciplinas=data)
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
