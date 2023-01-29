import {createAction, props} from '@ngrx/store';
import {Update, EntityMap, EntityMapOne} from '@ngrx/entity';

import {RemoteConfigEntity} from './remote-config.model';

export const loadRemoteConfigEffect = createAction(
  '[RemoteConfigEntity/API] Load RemoteConfigEntity'
);

export const addRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Add RemoteConfigEntity',
  props<{remoteConfig: RemoteConfigEntity}>()
);

export const setRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Set RemoteConfigEntity',
  props<{remoteConfig: RemoteConfigEntity}>()
);

export const upsertRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Upsert RemoteConfigEntity',
  props<{remoteConfig: RemoteConfigEntity}>()
);

export const addRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Add RemoteConfigs',
  props<{remoteConfigs: RemoteConfigEntity[]}>()
);

export const upsertRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Upsert RemoteConfigs',
  props<{remoteConfigs: RemoteConfigEntity[]}>()
);

export const updateRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Update RemoteConfigEntity',
  props<{remoteConfig: Update<RemoteConfigEntity>}>()
);

export const updateRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Update RemoteConfigs',
  props<{remoteConfigs: Update<RemoteConfigEntity>[]}>()
);

export const mapRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Map RemoteConfigEntity',
  props<{entityMap: EntityMapOne<RemoteConfigEntity>}>()
);

export const mapRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Map RemoteConfigs',
  props<{entityMap: EntityMap<RemoteConfigEntity>}>()
);

export const deleteRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Delete RemoteConfigEntity',
  props<{id: string}>()
);

export const deleteRemoteConfigFromfirestore = createAction(
  '[eRemoteConfig/API] Delete eRemoteConfig From Firestore',
  props<{id: string}>()
);

export const deleteRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Delete RemoteConfigs',
  props<{ids: string[]}>()
);

export const loadRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Load RemoteConfigs',
  props<{remoteConfigs: RemoteConfigEntity[]}>()
);

export const setRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Set RemoteConfigs',
  props<{remoteConfigs: RemoteConfigEntity[]}>()
);

export const clearRemoteConfigs = createAction(
  '[RemoteConfigEntity/API] Clear RemoteConfigs'
);

export const updateFirestorePartialRemoteConfig = createAction(
  '[RemoteConfigEntity/API] Save Partial RemoteConfigEntity',
  props<{
    changes: Partial<RemoteConfigEntity>;
    remoteConfig: RemoteConfigEntity;
  }>()
);
