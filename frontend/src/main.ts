import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { fluentButton, fluentCard, fluentTextField, provideFluentDesignSystem } from "@fluentui/web-components";


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

provideFluentDesignSystem().register(fluentCard(), fluentButton(), fluentTextField());
