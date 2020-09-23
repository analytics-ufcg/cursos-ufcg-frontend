import { HttpClient } from '@angular/common/http';
import { Curso } from '../interface/cursos.interface'
import {Observable} from 'rxjs'
import{Injectable} from '@angular/core'
import {Disciplina} from '../interface/disciplina.interface'

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private url='http://analytics.ufcg.edu.br/pre/'
  constructor(private http: HttpClient){}

  getCursos():Observable<Curso[]>{
      return this.http.get<Curso[]>(`${this.url}cursos_2015`)
  }
  async getDisciplina(disciplina_schema) {   
    const urlDisciplina =  `${this.url}${disciplina_schema}/disciplinas`
    const disciplina = await (await this.http.get<Disciplina[]>(urlDisciplina).toPromise())
    
    return disciplina
}
}
