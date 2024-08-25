import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { inscriptions } from '../../shared/models/inscriptions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Course, loadStudentsAndCoursesResp, Student } from '../store';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  constructor(private http: HttpClient) {}

  getAllInscriptions(): Observable<inscriptions[]> {
    return this.http.get<inscriptions[]>(
      `${environment.apiUrl}/inscriptions?_embed=student&_embed=course`
    );
  }

  getStudentsAndCourses(): Observable<loadStudentsAndCoursesResp> {
    return forkJoin({
      students: this.http.get<Student[]>(`${environment.apiUrl}/students`),
      courses: this.http.get<Course[]>(`${environment.apiUrl}/courses`),
    })
  };

  addInscription(inscription: inscriptions): Observable<inscriptions> {
    return this.http.post<inscriptions>(`${environment.apiUrl}/inscriptions`, inscription);
  }

  deleteInscriptionById(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/inscriptions/${id}`);
  }

  editInscriptionById(id: string, update: inscriptions): Observable<inscriptions> {
    return this.http.put<inscriptions>(`${environment.apiUrl}/inscriptions/${id}`, update);
  }
}
