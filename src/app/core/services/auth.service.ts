import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

  login() {
    this.getObservableUser().subscribe({
      next: (user) => {
        console.log(user)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log("Sesion iniciada correctamente")
      }
    })
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



