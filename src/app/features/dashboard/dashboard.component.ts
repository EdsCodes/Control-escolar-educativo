import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/users';
import { RootState } from '../../core/store';
import { Store } from '@ngrx/store';
import { selectAutenticatedUser } from '../../core/store/autentication/autentication.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  autenticatedUser: Observable<User | null>

  constructor(
    private authService: AuthService,
    private store: Store<RootState>
  ) {
    this.autenticatedUser = this.store.select(selectAutenticatedUser);
  } 

  logout() {
    this.authService.logout();
  }
}

