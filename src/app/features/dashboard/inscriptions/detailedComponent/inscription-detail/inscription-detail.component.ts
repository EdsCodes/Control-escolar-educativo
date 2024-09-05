import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { inscriptions } from '../../../../../shared/models/inscriptions';
import { InscriptionsService } from '../../../../../core/services/inscriptions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription-detail',
  templateUrl: './inscription-detail.component.html',
  styleUrl: './inscription-detail.component.scss'
})
export class InscriptionDetailComponent {
  inscription$: Observable<inscriptions | undefined>;

  constructor(private inscriptionsService: InscriptionsService, private activatedRoute: ActivatedRoute){
    this.inscription$  = this.inscriptionsService.getInscriptionById(this.activatedRoute.snapshot.params['id']);
  }
}


// import { Component } from '@angular/core';
// import { Observable } from 'rxjs';
// import { courses } from '../../../../../shared/models/courses';
// import { CoursesService } from '../../../../../core/services/courses.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-course-detail',
//   templateUrl: './course-detail.component.html',
//   styleUrls: ['./course-detail.component.scss']
// })
// export class CourseDetailComponent {
//   course$: Observable<courses | undefined>;

//   constructor(private coursesService: CoursesService, private activatedRoute: ActivatedRoute) {
//     this.course$ = this.coursesService.getCourseById(this.activatedRoute.snapshot.params['id']);
//   }
// }