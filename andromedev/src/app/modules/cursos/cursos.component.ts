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
  minhaGrade(){
    console.log('oi')
    this.router.navigate(['minha-grade']);
  }
  requisitos(){
    this.router.navigate(['requisitos']);
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }
}
