import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then((archiveReference) => archiveReference.HomeModule),
    },
    {
      path: 'students',
      loadChildren: () => import('./students/students.module').then((archiveReference) => archiveReference.StudentsModule),
    },
    {
      path: 'courses',
      loadChildren: () => import('./courses/courses.module').then((archiveReference) => archiveReference.CoursesModule),
    },   
    {
      path: 'inscriptions',
      loadChildren: () => import('./inscriptions/inscriptions.module').then((archiveReference) => archiveReference.InscriptionsModule),
    },
    {
      path: 'users',
      canActivate: [adminGuard],
      loadChildren: () => import('./users/users.module').then((archiveReference) => archiveReference.UsersModule),
    },
    {
      path: '**',
      redirectTo: '/dashboard/home',
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
