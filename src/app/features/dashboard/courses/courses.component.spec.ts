import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CoursesService } from '../../../core/services/courses.service';

describe('prueba sobre el CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let mockCoursesService: jasmine.SpyObj<CoursesService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockCoursesService = jasmine.createSpyObj('CoursesService', ['getAllCourses']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['autenticatedUser'], {
      autenticatedUser: of(null),
    });

    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: CoursesService, useValue: mockCoursesService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('prueba sobre la creacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('llamado de loadingCourses a traves de ngOnInit', () => {
    spyOn(component, 'loadingCourses');
    component.ngOnInit();
    expect(component.loadingCourses).toHaveBeenCalled();
  });
});
