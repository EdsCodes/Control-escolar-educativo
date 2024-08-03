import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { courses } from '../../shared/models/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private MY_COURSESDATABASE: courses[] = [
    { idCurso: '1', nombreCurso: 'React', fechaInicioCurso: '08-15-2024', fechaFinCurso: '01-20-2025' },
    { idCurso: '2', nombreCurso: 'Angular', fechaInicioCurso: '09-15-2024', fechaFinCurso: '02-20-2025' },
    { idCurso: '3', nombreCurso: 'Js', fechaInicioCurso: '10-15-2024', fechaFinCurso: '03-20-2025' },
    { idCurso: '4', nombreCurso: 'CSS', fechaInicioCurso: '11-15-2024', fechaFinCurso: '04-20-2025' },
    { idCurso: '5', nombreCurso: 'SQL', fechaInicioCurso: '12-15-2024', fechaFinCurso: '05-20-2025' },
  ];

  getAllCourses(): Observable<courses[]> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.MY_COURSESDATABASE);
        observer.complete();
      }, 500);
    });
  }

  addCourses(course: courses): Observable<courses[]> {
    this.MY_COURSESDATABASE.push(course);
    return this.getAllCourses();
  }

  deleteCourseById(idCurso: string): Observable<courses[]> {
    this.MY_COURSESDATABASE = this.MY_COURSESDATABASE.filter(el => el.idCurso !== idCurso);
    return this.getAllCourses();
  }

  editCoursesById(idCurso: string, update: courses) {
    const index = this.MY_COURSESDATABASE.findIndex(course => course.idCurso === idCurso);
    if (index !== -1) {
      this.MY_COURSESDATABASE[index] = { ...this.MY_COURSESDATABASE[index], ...update };
    }
    return this.getAllCourses();
  }
  
}