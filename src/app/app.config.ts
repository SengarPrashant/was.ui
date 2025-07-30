import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
      // ✅ Add HTTP interceptor here
    provideHttpClient(
     withInterceptors([AuthInterceptor]), 
     withFetch()
    ),
    provideAnimationsAsync(),
  ],
  
};