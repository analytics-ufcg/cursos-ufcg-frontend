import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {CursosService as Cursos} from '../../core/services/cursos/cursos.service'
import { Router } from '@angular/router';
import {OrderListModule} from 'primeng/orderlist';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filter=false
  lista:any[]
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
  focus(evento){
    if(evento==''){
      this.lista=[]
      this.filter=false
    }
    else{
      this.lista = this.Curso.filter(e=>{
        const nome= e.nome_comum.toLowerCase()
         return nome.indexOf(evento)!=-1
      })
      if(this.lista.length==0){
        this.filter=false
      }
      else{
        this.filter=true
      }
    }
     }

}
