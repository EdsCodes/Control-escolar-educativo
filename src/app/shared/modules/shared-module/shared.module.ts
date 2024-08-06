import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSizeDirective } from '../../directives/TextSize.directive';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TextSizeDirective],
  exports: [
    TextSizeDirective,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule, 
    MatProgressBarModule,
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
