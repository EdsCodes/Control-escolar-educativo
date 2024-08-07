import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/autentication/autentication.module').then((archiveReference) => archiveReference.AutenticationModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./features/dashboard/dashboard.module').then((archiveReference) => archiveReference.DashboardModule),
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
