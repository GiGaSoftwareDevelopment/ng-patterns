import {createAction, props} from '@ngrx/store';
import {Update, EntityMap, EntityMapOne} from '@ngrx/entity';

import {NgPatRemoteConfigEntity} from './remote-config.model';

export const ngPatLoadRemoteConfigEffect = createAction(
  '[NgPatRemoteConfigEntity/API] Load NgPatRemoteConfigEntity'
);

export const ngPatAddRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Add NgPatRemoteConfigEntity',
  props<{remoteConfig: NgPatRemoteConfigEntity}>()
);

export const ngPatSetRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Set NgPatRemoteConfigEntity',
  props<{remoteConfig: NgPatRemoteConfigEntity}>()
);

export const ngPatUpsertRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Upsert NgPatRemoteConfigEntity',
  props<{remoteConfig: NgPatRemoteConfigEntity}>()
);

export const ngPatAddRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Add RemoteConfigs',
  props<{remoteConfigs: NgPatRemoteConfigEntity[]}>()
);

export const ngPatUpsertRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Upsert RemoteConfigs',
  props<{remoteConfigs: NgPatRemoteConfigEntity[]}>()
);

export const ngPatUpdateRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Update NgPatRemoteConfigEntity',
  props<{remoteConfig: Update<NgPatRemoteConfigEntity>}>()
);

export const ngPatUpdateRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Update RemoteConfigs',
  props<{remoteConfigs: Update<NgPatRemoteConfigEntity>[]}>()
);

export const ngPatMapRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Map NgPatRemoteConfigEntity',
  props<{entityMap: EntityMapOne<NgPatRemoteConfigEntity>}>()
);

export const ngPatMapRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Map RemoteConfigs',
  props<{entityMap: EntityMap<NgPatRemoteConfigEntity>}>()
);

export const ngPatDeleteRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Delete NgPatRemoteConfigEntity',
  props<{id: string}>()
);

export const ngPatDeleteRemoteConfigFromfirestore = createAction(
  '[eRemoteConfig/API] Delete eRemoteConfig From Firestore',
  props<{id: string}>()
);

export const ngPatDeleteRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Delete RemoteConfigs',
  props<{ids: string[]}>()
);

export const ngPatLoadRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Load RemoteConfigs',
  props<{remoteConfigs: NgPatRemoteConfigEntity[]}>()
);

export const ngPatSetRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Set RemoteConfigs',
  props<{remoteConfigs: NgPatRemoteConfigEntity[]}>()
);

export const ngPatClearRemoteConfigs = createAction(
  '[NgPatRemoteConfigEntity/API] Clear RemoteConfigs'
);

export const ngPatUpdateFirestorePartialRemoteConfig = createAction(
  '[NgPatRemoteConfigEntity/API] Save Partial NgPatRemoteConfigEntity',
  props<{
    changes: Partial<NgPatRemoteConfigEntity>;
    remoteConfig: NgPatRemoteConfigEntity;
  }>()
);
