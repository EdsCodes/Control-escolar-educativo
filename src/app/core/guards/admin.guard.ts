import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {

  const authservice = inject(AuthService);
  const router = inject(Router);

  return authservice.autenticatedUser.pipe(
    map((autenticatedUser) => 
      autenticatedUser?.role !== 'ADMIN'
        ? router.createUrlTree(['dashboard', 'home'])
        : true
    )
  );
};
