import { Component } from '@angular/core';
import { students } from '../../../../../shared/models/students';
import { StudentsService } from '../../../../../core/services/students.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrl: './students-detail.component.scss'
})
export class StudentsDetailComponent {
    student$: Observable<students | undefined>;
  
    constructor(private studentsService: StudentsService , private activatedRoute: ActivatedRoute) {
      this.student$ = this.studentsService.getStudentById(this.activatedRoute.snapshot.params['id']);
    }
  }