import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';



const extendedAppConfig={
  ...appConfig,
  providers:[
    ...(appConfig.providers|| []),
    provideHttpClient(withFetch()),
  ],
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
