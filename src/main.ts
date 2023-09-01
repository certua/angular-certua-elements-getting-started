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

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule
      // RouterModule.forRoot(routes, {
      //   scrollOffset: [0, 100],
      //   anchorScrolling: 'enabled',
      // })
    ),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
      })
    ),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
