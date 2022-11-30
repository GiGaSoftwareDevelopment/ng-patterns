import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

// NGMODULE ARCHITECTURE
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';

// STANDALONE COMPONENT ARCHITECTURE
import {bootstrapApplication} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({}, {}),
    provideEffects([]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    provideRouter([])
  ]
}).catch((err) => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
