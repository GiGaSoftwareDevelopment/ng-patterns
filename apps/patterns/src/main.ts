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
import {provideRouter} from '@angular/router';
import {provideEffects} from '@ngrx/effects';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ROUTES} from './routes';
import {
  BROWSER_STORAGE_CONFIGURATION,
  NGPAT_FIREBASE_ROOT_EFFECTS,
  NGPAT_FIREBASE_ROOT_REDUCERS,
  NGPAT_FIREBASE_ROOT_STATE_INITIALIZERS
} from '@ngpat/store';
import {FIREBASE_APP_TOKEN} from '@ngpat/firebase';
import {WINDOW_PROVIDERS} from '@ngpat/utils';
import {
  defaultOneTimeLoginIdConfig,
  FIREBASE_AUTH_CONFIG,
  ONE_TIME_LOGIN_ID_CONFIG
} from '@ngpat/material/firebaseui';
import {firebaseAuthConfig} from './environments/firebase-auth';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {addProviderToModule} from '@nrwl/angular/src/utils/nx-devkit/ast-utils';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    ...WINDOW_PROVIDERS,
    {
      provide: FIREBASE_AUTH_CONFIG,
      useValue: firebaseAuthConfig
    },
    {
      provide: ONE_TIME_LOGIN_ID_CONFIG,
      useValue: defaultOneTimeLoginIdConfig('https://foo.com')
    },
    {
      provide: FIREBASE_APP_TOKEN,
      useValue: environment.firebaseConfig
    },
    provideStore(NGPAT_FIREBASE_ROOT_REDUCERS, {
      initialState: {
        ...NGPAT_FIREBASE_ROOT_STATE_INITIALIZERS
      },
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
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
        encryptionKey: 'foo', // for demo only
        excludeKeys: []
      }
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        // lineNumbersLoader: () => import('highlightjs-line-numbers.js/src/highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
          xml: () => import('highlight.js/lib/languages/xml'),
          bash: () => import('highlight.js/lib/languages/bash')
        },
        themePath: 'assets/tokyo-night-dark.css' // Optional, and useful if you want to change the theme dynamically
      }
    }
  ]
}).catch(err => console.error(err));

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
