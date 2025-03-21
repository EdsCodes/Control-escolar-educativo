import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/modules/shared-module/shared.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MatProgressBar } from '@angular/material/progress-bar';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './core/store';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'; 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    MatProgressBar,
    StoreModule.forRoot(rootReducer, {}), 
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    BaseChartDirective,

    AngularFireModule.initializeApp({
      apiKey: import.meta.env['VITE_FIREBASE_API_KEY'],
      authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'],
      projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'],
      storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'],
      messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
      appId: import.meta.env['VITE_FIREBASE_APP_ID']
    }),
    AngularFireAuthModule,  
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}