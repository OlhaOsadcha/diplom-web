import { HttpBackend } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export function HttpLoaderFactory(httpClient: HttpBackend) {
  return new MultiTranslateHttpLoader(httpClient, [
    {
      prefix: './assets/i18n/core/',
      suffix: '.json',
    },
  ]);
}
