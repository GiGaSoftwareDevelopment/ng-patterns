import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NgPatAccountState } from '../+account/account.model';
export const ngPatWebsocketRegistryFeatureKey = 'ngPat_WebsocketRegistry';

export interface NgPatConnectionService {
  id: string;
  connected: boolean;
}

export interface NgPatConnectionRegistryPartialState {
  readonly [ngPatWebsocketRegistryFeatureKey]: NgPatConnectionRegistryState;
}

export interface NgPatConnectionRegistryState
  extends EntityState<NgPatConnectionService> {
  // additional entities state properties
  allConnected: boolean;
  doConnect: boolean;
  doDisconnect: boolean;
}

export const websocketNgPatRegistryAdapter: EntityAdapter<NgPatConnectionService> =
  createEntityAdapter<NgPatConnectionService>();

export const ngPatInitialWebsocketRegistryState: NgPatConnectionRegistryState =
  websocketNgPatRegistryAdapter.getInitialState({
    // additional entity state properties
    allConnected: false,
    doConnect: false,
    doDisconnect: false
  });

export interface NgPatFirebaseConnectionService {
  onConnect(user: NgPatAccountState, ...args: any): void;
  onDisconnect(user: NgPatAccountState, ...args: any): void;
}
