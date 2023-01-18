import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as RemoteConfigReducer from './remote-config.reducer';
import {Dictionary} from '@ngrx/entity/src/models';
import {RemoteConfigEntity, RemoteConfigState} from './remote-config.model';

export const selectRemoteConfigState = createFeatureSelector<RemoteConfigState>(
  RemoteConfigReducer.remoteConfigFeatureKey
);

const {selectIds, selectEntities, selectAll, selectTotal} =
  RemoteConfigReducer.remoteConfigAdapter.getSelectors();

export const selectAllRemoteConfigs = createSelector(
  selectRemoteConfigState,
  (state: RemoteConfigState) => selectAll(state)
);
export const selectRemoteConfigEntities = createSelector(
  selectRemoteConfigState,
  (state: RemoteConfigState) => selectEntities(state)
);
export const selectRemoteConfigIds = createSelector(
  selectRemoteConfigState,
  (state: RemoteConfigState) => selectIds(state)
);
export const selectRemoteConfigTotal = createSelector(
  selectRemoteConfigState,
  (state: RemoteConfigState) => selectTotal(state)
);

export const selectRemoteConfigByID = (id: string) =>
  createSelector(
    selectRemoteConfigEntities,
    (entities: Dictionary<RemoteConfigEntity>) => {
      return entities[id];
    }
  );
