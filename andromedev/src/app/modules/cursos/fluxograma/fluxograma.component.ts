import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import {CursosService} from '../../../core/services/cursos/cursos.service'
@Component({
  selector: 'app-fluxograma',
  templateUrl: './fluxograma.component.html',
  styleUrls: ['./fluxograma.component.css']
})
export class FluxogramaComponent implements OnInit {

  inscricao: Subscription;
  Disciplinas=[]
  curso:string
  Periodo=[]

  itemsPerSlide = 4;
  singleSlideOffset = true;
  noWrap = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private Cursos: CursosService) { 
    }
  ngOnInit() {
    this.Cursos.getDisciplina().then(e=> {
      this.curso=e.curso
      this.Periodo=e.disciplinas.map(p=>{
        return p.semestre
      })
      this.Periodo=this.Periodo.filter(p=>{
        return p!=null
      })
      this.Periodo=[...new Set(this.Periodo)]
    })
  }
  viewPeriod(periodo){
    this.router.navigate([`${this.curso}/fluxograma`,periodo]);
  }

  ngOnDestroy(){
    this.Disciplinas=[];
  }

}
