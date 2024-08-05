import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/autentication/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { CourseDetailComponent } from './features/dashboard/courses/detailedComponent/course-detail/course-detail.component';
import { StudentsComponent } from './features/dashboard/students/students.component';
import { InscriptionsComponent } from './features/dashboard/inscriptions/inscriptions.component';
import { HomeComponent } from './features/dashboard/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        //dashboard/home
        path: 'home',
        component: HomeComponent,
      },
      {
        //dashboard/students
        path: 'students',
        component: StudentsComponent,
      },
      {
        //dashboard/courses
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'course/:idCurso',
        component: CourseDetailComponent,
      },
      {
        //dashboard/inscriptions
        path: 'inscriptions',
        component: InscriptionsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ] 
  },
  {
    path: '**',
    redirectTo: 'dashboard/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
