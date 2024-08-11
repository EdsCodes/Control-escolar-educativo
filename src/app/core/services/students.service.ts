import { Injectable } from '@angular/core';
import { students } from '../../shared/models/students';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  
  constructor(private httpclient: HttpClient) {}

  getAllStudents(): Observable<students[]> {
    return this.httpclient.get<students[]>(`${environment.apiUrl}/students`);   
  }

  addStudents(student: students): Observable<students>{
    return this.httpclient.post<students>(`${environment.apiUrl}/students`, student);  }
  
  deleteStudentsById(id: string): Observable<students>{
    return this.httpclient.delete<students>(`${environment.apiUrl}/students/${id}`)
  }

  editStudentsById(id: string, update: students): Observable<students> {
    return this.httpclient.put<students>(`${environment.apiUrl}/students/${id}`, update);
  }

  getStudentById(id: string): Observable<students | undefined> {
    return this.getAllStudents().pipe(
      map((allTheStudents) => allTheStudents.find((element) => element.id === id))
    );
  }
}