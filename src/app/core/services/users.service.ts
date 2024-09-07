import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/models/users';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/users`)
  }

  addUsers(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, user);
  }

  deleteUserById(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${environment.apiUrl}/users/${id}`)
  }

  editUserById(id: string, update: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiUrl}/users/${id}`, update);
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.getAllUsers().pipe(
      map((allTheUsers) => allTheUsers.find((element) => element.id === id))
    );
  }
}
