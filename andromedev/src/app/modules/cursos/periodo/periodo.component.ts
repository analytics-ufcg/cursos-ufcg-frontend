import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { CursosService } from '../../../core/services/cursos/cursos.service'
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  inscricao: Subscription;
  Disciplinas: any[];
  periodo: number;
  curso: string = ''
  constructor(private Cursos: CursosService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.inscricao = this.route.params
      .subscribe(params => {
        this.periodo = params['periodo']
        this.Cursos.getDisciplina().then(e => {
          this.curso = e.curso
          this.Disciplinas = e.disciplinas.filter(p => {
            if (p.semestre == this.periodo) {
              p.isCollapsed = false
              if (p.codigo_disciplina == e.requisito) {
                p.isCollapsed = true
              }
              p.pre = this.Cursos.getPre(p.pre_requisitos)
              p.pos = this.Cursos.getPos(p.pos_requisitos)
              return true
            }
            else return false
          })
        })
      })
  }
  isCollapsed(id) {
    this.Disciplinas.forEach(e => {
      if (e.codigo_disciplina == id) {
        e.isCollapsed = !e.isCollapsed
      } else {
        e.isCollapsed = false
      }
    })
  }
  localizar(disciplina) {
    this.Cursos.changePeriodo(disciplina.semestre)
    this.Cursos.changeRequisito(disciplina.codigo_disciplina)
    this.router.navigate([`${this.curso}/fluxograma`, disciplina.semestre]);
  }
  ngOnDestroy() {
    this.Disciplinas = [];
  }
}
