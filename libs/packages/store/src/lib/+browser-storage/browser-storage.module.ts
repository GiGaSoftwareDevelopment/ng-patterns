import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgPatBrowserStorageEffects} from './browser-storage.effects';
import * as fromBrowserStorageReducer from './browser-storage.reducer';
import {ngPatBrowserStoragesFeatureKey} from './browser-storage.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      ngPatBrowserStoragesFeatureKey,
      fromBrowserStorageReducer.browserStorageReducer,
      {
        initialState: fromBrowserStorageReducer.ngPatIInitialBrowserStorageState
      }
    ),
    EffectsModule.forFeature([NgPatBrowserStorageEffects])
  ],
  providers: []
})
export class BrowserStorageModule {}
