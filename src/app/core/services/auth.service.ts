import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/models/users';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private Fake_User: User = {        
    email: 'test@user.com',
    password: 'Kioas#dsd98789**',
    role: 'ADMIN'
  }
  private CORRECT_TOKEN = 'lkjfsd78wqeuirhsnnckivs0sh7sdf';

  private _autenticatedUser = new BehaviorSubject<User | null>(null);
  autenticatedUser = this._autenticatedUser.asObservable();

  constructor(private router: Router) {}
  
  login() {
    this._autenticatedUser.next(this.Fake_User);
    localStorage.setItem('token', this.CORRECT_TOKEN);
    this.router.navigate(['dashboard', 'home']);
  }

  logout() {
    localStorage.removeItem('token'),
    this._autenticatedUser.next(null);
    this.router.navigate(['auth', 'login']);
  }
  
  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token')
    const isCorrect = this.CORRECT_TOKEN === token; 
    if (isCorrect) {
      this._autenticatedUser.next(this.Fake_User);
    }

    return of(isCorrect);
  }

}



