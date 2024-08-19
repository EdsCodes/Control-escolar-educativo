import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../../shared/models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private _autenticatedUser = new BehaviorSubject<User | null>(null);
  autenticatedUser = this._autenticatedUser.asObservable();

  constructor(private http: HttpClient, private router: Router, private notifier: NotificationService) {}

  login(data: {email: string; password: string}) {
    this.http
    .get<User[]>(`${environment.apiUrl}/users`, {
      params: {
        email: data.email,
        password: data.password,
      },
    })
    .subscribe({
      next: (response) =>{
        if (!response.length){
          alert('Datos de usuario inválidos, por favor verifique')
        } else {
          const autenticatedUser = response[0];
          localStorage.setItem('token', autenticatedUser.token);
          this._autenticatedUser.next(autenticatedUser);
          this.router.navigate(['dashboard', 'home']);
        }
      },
      error: (err) => {
        this.notifier.showNotification('Error al conectarse a la API, pongase en contacto con su administrador')
      }
    });
  }

  logout() {
    localStorage.removeItem('token'),
    this._autenticatedUser.next(null);
    this.router.navigate(['auth', 'login']);
  }
  
  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.http.get<User[]>(`${environment.apiUrl}/users`, {
      params: {
        token: token,
      },
    }).pipe(
      map((response) => {
        if (!response.length) {
          return false;
        } else {
          const authenticatedUser = response[0];
          localStorage.setItem('token', authenticatedUser.token);
          this._autenticatedUser.next(authenticatedUser);
          return true;
        }
      }),
      catchError((error) => {
        this.notifier.showNotification('Error al verificar el token, comuniquese con su admin.')
        return of(false)
      })
    );
  }
  
}