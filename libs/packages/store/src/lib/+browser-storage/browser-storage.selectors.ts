import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as BrowserStorageReducer from './browser-storage.reducer';
import { Dictionary } from '@ngrx/entity';
import { BrowserStorageItem } from './browser-storage.model';
import { Observable } from 'rxjs';

export const selectBrowserStorageState =
  createFeatureSelector<BrowserStorageReducer.BrowserStorageState>(
    BrowserStorageReducer.browserStoragesFeatureKey
  );

const {selectIds, selectEntities, selectAll, selectTotal} =
  BrowserStorageReducer.browserStorageAdapter.getSelectors();

export const selectAllBrowserStorages = createSelector(
  selectBrowserStorageState,
  selectAll
);
export const selectBrowserStorageEntities = createSelector(
  selectBrowserStorageState,
  selectEntities
);
export const selectBrowserStorageIds = createSelector(
  selectBrowserStorageState,
  selectIds
);
export const selectBrowserStorageTotal = createSelector(
  selectBrowserStorageState,
  selectTotal
);

export const selectItemByKey = (key: string) =>  createSelector(
  selectBrowserStorageEntities,
  (entities: Dictionary<BrowserStorageItem>) => {
    return entities[key];
  }
)

export const selectBrowserStorageLoadingInProgress = createSelector(
  selectBrowserStorageState,
  (state: BrowserStorageReducer.BrowserStorageState) => state.isLoading
);