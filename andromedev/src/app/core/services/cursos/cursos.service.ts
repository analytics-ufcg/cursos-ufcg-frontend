import { HttpClient } from '@angular/common/http';
import { Curso } from '../../../shared/models/cursos.interface'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Disciplina } from '../../../shared/models/disciplina.interface'

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  disciplinas=[]
  private url = 'http://analytics.ufcg.edu.br/pre/'
  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}cursos_2015`)
  }

  async Disciplina(disciplina_schema) {
    const urlDisciplina = `${this.url}${disciplina_schema}/disciplinas`
    this.disciplinas = await (await this.http.get<Disciplina[]>(urlDisciplina).toPromise()).sort(this.compare)

  }

  async getDisciplina(){
    return this.disciplinas
  }

  compare(a,b){
    if (a.periodo < b.periodo)
     return -1;
  if (a.periodo > b.periodo)
    return 1;
  return 0;
}
}
