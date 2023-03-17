import {NgPatAccountEffects} from './+account/account.effects';
import {Type} from '@angular/core';
import {NgPatRemoteConfigEffects} from './+remote-config/remote-config.effects';
import {accountFeatureKey, initialAccountState} from './+account/account.model';
import * as fromAccountState from './+account/account.reducer';
import * as fromRemoteConfigState from './+remote-config/remote-config.reducer';
import {
  initialNgPatRemoteConfigState,
  ngPatRemoteConfigFeatureKey
} from './+remote-config/remote-config.reducer';
import * as fromFirebaseConnectionsState from './+websocket-registry/websocket-registry.reducer';
import * as fromBrowserStorageState from './+browser-storage/ng-pat-browser-storage.reducer';
import {
  initialNgPatWebsocketRegistryState,
  ngPatWebsocketRegistryFeatureKey
} from './+websocket-registry/websocket-registry.models';
import {
  ngPatBrowserStoragesFeatureKey,
  ngPatIInitialBrowserStorageState
} from './+browser-storage';
import {NgPatBrowserStorageEffects} from './+browser-storage/ng-pat-browser-storage-effects.service';

export const NG_PAT_FIREBASE_ROOT_REDUCERS = {
  [accountFeatureKey]: fromAccountState.ngPatAccountReducer,
  [ngPatRemoteConfigFeatureKey]: fromRemoteConfigState.ngPatRemoteConfigReducer,
  [ngPatWebsocketRegistryFeatureKey]:
    fromFirebaseConnectionsState.ngPatWebSocketReducer,
  [ngPatBrowserStoragesFeatureKey]:
    fromBrowserStorageState.ngPatBrowserStorageReducer
};

export const NG_PAT_FIREBASE_ROOT_STATE_INITIALIZERS = {
  [accountFeatureKey]: initialAccountState,
  [ngPatRemoteConfigFeatureKey]: initialNgPatRemoteConfigState,
  [ngPatWebsocketRegistryFeatureKey]: initialNgPatWebsocketRegistryState,
  [ngPatBrowserStoragesFeatureKey]: ngPatIInitialBrowserStorageState
};

export const NG_PAT_FIREBASE_ROOT_EFFECTS: Type<unknown>[] = [
  NgPatAccountEffects,
  NgPatRemoteConfigEffects,
  NgPatBrowserStorageEffects
];
