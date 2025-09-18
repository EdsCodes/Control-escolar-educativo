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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { rootReducer } from './core/store';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { FirebaseOptions } from 'firebase/app';

export function getFirebaseConfig(): FirebaseOptions {
  return environment.firebaseConfig;
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(rootReducer, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    AngularFireModule.initializeApp(getFirebaseConfig())
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables()),
    provideAuth(() => getAuth())
  ],
})
export class AppModule {}