import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';
import { CourseDetailComponent } from './detailedComponent/course-detail/course-detail.component';
import { SharedModule } from '../../../shared/modules/shared-module/shared.module';


@NgModule({
  declarations: [
    CoursesComponent,
    DialogsCoursesComponent,
    CourseDetailComponent
  ],
  exports: [
    CoursesComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }