import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autenticationGuard } from './autentication.guard';

describe('prueba sobre el autenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
