import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as RemoteConfigReducer from './remote-config.reducer';
import {Dictionary} from '@ngrx/entity/src/models';
import {
  NgPatRemoteConfigEntity,
  NgPatRemoteConfigState
} from './remote-config.model';

export const selectNgPatRemoteConfigState =
  createFeatureSelector<NgPatRemoteConfigState>(
    RemoteConfigReducer.ngPatRemoteConfigFeatureKey
  );

const {selectIds, selectEntities, selectAll, selectTotal} =
  RemoteConfigReducer.ngPatRemoteConfigAdapter.getSelectors();

export const selectNgPatAllRemoteConfigs = createSelector(
  selectNgPatRemoteConfigState,
  (state: NgPatRemoteConfigState) => selectAll(state)
);
export const selectNgPatRemoteConfigEntities = createSelector(
  selectNgPatRemoteConfigState,
  (state: NgPatRemoteConfigState) => selectEntities(state)
);
export const selectNgPatRemoteConfigIds = createSelector(
  selectNgPatRemoteConfigState,
  (state: NgPatRemoteConfigState) => selectIds(state)
);
export const selectNgPatRemoteConfigTotal = createSelector(
  selectNgPatRemoteConfigState,
  (state: NgPatRemoteConfigState) => selectTotal(state)
);

export const selectNgPatRemoteConfigByID = (id: string) =>
  createSelector(
    selectNgPatRemoteConfigEntities,
    (entities: Dictionary<NgPatRemoteConfigEntity>) => {
      return entities[id];
    }
  );
