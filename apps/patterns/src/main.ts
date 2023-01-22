import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';

// NGMODULE ARCHITECTURE
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
// STANDALONE COMPONENT ARCHITECTURE
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter, Route } from '@angular/router';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HomeComponent } from './app/components/home/home.component';
import { ROUTES } from './routes';
import { BROWSER_STORAGE_CONFIGURATION } from '@uiux/store';

if (environment.production) {
  enableProdMode();
}



bootstrapApplication(AppComponent, {
  providers: [
    // Needed for NgRX Store to work
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot([])
    ),
    provideStore({}, {}),
    provideEffects([]),
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
