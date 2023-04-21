import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  NgPatLocalStorageItem,
  ngPatLocalStoragesFeatureKey
} from './local-storage.model';
import * as LocalStorageActions from './local-storage.actions';

export function selectLocalStorageId(a: NgPatLocalStorageItem): string {
  //In this case this would be optional since primary key is id
  return a.key;
}

export interface NgPatLocalStorageState
  extends EntityState<NgPatLocalStorageItem> {
  // additional entities state properties
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PartialLocalStorageState {
  readonly [ngPatLocalStoragesFeatureKey]: NgPatLocalStorageState;
}

export const ngPatLocalStorageAdapter: EntityAdapter<NgPatLocalStorageItem> =
  createEntityAdapter<NgPatLocalStorageItem>({
    selectId: selectLocalStorageId
  });

export const ngPatIInitialLocalStorageState: NgPatLocalStorageState =
  ngPatLocalStorageAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null
  });

export const localStorageReducer = createReducer(
  ngPatIInitialLocalStorageState,
  on(
    LocalStorageActions.ngPatAddLocalStorageItem,
    (state, { localStorageItem }) =>
      ngPatLocalStorageAdapter.addOne(localStorageItem, state)
  ),
  on(
    LocalStorageActions.ngPatSetLocalStorageItem,
    (state, { localStorageItem }) => {
      return ngPatLocalStorageAdapter.setOne(localStorageItem, state);
    }
  ),
  on(
    LocalStorageActions.ngPatAddLocalStorageItems,
    (state, { localStorageItems }) =>
      ngPatLocalStorageAdapter.addMany(localStorageItems, state)
  ),
  on(
    LocalStorageActions.ngPatDoDisconnectAndRemoveLocalStorageItem,
    (state, { id }) =>
      ngPatLocalStorageAdapter.removeOne(id, { ...state, error: null })
  ),
  on(LocalStorageActions.ngPatRemoveLocalStorageItems, (state, { ids }) =>
    ngPatLocalStorageAdapter.removeMany(ids, state)
  ),
  on(
    LocalStorageActions.ngPatLoadLocalStorageItems,
    (state, { localStorageItems }) =>
      ngPatLocalStorageAdapter.setAll(localStorageItems, {
        ...state,
        isLoaded: true,
        isLoading: false
      })
  ),
  on(
    LocalStorageActions.ngPatSetLocalStorageItems,
    (state, { localStorageItems }) => {
      return ngPatLocalStorageAdapter.setMany(localStorageItems, state);
    }
  ),
  on(LocalStorageActions.ngPatClearLocalStorageItems, state =>
    ngPatLocalStorageAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(LocalStorageActions.ngPatLocalStorageError, (state, { message }) => ({
    ...state,
    error: message
  }))
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
