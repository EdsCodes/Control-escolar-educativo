import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { DialogsInscriptionsComponent } from './components/dialogs-inscriptions/dialogs-inscriptions.component';
import { SharedModule } from '../../../shared/modules/shared-module/shared.module';
 

@NgModule({
  declarations: [
    InscriptionsComponent,
    DialogsInscriptionsComponent
  ],
  exports: [InscriptionsComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
  ]
})
export class InscriptionsModule { }
