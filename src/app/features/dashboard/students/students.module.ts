import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo.pipe';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { StudentsComponent } from './students.component';
import { SharedModule } from '../../../shared/modules/shared-module/shared.module';
import { StudentsDetailComponent } from './detailedComponent/students-detail/students-detail.component';
import { MatProgressBar } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    StudentsComponent,
    DialogsStudentsComponent,
    NombreCompletoPipe,
    StudentsDetailComponent
  ],
  exports: [StudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    MatProgressBar
  ]
})
export class StudentsModule { }