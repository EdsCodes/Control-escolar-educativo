import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../../shared/modules/shared-module/shared.module';
import { CoursesGrapchicsComponent } from './graphics/courses-grapchics/courses-grapchics.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CoursesGrapchicsComponent,
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
    SharedModule,
]
})
export class DashboardModule { }