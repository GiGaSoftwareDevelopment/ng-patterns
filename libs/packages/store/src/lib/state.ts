import { NgPatAccountEffects } from './+account/account.effects';
import { Type } from '@angular/core';
import { NgPatRemoteConfigEffects } from './+remote-config/remote-config.effects';
import {
  ngPatAccountFeatureKey,
  ngPatInitialAccountState
} from './+account/account.model';
import * as fromAccountState from './+account/account.reducer';
import * as fromRemoteConfigState from './+remote-config/remote-config.reducer';
import {
  ngPatInitialRemoteConfigState,
  ngPatRemoteConfigFeatureKey
} from './+remote-config/remote-config.reducer';
import * as fromFirebaseConnectionsState from './+websocket-registry/websocket-registry.reducer';
import * as fromLocalStorageState from './+local-storage/local-storage.reducer';
import {
  ngPatInitialWebsocketRegistryState,
  ngPatWebsocketRegistryFeatureKey
} from './+websocket-registry/websocket-registry.models';
import {
  ngPatIInitialLocalStorageState,
  ngPatLocalStoragesFeatureKey
} from './+local-storage';
import { NgPatLocalStorageEffects } from './+local-storage/local-storage.effects';
import { NgPatDialogQueue } from './+dialog-queue/ng-pat-dialog-queue-effects.service';
import {
  ngPatDeviceFeatureKey,
  ngPatDeviceReducer,
  ngPatInitialDeviceState
} from './+device/device.reducer';
import { NgPatDeviceEffects } from './+device/device.effects';
import * as fromAppStore from './+in_app_purchase/appstore-in-app-purchase.reducer';

export const NG_PAT_FIREBASE_ROOT_REDUCERS = {
  [ngPatAccountFeatureKey]: fromAccountState.ngPatAccountReducer,
  [ngPatRemoteConfigFeatureKey]: fromRemoteConfigState.ngPatRemoteConfigReducer,
  [ngPatWebsocketRegistryFeatureKey]:
    fromFirebaseConnectionsState.ngPatWebSocketReducer,
  [ngPatLocalStoragesFeatureKey]: fromLocalStorageState.localStorageReducer,
  // [ngPatDialogsFeatureKey]: ngPatDialogueQueueReducer,
  [ngPatDeviceFeatureKey]: ngPatDeviceReducer,
  [fromAppStore.appstoreInAppPurchaseFeatureKey]: fromAppStore.reducer
};

export const NG_PAT_FIREBASE_ROOT_STATE_INITIALIZERS = {
  [ngPatAccountFeatureKey]: ngPatInitialAccountState,
  [ngPatRemoteConfigFeatureKey]: ngPatInitialRemoteConfigState,
  [ngPatWebsocketRegistryFeatureKey]: ngPatInitialWebsocketRegistryState,
  [ngPatLocalStoragesFeatureKey]: ngPatIInitialLocalStorageState,
  // [ngPatDialogsFeatureKey]: ngPatInitialDialogState,
  [ngPatDeviceFeatureKey]: ngPatInitialDeviceState,
  [fromAppStore.appstoreInAppPurchaseFeatureKey]:
    fromAppStore.initialAppstoreInAppPurchaseState
};

export const NG_PAT_FIREBASE_ROOT_EFFECTS: Type<unknown>[] = [
  NgPatAccountEffects,
  NgPatRemoteConfigEffects,
  NgPatLocalStorageEffects,
  NgPatDialogQueue,
  NgPatDeviceEffects
];
