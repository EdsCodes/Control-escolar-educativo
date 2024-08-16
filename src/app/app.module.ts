import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
    MatProgressBar
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}