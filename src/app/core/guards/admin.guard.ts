import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAutenticatedUser } from '../store/autentication/autentication.selectors';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const store = inject(Store)

  return store
    .select(selectAutenticatedUser)
    .pipe(
      map((autenticatedUser) => 
        autenticatedUser?.role !== 'ADMIN'
          ? router.createUrlTree(['dashboard', 'home'])
          : true
      )
    );
};
