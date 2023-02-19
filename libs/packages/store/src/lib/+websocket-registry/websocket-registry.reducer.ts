import { createReducer, on } from '@ngrx/store';
import {
  ConnectionRegistryState,
  ConnectionService,
  initialWebsocketRegistryState,
  websocketRegistryAdapter
} from './websocket-registry.models';
import {
  addWebsocketRegistry,
  addWebsocketRegistrys,
  clearWebsocketRegistrys,
  deleteWebsocketRegistry,
  deleteWebsocketRegistrys,
  loadWebsocketRegistrys,
  serviceDoConnectAction,
  serviceDoDisconnectAction,
  updateWebsocketRegistry,
  updateWebsocketRegistrys,
  upsertWebsocketRegistry,
  upsertWebsocketRegistrys,
  websocketIsConnectedAction,
  websocketIsDisconnectedAction
} from './websocket-registry.actions';
import {
  accountLoadedFromAuthStateChange,
  accountLoadedFromSnapshotChanges,
  logout
} from '../+account/account.actions';
import { keysAreTruthyInEntity } from '@ngpat/fn';
import { doDisconnectAndRemoveBrowserStorageItem } from '../+browser-storage/browser-storage.actions';

export const reducer = createReducer<ConnectionRegistryState>(
  initialWebsocketRegistryState,
  on(websocketIsConnectedAction, (state: ConnectionRegistryState, action) => {
    const _state = {
      ...state,
      entities: {
        ...state.entities,
        [action.id]: {
          connected: true,
          id: action.id
        }
      }
    };

    return {
      ..._state,
      allConnected: keysAreTruthyInEntity(_state.entities, 'connected')
    };
  }),
  on(
    websocketIsDisconnectedAction,
    (state: ConnectionRegistryState, action) => {
      // console.log(action);

      const _state = {
        ...state,
        entities: {
          ...state.entities,
          [action.id]: {
            connected: false,
            id: action.id
          }
        }
      };

      return {
        ..._state,
        allConnected: keysAreTruthyInEntity(_state.entities, 'connected')
      };
    }
  ),

  // Triggered by presence service
  on(serviceDoConnectAction, (state: ConnectionRegistryState, action): ConnectionRegistryState => {
    return {
      ...state,
      doConnect: true,
      doDisconnect: false
    };
  }),

  // Triggered by account.effects service
  on(
    accountLoadedFromSnapshotChanges,
    accountLoadedFromAuthStateChange,
    (state: ConnectionRegistryState, action): ConnectionRegistryState => {
      return {
        ...state,
        doConnect: true,
        doDisconnect: false
      };
    }
  ),

  on(serviceDoDisconnectAction, doDisconnectAndRemoveBrowserStorageItem, (state: ConnectionRegistryState): ConnectionRegistryState => {
    return {
      ...state,
      doConnect: false,
      doDisconnect: true
    };
  }),
  on(logout, (state: ConnectionRegistryState) => {
    return {
      ...state,
      allConnected: false,
      entities: (<ConnectionService[]>Object.values(state.entities))
        .map((entity: ConnectionService) => {
          return {
            ...entity,
            connected: true
          };
        })
        .reduce(
          (e: { [key: string]: ConnectionService }, i: ConnectionService) => {
            e[i.id] = i;
            return e;
          },
          {}
        )
    };
  }),
  on(addWebsocketRegistry, (state: ConnectionRegistryState, action) => {
    const connectionService: ConnectionService = {
      id: action.id,
      connected: false
    };

    const _state = websocketRegistryAdapter.addOne(connectionService, state);
    return {
      ..._state,
      allConnected: false
    };
  }),
  on(upsertWebsocketRegistry, (state: ConnectionRegistryState, action) => {
    const connectionService: ConnectionService = {
      id: action.id,
      connected: false
    };
    const _state = websocketRegistryAdapter.upsertOne(connectionService, state);

    return {
      ..._state,
      allConnected: false
    };
  }),
  on(addWebsocketRegistrys, (state: ConnectionRegistryState, action) => {
    const services: ConnectionService[] = action.ids.map((id: string) => ({
      id,
      connected: false
    }));

    const _state = websocketRegistryAdapter.addMany(services, state);

    return {
      ..._state,
      allConnected: false
    };
  }),
  on(upsertWebsocketRegistrys, (state: ConnectionRegistryState, action) => {
    const services: ConnectionService[] = action.ids.map((id: string) => ({
      id,
      connected: false
    }));

    const _state = websocketRegistryAdapter.upsertMany(services, state);

    return {
      ..._state,
      allConnected: false
    };
  }),
  on(updateWebsocketRegistry, (state: ConnectionRegistryState, action) =>
    websocketRegistryAdapter.updateOne(action.service, state)
  ),
  on(updateWebsocketRegistrys, (state: ConnectionRegistryState, action) =>
    websocketRegistryAdapter.updateMany(action.services, state)
  ),
  on(deleteWebsocketRegistry, (state: ConnectionRegistryState, action) =>
    websocketRegistryAdapter.removeOne(action.id, state)
  ),
  on(deleteWebsocketRegistrys, (state: ConnectionRegistryState, action) =>
    websocketRegistryAdapter.removeMany(action.ids, state)
  ),
  on(loadWebsocketRegistrys, (state: ConnectionRegistryState, action) => {
    const services: ConnectionService[] = action.ids.map((id: string) => ({
      id,
      connected: false
    }));
    const _state = websocketRegistryAdapter.setAll(services, state);
    return {
      ..._state,
      allConnected: false
    };
  }),
  on(clearWebsocketRegistrys, (state: ConnectionRegistryState) =>
    websocketRegistryAdapter.removeAll(state)
  )
);
