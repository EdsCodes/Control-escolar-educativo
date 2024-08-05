import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('token', 'lkjfsd78wqeuirhsnnckivs0sh7sdf');
    this.router.navigate(['dashboard', 'courses']);
  }

  verifyToken() {}

  getObservableUser(): Observable<any>{
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({
          name: 'false name',
          email: 'fake@gmail.com',
          role: 'ADMIN'
        });
      }, 2000);
      observer.complete()
    });
  }
  
}



