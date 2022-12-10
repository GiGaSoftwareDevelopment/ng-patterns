import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';

// NGMODULE ARCHITECTURE
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// STANDALONE COMPONENT ARCHITECTURE
import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouter, Route} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

// In the main application:
export const ROUTES: Route[] = [
  {
    path: 'charts',
    loadChildren: () =>
      import('@uiux/charts/routes').then(mod => mod.CHART_ROUTES)
  },
  {
    path: 'components',
    loadChildren: () =>
      import('@uiux/component/routes').then(mod => mod.COMPONENT_ROUTES)
  },
  {
    path: 'rxjs',
    loadChildren: () => import('@uiux/rxjs/routes').then(mod => mod.RXJS_ROUTES)
  }
  // ...
];

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({}, {}),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    provideRouter(ROUTES),
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
