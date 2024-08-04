import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CoursesModule } from './courses/courses.module';
import { MatListModule } from '@angular/material/list';
import { StudentsModule } from './students/students.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    CoursesModule,
    StudentsModule,
    InscriptionsModule
]
})
export class DashboardModule { }