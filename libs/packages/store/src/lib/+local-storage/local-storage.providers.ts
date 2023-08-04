import * as fromLocalStorageReducer from './local-storage.reducer';
import { ngPatLocalStoragesFeatureKey } from './local-storage.model';
import { NgPatLocalStorageEffects } from './local-storage.effects';

export const provideLocalStorageReducer ={
  [ngPatLocalStoragesFeatureKey]: fromLocalStorageReducer.localStorageReducer,
}

export const provideLocalStorageInitialState = {
  [ngPatLocalStoragesFeatureKey]: fromLocalStorageReducer.ngPatIInitialLocalStorageState,
}

export const provideLocalStorageEffects = [NgPatLocalStorageEffects];


