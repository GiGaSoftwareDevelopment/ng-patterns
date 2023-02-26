import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

// NGMODULE ARCHITECTURE
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
// STANDALONE COMPONENT ARCHITECTURE
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ROUTES } from './routes';
import {
  BROWSER_STORAGE_CONFIGURATION,
  NGPAT_FIREBASE_ROOT_EFFECTS,
  UIUX_FIREBASE_ROOT_REDUCERS,
  UIUX_FIREBASE_ROOT_STATE_INITIALIZERS
} from '@ngpat/store';
import { FIREBASE_APP_TOKEN } from '@ngpat/firebase';

if (environment.production) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [

    {
      provide: FIREBASE_APP_TOKEN,
      useValue: environment.firebaseConfig
    },
    provideStore(UIUX_FIREBASE_ROOT_REDUCERS, {
      initialState: {
        ...UIUX_FIREBASE_ROOT_STATE_INITIALIZERS
      }
    }),
    provideEffects([...NGPAT_FIREBASE_ROOT_EFFECTS]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    provideRouter(ROUTES),
    provideHttpClient(),
    provideAnimations(),



    {
      provide: BROWSER_STORAGE_CONFIGURATION,
      useValue: {
        enableEncryption: true,
        encryptionKey: 'foo',
        excludeKeys: []
      }
    }
  ]
}).catch(err => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
