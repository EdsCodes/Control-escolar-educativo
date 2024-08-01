import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo.pipe';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { StudentsComponent } from './students.component';

@NgModule({
  declarations: [
    StudentsComponent,
    DialogsStudentsComponent,
    NombreCompletoPipe
  ],
  exports: [StudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule, 
    MatIconModule,
    MatInputModule,
    MatCardModule
  ]
})
export class StudentsModule { }