import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from '../../shared/models/users';

describe('prueba sobre el AuthService', () => {
  let service: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  const fakeUser: User = {
    email: 'test@user.com',
    password: 'Kioas#dsd98789**',
    role: 'USER'
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Router, useValue: spy }]
    });
    service = TestBed.inject(AuthService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Loguea el usuario y lo redirige a Dashboard', () => {
    service.login();
    const storedToken = localStorage.getItem('token');
    
    expect(storedToken).not.toBeNull();
    expect(storedToken).toBe(service['CORRECT_TOKEN']);
    expect(service['_autenticatedUser'].value).toEqual(fakeUser);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard', 'home']);
  });
  

  it('hace el log out del usuario y lo lleva al login', () => {
    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(service['_autenticatedUser'].value).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth', 'login']);
  });

  it('verifica que el token sea el correcto', () => {
    localStorage.setItem('token', service['CORRECT_TOKEN']);
    service.verifyToken().subscribe(isCorrect => {
      expect(isCorrect).toBeTrue();
      expect(service['_autenticatedUser'].value).toEqual(fakeUser);
    });
  });

  it('la verificacion del token falla si el token es incorrecto', () => {
    localStorage.setItem('token', 'invalid_token');
    service.verifyToken().subscribe(isCorrect => {
      expect(isCorrect).toBeFalse();
      expect(service['_autenticatedUser'].value).toBeNull();
    });
  });
});
