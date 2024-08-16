import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutenticationRoutingModule } from './autentication-routing.module';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    AutenticationRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
  ]
}) 

export class AutenticationModule {}
