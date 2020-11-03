import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  curso: any;
  fluxograma:boolean = true
  grade:boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router) { 
    }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.curso = params['curso'];
      }
    );
  }
  active(rota){
    if(rota=='fluxograma'){
      this.fluxograma=true
      this.grade=false
    }
    else{
      this.fluxograma=false
      this.grade=true
    }
  }
  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}
