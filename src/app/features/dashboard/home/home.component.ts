import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  autenticatedUser: Observable<User | null>

  constructor(private router: Router, private authService: AuthService) {   
    this.autenticatedUser = this.authService.autenticatedUser;
  }

  navigateTo(route: string) {
    this.router.navigate([`/dashboard/${route}`]);
  }
}
