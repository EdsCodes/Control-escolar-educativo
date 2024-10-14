import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/users';
import { RootState } from '../../../core/store';
import { Store } from '@ngrx/store';
import { selectAutenticatedUser } from '../../../core/store/autentication/autentication.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  autenticatedUser$: Observable<User | null>
user: any;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private store: Store<RootState>
  ) {   
    this.autenticatedUser$ = this.store.select(selectAutenticatedUser);
  }

  logout() {
    this.authService.logout();
  }

  navigateTo(route: string) {
    this.router.navigate([`/dashboard/${route}`]);
  }
}
