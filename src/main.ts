import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';

import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import {
  provideRouter,
  RouterModule,
  withComponentInputBinding,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { routes } from './app/app-routes';
import { OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { NgIdleModule } from '@ng-idle/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'disabled',
      })
    ),
    importProvidersFrom(BrowserModule, NgIdleModule.forRoot()),
    provideHttpClient(),
    provideOAuthClient(),
  ],
}).catch((err) => console.error(err));
