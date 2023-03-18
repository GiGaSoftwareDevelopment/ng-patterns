import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {
  NgPatRemoteConfigEntity,
  NgPatRemoteConfigState
} from './remote-config.model';
import * as RemoteConfigActions from './remote-config.actions';
import {ngPatLogout} from '../+account/account.actions';

export const ngPatRemoteConfigFeatureKey = 'ngPatRemoteConfigFeatureKey';

export interface PartialRemoteConfigState {
  readonly [ngPatRemoteConfigFeatureKey]: NgPatRemoteConfigState;
}

export const ngPatRemoteConfigAdapter: EntityAdapter<NgPatRemoteConfigEntity> =
  createEntityAdapter<NgPatRemoteConfigEntity>();

export const ngPatInitialRemoteConfigState: NgPatRemoteConfigState =
  ngPatRemoteConfigAdapter.getInitialState({
    // additional entity state properties
  });

export const ngPatRemoteConfigReducer = createReducer(
  ngPatInitialRemoteConfigState,
  on(RemoteConfigActions.ngPatAddRemoteConfig, (state, action) =>
    ngPatRemoteConfigAdapter.addOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.ngPatSetRemoteConfig, (state, action) =>
    ngPatRemoteConfigAdapter.setOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.ngPatAddRemoteConfigs, (state, action) =>
    ngPatRemoteConfigAdapter.addMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.ngPatUpdateRemoteConfig, (state, action) =>
    ngPatRemoteConfigAdapter.updateOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.ngPatUpdateRemoteConfigs, (state, action) =>
    ngPatRemoteConfigAdapter.updateMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.ngPatUpsertRemoteConfig, (state, action) =>
    ngPatRemoteConfigAdapter.upsertOne(action.remoteConfig, state)
  ),
  on(RemoteConfigActions.ngPatUpsertRemoteConfigs, (state, action) =>
    ngPatRemoteConfigAdapter.upsertMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.ngPatMapRemoteConfig, (state, {entityMap}) => {
    return ngPatRemoteConfigAdapter.mapOne(entityMap, state);
  }),
  on(RemoteConfigActions.ngPatMapRemoteConfigs, (state, {entityMap}) => {
    return ngPatRemoteConfigAdapter.map(entityMap, state);
  }),
  on(RemoteConfigActions.ngPatDeleteRemoteConfig, (state, action) =>
    ngPatRemoteConfigAdapter.removeOne(action.id, state)
  ),
  on(RemoteConfigActions.ngPatDeleteRemoteConfigs, (state, action) =>
    ngPatRemoteConfigAdapter.removeMany(action.ids, state)
  ),
  on(RemoteConfigActions.ngPatLoadRemoteConfigs, (state, action) =>
    ngPatRemoteConfigAdapter.setAll(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.ngPatSetRemoteConfigs, (state, action) =>
    ngPatRemoteConfigAdapter.setMany(action.remoteConfigs, state)
  ),
  on(RemoteConfigActions.ngPatClearRemoteConfigs, state =>
    ngPatRemoteConfigAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...ngPatInitialRemoteConfigState,
    ...ngPatRemoteConfigAdapter.removeAll(state)
  }))
);
