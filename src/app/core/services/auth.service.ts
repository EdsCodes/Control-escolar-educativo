import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() {}

    login () {
      console.log(this.getAuthentifyUser());
      this.getAuthentifyUser().then(())
    }
    
    verifyToken () {}

    getAuthentifyUser (): Promise<any>{
      return new Promise((resolve, reject) => {
        reject('error')
        setTimeout (() => {
          resolve({
            name: 'false name',
            email: 'fake@gmail.com'
          });
        }, 2000);
      });

    }
}
