import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app-routes';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { NgIdleModule } from '@ng-idle/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, NgIdleModule.forRoot()),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideOAuthClient(),
  ],
}).catch((err) => console.error(err));
