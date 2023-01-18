import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {RemoteConfigEntity, RemoteConfigState} from './remote-config.model';
import * as RemoteConfigActions from './remote-config.actions';
import {logout} from '../+account/account.actions';

export const remoteConfigFeatureKey = 'remoteConfig';

export interface PartialRemoteConfigState {
  readonly [remoteConfigFeatureKey]: RemoteConfigState;
}

export const remoteConfigAdapter: EntityAdapter<RemoteConfigEntity> =
  createEntityAdapter<RemoteConfigEntity>();

export const initialRemoteConfigState: RemoteConfigState =
  remoteConfigAdapter.getInitialState({
    // additional entity state properties
  });

export const reducer = createReducer(
  initialRemoteConfigState,
  on(RemoteConfigActions.addRemoteConfig, (state, action) =>
    remoteConfigAdapter.addOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.setRemoteConfig, (state, action) =>
    remoteConfigAdapter.setOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.addRemoteConfigs, (state, action) =>
    remoteConfigAdapter.addMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.updateRemoteConfig, (state, action) =>
    remoteConfigAdapter.updateOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.updateRemoteConfigs, (state, action) =>
    remoteConfigAdapter.updateMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.upsertRemoteConfig, (state, action) =>
    remoteConfigAdapter.upsertOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.upsertRemoteConfigs, (state, action) =>
    remoteConfigAdapter.upsertMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.mapRemoteConfig, (state, {entityMap}) => {
    return remoteConfigAdapter.mapOne(entityMap, state);
  }),
  on(RemoteConfigActions.mapRemoteConfigs, (state, {entityMap}) => {
    return remoteConfigAdapter.map(entityMap, state);
  }),
  on(RemoteConfigActions.deleteRemoteConfig, (state, action) =>
    remoteConfigAdapter.removeOne(action.id, state)
  ),
  on(RemoteConfigActions.deleteRemoteConfigs, (state, action) =>
    remoteConfigAdapter.removeMany(action.ids, state)
  ),
  on(RemoteConfigActions.loadRemoteConfigs, (state, action) =>
    remoteConfigAdapter.setAll(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.setRemoteConfigs, (state, action) =>
    remoteConfigAdapter.setMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.clearRemoteConfigs, state =>
    remoteConfigAdapter.removeAll(state)
  ),
  on(logout, state => ({
    ...initialRemoteConfigState,
    ...remoteConfigAdapter.removeAll(state)
  }))
);
