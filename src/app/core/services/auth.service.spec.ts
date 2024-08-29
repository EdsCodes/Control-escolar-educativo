import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';  
import { Router } from '@angular/router';
import { NotificationService } from './notifications.service';
import { User } from '../../shared/models/users';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  let notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showErrorNotification']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        HttpClient
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login', () => {
    it('should authenticate the user and navigate to the Home page', () => {
      const mockUser: User = {
        id: '1', firstName: 'User', lastName: 'Fake', email: 'test@test.com', password: '123456', token: 'abcd1234', role: 'USER',
      };

      const loginData = { email: 'test@test.com', password: '123456' };

      service.login(loginData);

      const req = httpMock.expectOne(`${environment.apiUrl}/users?email=${loginData.email}&password=${loginData.password}`);
      expect(req.request.method).toBe('GET');
      req.flush([mockUser]);

      expect(localStorage.getItem('token')).toBe(mockUser.token);

      service.autenticatedUser.subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard', 'home']);
    });

    it('should show an alert when the user is not found', () => {
      spyOn(window, 'alert');
      const loginData = { email: 'notfound@test.com', password: 'wrongpassword' };

      service.login(loginData);

      const req = httpMock.expectOne(`${environment.apiUrl}/users?email=${loginData.email}&password=${loginData.password}`);
      req.flush([]);

      expect(window.alert).toHaveBeenCalledWith('Datos de usuario inválidos, por favor verifique');
    });
  });

  describe('#logout', () => {
    it('should clear the token and navigate to the login page', () => {
      localStorage.setItem('token', 'abcd1234');
      service.logout();

      expect(localStorage.getItem('token')).toBeNull();

      service.autenticatedUser.subscribe(user => {
        expect(user).toBeNull();
      });

      expect(routerSpy.navigate).toHaveBeenCalledWith(['auth', 'login']);
    });
  });

  describe('#verifyToken', () => {
    it('should return true if token is valid', () => {
      const mockUser: User = {
        id: '1', firstName: 'User', lastName: 'Fake', email: 'test@test.com', password: '123456', token: 'abcd1234', role: 'USER',
      };

      localStorage.setItem('token', 'abcd1234');

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeTrue();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users?token=abcd1234`);
      req.flush([mockUser]);

      expect(localStorage.getItem('token')).toBe(mockUser.token);

      service.autenticatedUser.subscribe(user => {
        expect(user).toEqual(mockUser);
      });
    });

    it('should return false when the token is invalid', () => {
      localStorage.setItem('token', 'invalidtoken');

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users?token=invalidtoken`);
      req.flush([]);

      service.autenticatedUser.subscribe(user => {
        expect(user).toBeNull();
      });
    });

    it('should return false and show an error notification when there is an API error', () => {
      localStorage.setItem('token', 'abcd1234');

      service.verifyToken().subscribe((isValid) => {
        expect(isValid).toBeFalse();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/users?token=abcd1234`);
      req.error(new ErrorEvent('Network error'));

      expect(notificationServiceSpy.showErrorNotification).toHaveBeenCalledWith('Error al verificar el token, comuniquese con su admin.');
    });
  });
});