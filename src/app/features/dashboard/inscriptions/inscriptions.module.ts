import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { DialogsInscriptionsComponent } from './components/dialogs-inscriptions/dialogs-inscriptions.component';
import { SharedModule } from '../../../shared/modules/shared-module/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from '../inscriptions/store/inscriptions.reducer';
 

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
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects]),
  ]
})
export class InscriptionsModule { }
