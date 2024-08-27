import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpParams, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { httpRequest } from './interceptor/httpRequest.interceptor';
// import { AgGridAngular } from '@ag-grid-community/angular';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideToastr(), provideAnimationsAsync(),HttpParams,provideHttpClient(
    withFetch(),withInterceptors([httpRequest]))]
};
