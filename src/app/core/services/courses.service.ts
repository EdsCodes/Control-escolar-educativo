import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { courses } from '../../shared/models/courses';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<courses[]> {
    return this.httpClient.get<courses[]>(`${environment.apiUrl}/courses`);
  }

  addCourses(course: courses): Observable<courses> {
    return this.httpClient.post<courses>(`${environment.apiUrl}/courses`, course);
  }

  deleteCourseById(id: string): Observable<courses> {
    return this.httpClient.delete<courses>(`${environment.apiUrl}/courses/${id}`)
  }

  editCoursesById(id: string, update: courses): Observable<courses> {
    return this.httpClient.put<courses>(`${environment.apiUrl}/courses/${id}`, update);
  }

  getCourseById(id: string): Observable<courses | undefined> {
    return this.getAllCourses().pipe(
      map((allTheCourses) => allTheCourses.find((element) => element.id === id))
    );
  }
}
