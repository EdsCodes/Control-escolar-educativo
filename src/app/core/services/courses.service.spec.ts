import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { courses } from '../../shared/models/courses';
import { environment } from '../../../environments/environment.development';

describe('Prueba del servicio CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/courses`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Prueba al obtener los cursos de la RestApi', () => {
    const mockCourses: courses[] = [{ id: '1', nombreCurso: 'Angular', fechaInicioCurso: '2023-01-01', fechaFinCurso: '2023-06-01' }];

    service.getAllCourses().subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });
});
