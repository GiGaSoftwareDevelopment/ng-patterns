import {Action, createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {
  NgPatBrowserStorageItem,
  ngPatBrowserStoragesFeatureKey
} from './browser-storage.model';
import * as BrowserStorageActions from './browser-storage.actions';

export function selectBrowserStorageId(a: NgPatBrowserStorageItem): string {
  //In this case this would be optional since primary key is id
  return a.key;
}

export interface NgPatBrowserStorageState
  extends EntityState<NgPatBrowserStorageItem> {
  // additional entities state properties
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PartialBrowserStorageState {
  readonly [ngPatBrowserStoragesFeatureKey]: NgPatBrowserStorageState;
}

export const ngPatBrowserStorageAdapter: EntityAdapter<NgPatBrowserStorageItem> =
  createEntityAdapter<NgPatBrowserStorageItem>({
    selectId: selectBrowserStorageId
  });

export const ngPatIInitialBrowserStorageState: NgPatBrowserStorageState =
  ngPatBrowserStorageAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null
  });

export const browserStorageReducer = createReducer(
  ngPatIInitialBrowserStorageState,
  on(
    BrowserStorageActions.ngPatAddBrowserStorageItem,
    (state, {browserStorageItem}) =>
      ngPatBrowserStorageAdapter.addOne(browserStorageItem, state)
  ),
  on(
    BrowserStorageActions.ngPatSetBrowserStorageItem,
    (state, {browserStorageItem}) => {
      return ngPatBrowserStorageAdapter.setOne(browserStorageItem, state);
    }
  ),
  on(
    BrowserStorageActions.ngPatAddBrowserStorageItems,
    (state, {browserStorageItems}) =>
      ngPatBrowserStorageAdapter.addMany(browserStorageItems, state)
  ),
  on(
    BrowserStorageActions.ngPatDoDisconnectAndRemoveBrowserStorageItem,
    (state, {id}) =>
      ngPatBrowserStorageAdapter.removeOne(id, {...state, error: null})
  ),
  on(BrowserStorageActions.ngPatRemoveBrowserStorageItems, (state, {ids}) =>
    ngPatBrowserStorageAdapter.removeMany(ids, state)
  ),
  on(
    BrowserStorageActions.ngPatLoadBrowserStorageItems,
    (state, {browserStorageItems}) =>
      ngPatBrowserStorageAdapter.setAll(browserStorageItems, {
        ...state,
        isLoaded: true,
        isLoading: false
      })
  ),
  on(
    BrowserStorageActions.ngPatSetBrowserStorageItems,
    (state, {browserStorageItems}) => {
      return ngPatBrowserStorageAdapter.setMany(browserStorageItems, state);
    }
  ),
  on(BrowserStorageActions.ngPatClearBrowserStorageItems, state =>
    ngPatBrowserStorageAdapter.removeAll({...state, isLoaded: false})
  ),
  on(BrowserStorageActions.ngPatBrowserStorageError, (state, {message}) => ({
    ...state,
    error: message
  }))
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
