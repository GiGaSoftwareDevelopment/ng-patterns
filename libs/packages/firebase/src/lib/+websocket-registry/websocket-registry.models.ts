import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {AccountState} from '../+account/account.model';
export const websocketRegistryFeatureKey = 'webSocketRegistry';

export interface ConnectionService {
  id: string;
  connected: boolean;
}

export interface ConnectionRegistryPartialState {
  readonly [websocketRegistryFeatureKey]: ConnectionRegistryState;
}

export interface ConnectionRegistryState
  extends EntityState<ConnectionService> {
  // additional entities state properties
  allConnected: boolean;
  doConnect: boolean;
  doDisconnect: boolean;
}

export const websocketRegistryAdapter: EntityAdapter<ConnectionService> =
  createEntityAdapter<ConnectionService>();

export const initialWebsocketRegistryState: ConnectionRegistryState =
  websocketRegistryAdapter.getInitialState({
    // additional entity state properties
    allConnected: false,
    doConnect: false,
    doDisconnect: false
  });

export interface FirebaseConnectionService {
  onConnect(user: AccountState, ...args: any): void;
  onDisconnect(user: AccountState, ...args: any): void;
}
