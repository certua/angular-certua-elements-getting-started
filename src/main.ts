import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
declare var __webpack_public_path__: string;

__webpack_public_path__ = 'angular';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
