import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  defaultOneTimeLoginIdConfig,
  FIREBASE_AUTH_CONFIG,
  ONE_TIME_LOGIN_ID_CONFIG
} from '@ngpat/material/firebaseui';
import { firebaseAuthConfig } from '../environments/firebase-auth';
import {
  createDefaultFirebaseConfig,
  createNgPatFirebaseAppInstance,
  NG_PAT_FIREBASE_INSTANCE,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { environment } from '../environments/environment';
import {
  NG_PAT_LOCAL_STORAGE_CONFIGURATION,
  NG_PAT_FIREBASE_ROOT_EFFECTS,
  NG_PAT_FIREBASE_ROOT_REDUCERS,
  NG_PAT_FIREBASE_ROOT_STATE_INITIALIZERS
} from '@ngpat/store';
import { ROUTES } from '../routes';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { WINDOW_PROVIDERS } from '@ngpat/utils';
export const appConfig: ApplicationConfig = {
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
      provide: NG_PAT_FIREBASE_INSTANCE,
      useValue: createNgPatFirebaseAppInstance(
        createDefaultFirebaseConfig(environment.firebaseConfig)
      )
    },
    NgPatFirestoreService,
    provideStore(NG_PAT_FIREBASE_ROOT_REDUCERS, {
      initialState: {
        ...NG_PAT_FIREBASE_ROOT_STATE_INITIALIZERS
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
    provideEffects([...NG_PAT_FIREBASE_ROOT_EFFECTS]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    }),
    provideRouter(ROUTES),
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(MatDialogModule),
    {
      provide: NG_PAT_LOCAL_STORAGE_CONFIGURATION,
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
};
