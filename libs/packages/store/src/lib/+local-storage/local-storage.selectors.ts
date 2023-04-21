import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as LocalStorageReducer from './local-storage.reducer';
import { Dictionary } from '@ngrx/entity';
import {
  NgPatLocalStorageItem,
  ngPatLocalStoragesFeatureKey
} from './local-storage.model';

export const selectLocalStorageState =
  createFeatureSelector<LocalStorageReducer.NgPatLocalStorageState>(
    ngPatLocalStoragesFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  LocalStorageReducer.ngPatLocalStorageAdapter.getSelectors();

export const selectAllLocalStorages = createSelector(
  selectLocalStorageState,
  selectAll
);
export const selectLocalStorageEntities = createSelector(
  selectLocalStorageState,
  selectEntities
);
export const selectLocalStorageIds = createSelector(
  selectLocalStorageState,
  selectIds
);
export const selectLocalStorageTotal = createSelector(
  selectLocalStorageState,
  selectTotal
);

export const selectItemByKey = (key: string) =>
  createSelector(
    selectLocalStorageEntities,
    (
      entities: Dictionary<NgPatLocalStorageItem>
    ): NgPatLocalStorageItem | undefined => {
      return entities[key];
    }
  );

export const selectLocalStorageLoadingInProgress = createSelector(
  selectLocalStorageState,
  (state: LocalStorageReducer.NgPatLocalStorageState) => state.isLoading
);
