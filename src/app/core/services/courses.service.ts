import { Injectable } from '@angular/core';
import { delay, elementAt, map, Observable, of } from 'rxjs';
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
    return of(this.MY_COURSESDATABASE).pipe(
      delay(500)
    );
  }

  addCourses(newCourse: courses): Observable<courses[]> {
    this.MY_COURSESDATABASE.push(newCourse);
    return of(this.MY_COURSESDATABASE);
  }

  deleteCourseById(idCurso: string): Observable<courses[]> {
    this.MY_COURSESDATABASE = this.MY_COURSESDATABASE.filter(element => element.idCurso !== idCurso);
    return this.getAllCourses();
  }

  editCoursesById(idCurso: string, update: courses) {
    this.MY_COURSESDATABASE = this.MY_COURSESDATABASE.map((element) =>
      element.idCurso === idCurso ? { ...update, idCurso } : element
    );
    return this.getAllCourses();
  }

  getCourseById(idCurso: string): Observable<courses | undefined> {
    return this.getAllCourses().pipe(
      map((allTheCourses) => allTheCourses.find((element) => element.idCurso === idCurso))
    );
  }
  
}