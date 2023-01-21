import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {BrowserStorageEffects} from './browser-storage.effects';
import * as fromBrowserStorageReducer from './browser-storage.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBrowserStorageReducer.browserStoragesFeatureKey,
      fromBrowserStorageReducer.browserStorageReducer,
      {
        initialState: fromBrowserStorageReducer.initialBrowserStorageState
      }
    ),
    EffectsModule.forFeature([BrowserStorageEffects])
  ],
  providers: [
  ]
})
export class BrowserStorageModule {}
