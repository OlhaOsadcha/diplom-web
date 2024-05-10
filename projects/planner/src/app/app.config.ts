import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { PlannerServiceMock } from './shared/mock/planner.service.mock';
import { PlannerService } from './shared/services/planner.service';
import { HttpLoaderFactory } from './shared/http-loader-factory/http-loader-factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    ),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en-US',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
        useDefaultLang: true,
        isolate: false,
      })
    ),
    {
      provide: PlannerService,
      useClass: environment.mocked ? PlannerServiceMock : PlannerService,
    },
    provideAnimations(),
  ],
};
