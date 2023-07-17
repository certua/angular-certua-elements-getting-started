import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app-routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
