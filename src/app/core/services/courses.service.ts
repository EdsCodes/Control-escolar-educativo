import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { courses } from '../../shared/models/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private MY_COURSESDATABASE = [
    { idCurso: '1', nombreCurso: 'React', fechaInicioCurso: '08-15-2024', fechaFinCurso: '01-20-2025'},
    { idCurso: '2', nombreCurso: 'Angular', fechaInicioCurso: '09-15-2024', fechaFinCurso: '02-20-2025'},
    { idCurso: '3', nombreCurso: 'Js', fechaInicioCurso: '10-15-2024', fechaFinCurso: '03-20-2025'},
    { idCurso: '4', nombreCurso: 'CSS', fechaInicioCurso: '11-15-2024', fechaFinCurso: '04-20-2025'},
    { idCurso: '5', nombreCurso: 'SQL', fechaInicioCurso: '12-15-2024', fechaFinCurso: '05-20-2025'},
  ]

  getCourses(): Observable<courses[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.MY_COURSESDATABASE);
        observer.complete();
      }, 1500);
    });
  }
}