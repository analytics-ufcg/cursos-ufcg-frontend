import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {CursosService} from '../../../core/services/cursos/cursos.service'

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  Disciplinas: any[];
  periodo: number;
  inscricao: Subscription;
  constructor(private Cursos: CursosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.route)
    this.inscricao = this.route.params
    .subscribe(params => {
      this.periodo=params['periodo']
        this.Cursos.getDisciplina().then(e=> {
          this.Disciplinas=e.disciplinas.filter(p=>{
            if(p.semestre==this.periodo){
              p.isCollapsed = false
              p.pre = this.Cursos.getPre(p.pre_requisitos)
              p.pos= this.Cursos.getPos(p.pos_requisitos)
              return true
            }     
            else return false
          })
          console.log(this.Disciplinas)
        })

      }
    );
  }
  isCollapsed(id){
    this.Disciplinas.forEach(e=>{
      if(e.codigo_disciplina==id){
        e.isCollapsed = ! e.isCollapsed
      } else{
        e.isCollapsed = false
      } 
    })
  }

}
