import { HttpClient } from '@angular/common/http';
import { Curso } from '../../../shared/models/cursos.interface'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';
import { Disciplina } from '../../../shared/models/disciplina.interface'

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  disciplinas=[]
  curso:string
  periodo=[]
  private url = 'http://analytics.ufcg.edu.br/pre/'
  private periodoSubject = new Subject<number>();
  private requisitoSubject = 0
  currentPeriodo = this.periodoSubject.asObservable();

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}cursos_2015`)
  }

   Disciplina(disciplina_schema) {
    this.curso=disciplina_schema
    this.getDisciplina()
  }

  async  getDisciplina(){
    const urlDisciplina = `${this.url}${this.curso}/disciplinas`
    this.disciplinas = await (await this.http.get<Disciplina[]>(urlDisciplina).toPromise()).sort(this.compare)
    return {

      disciplinas:this.disciplinas,
      curso:this.curso,
      requisito:this.requisitoSubject
    }
  }

  changePeriodo(periodo:number) {
    this.periodoSubject.next(periodo)
  }
  changeRequisito(requisito:number){
    this.requisitoSubject=requisito
  }
  obterPeriodo(){
    return this.currentPeriodo
  }
  
  getPos(codigo){
    const pos = codigo.map(p =>{
      const cadeira = this.disciplinas.filter(e =>{
         return e.codigo_disciplina==p
      })
      return cadeira
    })
    return pos.flat()
  }
  getPre(codigo){
    const pre = codigo.map(p =>{
      const cadeira = this.disciplinas.filter(e =>{
         return e.codigo_disciplina==p
      })
      return cadeira
    })
    return pre.flat()

  }
  compare(a,b){
    if (a.periodo < b.periodo)
     return -1;
  if (a.periodo > b.periodo)
    return 1;
  return 0;
}
}
