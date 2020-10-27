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
  @ViewChild('filter') filter: ElementRef<OrderListModule>;
  lista: ElementRef<any>
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
  focus(){
    if(this.filter['filterValue']==''){
      this.lista= this.filter['listViewChild']
      this.lista.nativeElement.style.display='none'
    }
    else{
      this.lista= this.filter['listViewChild']
      this.lista.nativeElement.style.display='inline'
    }
      

  }

}
