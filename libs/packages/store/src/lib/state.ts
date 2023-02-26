import { NgPatAccountEffects } from './+account/account.effects';
import { Type } from '@angular/core';
import { NgPatRemoteConfigEffects } from './+remote-config/remote-config.effects';
import { accountFeatureKey, initialAccountState } from './+account/account.model';
import * as fromAccountState from './+account/account.reducer';
import * as fromRemoteConfigState from './+remote-config/remote-config.reducer';
import * as fromFirebaseConnectionsState from './+websocket-registry/websocket-registry.reducer';
import { initialRemoteConfigState, remoteConfigFeatureKey } from './+remote-config/remote-config.reducer';
import {
  initialWebsocketRegistryState,
  websocketRegistryFeatureKey
} from './+websocket-registry/websocket-registry.models';

export const UIUX_FIREBASE_ROOT_REDUCERS = {
  [accountFeatureKey]: fromAccountState.reducer,
  [remoteConfigFeatureKey]: fromRemoteConfigState.reducer,
  [websocketRegistryFeatureKey]: fromFirebaseConnectionsState.reducer,
}

export const UIUX_FIREBASE_ROOT_STATE_INITIALIZERS = {
  [accountFeatureKey]: initialAccountState,
  [remoteConfigFeatureKey]: initialRemoteConfigState,
  [websocketRegistryFeatureKey]: initialWebsocketRegistryState,
}

export const NGPAT_FIREBASE_ROOT_EFFECTS: Type<unknown>[] = [
  NgPatAccountEffects,
  NgPatRemoteConfigEffects
];
