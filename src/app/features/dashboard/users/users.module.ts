import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../../shared/modules/shared-module/shared.module';
import { DialogsUsersComponent } from './components/dialogs-users/dialogs-users.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    UsersComponent,
    DialogsUsersComponent
  ],exports: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatSelectModule
  ]
})
export class UsersModule { }
