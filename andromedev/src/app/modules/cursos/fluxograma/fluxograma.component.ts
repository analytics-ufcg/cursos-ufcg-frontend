import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { CursosService } from '../../../core/services/cursos/cursos.service'
@Component({
  selector: 'app-fluxograma',
  templateUrl: './fluxograma.component.html',
  styleUrls: ['./fluxograma.component.css']
})
export class FluxogramaComponent implements OnInit {

  inscricao: Subscription;
  Disciplinas = []
  curso: string
  Periodos = []
  periodo = []
  DisciplinaLocalizar = []
  responsiveOptions = []

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Cursos: CursosService) {
    this.responsiveOptions = [
      {
        breakpoint: '800px',
        numVisible: 5,
        numScroll: 5
      },
      {
        breakpoint: '670px',
        numVisible: 5,
        numScroll: 5
      },
      {
        breakpoint: '350px',
        numVisible: 5,
        numScroll:5
      },
      {
        breakpoint: '100px',
        numVisible: 1,
        numScroll: 1
      },

    ];
  }
  ngOnInit() {
    this.Cursos.getDisciplina().then(e => {
      this.curso = e.curso
      const periodos = this.summarizeData(e.disciplinas)

      this.Periodos = periodos.map(e => {
        return {
          periodo: e,
          selected: false,
          localizar: false
        }
      })
    })
  }
  summarizeData(dados) {
    console.log(dados)
    let dadosPre = dados.map(p => {
      return p.semestre
    })
    dadosPre = dadosPre.filter(p => {
      return p != null
    })
    const periodos = [...new Set(dadosPre)]
    return periodos
  }
  selected(periodo) {
    this.Periodos.forEach(e => {
      if (e.periodo == periodo) {
        e.selected = true
      } else {
        e.selected = false
      }
    })
  }
  localizar(disciplinas) {
    const periodos = this.summarizeData(disciplinas)
    this.Periodos.forEach(e => {
      if (periodos.indexOf(e.periodo) != -1) {

        e.localizar = true
      }
      else {
        e.localizar = false
      }
    })
    this.DisciplinaLocalizar = disciplinas
  }
  viewPeriod(periodo) {

    this.Cursos.getDisciplina().then(e => {
      this.periodo = e.disciplinas.filter(p => {
        if (p.semestre == periodo) {
          p.isCollapsed = false
          p.pre = this.Cursos.getPre(p.pre_requisitos)
          p.pos = this.Cursos.getPos(p.pos_requisitos)
          p.localizar = false
          return true
        }
        else return false
      })
      this.periodo.map(e => {
        e.disciplinaPre = this.concatDisci(e.pre)
        e.disciplinaPos = this.concatDisci(e.pos)
      })
      this.periodo.forEach(e => {
        const verification = this.DisciplinaLocalizar.filter(p => {
          if (p.codigo_disciplina == e.codigo_disciplina) {
            return true
          }
        })
        if (verification.length != 0) {
          e.localizar = true
        }
        else {
          e.localizar = false
        }
      })
    })


  }
  concatDisci(dis) {
    let concat = ''
    if (dis.length == 1) {
      concat = dis[0].disciplina
    }
    else {
      for (let i = 0; i < dis.length; i++) {
        if (i == dis.length - 1) {
          concat = concat + ' e ' + dis[i].disciplina
        }
        else if (i == dis.length - 2) {
          concat = concat + dis[i].disciplina
        }
        else {
          concat = concat + dis[i].disciplina + ', '
        }
      }
    }

    return concat
  }

  ngOnDestroy() {
    this.Disciplinas = [];
  }

}
