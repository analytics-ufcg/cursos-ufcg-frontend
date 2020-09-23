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
}
