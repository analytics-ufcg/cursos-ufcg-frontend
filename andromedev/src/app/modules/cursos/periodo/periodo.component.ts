import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { Subscription } from 'rxjs';

import {CursosService} from '../../../core/services/cursos/cursos.service'

@Component({
  selector: 'periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  inscricao: Subscription;
  @Input('periodo') Disciplinas
  @Output() disciplinasLocalizar = new EventEmitter();

  ngOnInit(): void {
        
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
  localizar(disciplinas){
    this.Disciplinas.forEach(e=>{
      e.localizar=false
    })
    this.disciplinasLocalizar.emit(disciplinas)
  }

}
