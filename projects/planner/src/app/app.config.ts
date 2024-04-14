import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { PlannerService } from './shared/services/planner.service';
import { environment } from '../environments/environment';
import { PlannerServiceMock } from './shared/mock/planner.service.mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    importProvidersFrom(HttpClientModule),
    {
      provide: PlannerService,
      useClass: environment.mocked ? PlannerServiceMock : PlannerService,
    },
  ],
};
