import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/users';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  autenticatedUser: Observable<User | null>

  constructor(private authService: AuthService) {
    this.autenticatedUser = this.authService.autenticatedUser;
  } 

  logout() {
    this.authService.logout();
  }
}

