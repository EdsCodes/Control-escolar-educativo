import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { User } from '../../shared/models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { NotificationService } from './notifications.service';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { setAutenticatedUser, unsetAutenticateduser } from '../store/autentication/autentication.actions';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  private _autenticatedUser = new BehaviorSubject<User | null>(null);
  autenticatedUser = this._autenticatedUser.asObservable();

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private notifier: NotificationService,
    private store: Store<RootState>
  ) {}

  login(data: {email: string; password: string}) {
    this.http
      .get<User[]>(`${environment.apiUrl}/users`, {
        params: {
          email: data.email,
          password: data.password
        },
      })
      .subscribe({
        next: (response) => {
          if (!response.length) {
            this.notifier.showErrorNotification('Datos de usuario inválidos, por favor verifique');
          } else {
            const autenticatedUser = response[0];
            localStorage.setItem('token', autenticatedUser.token); 
            this.store.dispatch(setAutenticatedUser({ payload: autenticatedUser }));
            this.router.navigate(['dashboard', 'home']);
          }
        },
        error: (err) => {
          this.notifier.showErrorNotification('Error al conectarse a la API, comuníquese con su administrador');
        }
      });
  }
  
  logout() {
    localStorage.removeItem('token'),
    this.store.dispatch(unsetAutenticateduser());
    this.router.navigate(['auth', 'login']);
  }
  
  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.http
      .get<User[]>(`${environment.apiUrl}/users`, {
        params: { 
          token 
        },
      })
      .pipe(
        map((response) => {
          if (!response.length) {
            return false;
          } else {
            const autenticatedUser = response[0];
            localStorage.setItem('token', autenticatedUser.token); 
            this.store.dispatch(setAutenticatedUser({ payload: autenticatedUser }));
            return true;
          }
        }),
        catchError(() => {
          this.notifier.showErrorNotification('Error al verificar el token');
          return of(false);
      })
    );
  }
}