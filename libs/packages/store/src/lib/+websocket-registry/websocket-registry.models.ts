import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NgPatAccountState } from '../+account/account.model';
import { NgPatServiceConnector } from './ng-pat-service-connector';

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
  /**
   * Uniuqe key for this websocket connection.
   * Can use ngrx feature key or any other unique string.
   */
  connectionKey: string;
  connection: NgPatServiceConnector;
  ngPatOnInit?(): void;
  onConnect(user: NgPatAccountState, ...args: any): void;
  onDisconnect(user: NgPatAccountState, ...args: any): void;
}
