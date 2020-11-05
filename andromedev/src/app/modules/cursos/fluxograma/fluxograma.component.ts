import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  periodoSelected:number
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
        numScroll: 5
      },
      {
        breakpoint: '100px',
        numVisible: 1,
        numScroll: 1
      },

    ];
  }
  ngOnInit() {
    this.Cursos.obterPeriodo().subscribe(periodo => {
      this.selected(periodo)
  })
    this.Cursos.getDisciplina().then(e => {
      this.curso = e.curso
      const periodos = this.summarizeData(e.disciplinas)
      this.Periodos = periodos.map(e => {
        return {
          periodo: e,
          selected: false,
        }
      })
    })

  }
  summarizeData(dados) {
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
  viewPeriod(periodo) {
    this.router.navigate([`${this.curso}/fluxograma`, periodo]);
  }
  ngOnDestroy() {
    this.Disciplinas = [];
  }

}
