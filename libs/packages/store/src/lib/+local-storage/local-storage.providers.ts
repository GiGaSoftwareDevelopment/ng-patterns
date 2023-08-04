import { provideStore } from '@ngrx/store';
import * as fromLocalStorageReducer from './local-storage.reducer';
import { provideEffects } from '@ngrx/effects';
import { ngPatLocalStoragesFeatureKey } from './local-storage.model';
import { NgPatLocalStorageEffects } from './local-storage.effects';


export const localStorageProviders = [
  provideStore(
    {
      [ngPatLocalStoragesFeatureKey]: fromLocalStorageReducer.localStorageReducer,
    },
    {
      initialState: {
        [ngPatLocalStoragesFeatureKey]: fromLocalStorageReducer.ngPatIInitialLocalStorageState,
      },
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }
  ),
  provideEffects([NgPatLocalStorageEffects])
]
