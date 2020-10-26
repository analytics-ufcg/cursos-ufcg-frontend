import { Component, OnInit } from '@angular/core';
import {CursosService as Cursos} from '../../core/services/cursos/cursos.service'
import { Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  Curso=[];
  voltar:boolean=true
  
  constructor( private Cursos:Cursos,private router: Router) { }

  ngOnInit(): void {
    this.Cursos.getCursos().subscribe(data => this.Curso=data)
  }
  getDisciplina(curso:string){
      this.Cursos.Disciplina(curso)
      this.router.navigate([``,curso,'fluxograma']);
  }

}
