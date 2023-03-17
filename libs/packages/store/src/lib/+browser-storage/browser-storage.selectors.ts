import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as BrowserStorageReducer from './ng-pat-browser-storage.reducer';
import {Dictionary} from '@ngrx/entity';
import {
  NgPatBrowserStorageItem,
  ngPatBrowserStoragesFeatureKey
} from './browser-storage.model';

export const selectBrowserStorageState =
  createFeatureSelector<BrowserStorageReducer.NgPatBrowserStorageState>(
    ngPatBrowserStoragesFeatureKey
  );

const {selectIds, selectEntities, selectAll, selectTotal} =
  BrowserStorageReducer.ngPatBrowserStorageAdapter.getSelectors();

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

export const selectItemByKey = (key: string) =>
  createSelector(
    selectBrowserStorageEntities,
    (
      entities: Dictionary<NgPatBrowserStorageItem>
    ): NgPatBrowserStorageItem | undefined => {
      return entities[key];
    }
  );

export const selectBrowserStorageLoadingInProgress = createSelector(
  selectBrowserStorageState,
  (state: BrowserStorageReducer.NgPatBrowserStorageState) => state.isLoading
);
