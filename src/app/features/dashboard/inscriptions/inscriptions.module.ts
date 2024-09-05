import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from '../inscriptions/inscriptions.component';
import { DialogsInscriptionsComponent } from './components/dialogs-inscriptions/dialogs-inscriptions.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { SharedModule } from '../../../shared/modules/shared-module/shared.module';
import { InscriptionDetailComponent } from './detailedComponent/inscription-detail/inscription-detail.component';

@NgModule({
  declarations: [
    InscriptionsComponent,
    DialogsInscriptionsComponent,
    InscriptionDetailComponent,
  ],
  exports: [InscriptionsComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    MatCardModule,
    ReactiveFormsModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects]),
  ]
})
export class InscriptionsModule { }
