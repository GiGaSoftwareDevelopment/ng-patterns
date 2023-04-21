import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgPatLocalStorageEffects } from './local-storage.effects';
import * as fromLocalStorageReducer from './local-storage.reducer';
import { ngPatLocalStoragesFeatureKey } from './local-storage.model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      ngPatLocalStoragesFeatureKey,
      fromLocalStorageReducer.localStorageReducer,
      {
        initialState: fromLocalStorageReducer.ngPatIInitialLocalStorageState
      }
    ),
    EffectsModule.forFeature([NgPatLocalStorageEffects])
  ],
  providers: []
})
export class LocalStorageModule {}
