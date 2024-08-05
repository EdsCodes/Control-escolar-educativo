import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { courses } from '../../../../../shared/models/courses';
import { CoursesService } from '../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  course$: Observable<courses | undefined>;

  constructor(private coursesService: CoursesService, private activatedRoute: ActivatedRoute) {
    this.course$ = this.coursesService.getCourseById(this.activatedRoute.snapshot.params['idCurso']);
  }
}