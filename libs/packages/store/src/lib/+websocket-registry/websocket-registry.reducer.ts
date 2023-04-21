import { createReducer, on } from '@ngrx/store';
import {
  NgPatConnectionRegistryState,
  NgPatConnectionService,
  ngPatInitialWebsocketRegistryState,
  websocketNgPatRegistryAdapter
} from './websocket-registry.models';
import {
  ngPatAddWebsocketRegistry,
  ngPatAddWebsocketRegistrys,
  ngPatClearWebsocketRegistrys,
  ngPatDeleteWebsocketRegistry,
  ngPatDeleteWebsocketRegistrys,
  ngPatSoadWebsocketRegistrys,
  ngPatServiceDoConnectAction,
  ngPatServiceDoDisconnectAction,
  ngPatUpdateWebsocketRegistry,
  ngPatUpdateWebsocketRegistrys,
  ngPatUpsertWebsocketRegistry,
  ngPatUpsertWebsocketRegistrys,
  ngPatWebsocketIsConnectedAction,
  ngPatWebsocketIsDisconnectedAction
} from './websocket-registry.actions';
import {
  ngPatAccountLoadedFromAuthStateChange,
  ngPatAccountLoadedFromSnapshotChanges,
  ngPatLogout
} from '../+account/account.actions';
import { keysAreTruthyInEntity } from '@ngpat/fn';
import { ngPatDoDisconnectAndRemoveLocalStorageItem } from '../+local-storage/local-storage.actions';

export const ngPatWebSocketReducer =
  createReducer<NgPatConnectionRegistryState>(
    ngPatInitialWebsocketRegistryState,
    on(
      ngPatWebsocketIsConnectedAction,
      (state: NgPatConnectionRegistryState, action) => {
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
      }
    ),
    on(
      ngPatWebsocketIsDisconnectedAction,
      (state: NgPatConnectionRegistryState, action) => {
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

    // Triggered by presence getService
    on(
      ngPatServiceDoConnectAction,
      (
        state: NgPatConnectionRegistryState,
        action
      ): NgPatConnectionRegistryState => {
        return {
          ...state,
          doConnect: true,
          doDisconnect: false
        };
      }
    ),

    // Triggered by account.effects getService
    on(
      ngPatAccountLoadedFromSnapshotChanges,
      ngPatAccountLoadedFromAuthStateChange,
      (
        state: NgPatConnectionRegistryState,
        action
      ): NgPatConnectionRegistryState => {
        return {
          ...state,
          doConnect: true,
          doDisconnect: false
        };
      }
    ),

    on(
      ngPatServiceDoDisconnectAction,
      ngPatDoDisconnectAndRemoveLocalStorageItem,
      (state: NgPatConnectionRegistryState): NgPatConnectionRegistryState => {
        return {
          ...state,
          doConnect: false,
          doDisconnect: true
        };
      }
    ),
    on(ngPatLogout, (state: NgPatConnectionRegistryState) => {
      return {
        ...state,
        allConnected: false,
        entities: (<NgPatConnectionService[]>Object.values(state.entities))
          .map((entity: NgPatConnectionService) => {
            return {
              ...entity,
              connected: true
            };
          })
          .reduce(
            (
              e: { [key: string]: NgPatConnectionService },
              i: NgPatConnectionService
            ) => {
              e[i.id] = i;
              return e;
            },
            {}
          )
      };
    }),
    on(
      ngPatAddWebsocketRegistry,
      (state: NgPatConnectionRegistryState, action) => {
        const connectionService: NgPatConnectionService = {
          id: action.id,
          connected: false
        };

        const _state = websocketNgPatRegistryAdapter.addOne(
          connectionService,
          state
        );
        return {
          ..._state,
          allConnected: false
        };
      }
    ),
    on(
      ngPatUpsertWebsocketRegistry,
      (state: NgPatConnectionRegistryState, action) => {
        const connectionService: NgPatConnectionService = {
          id: action.id,
          connected: false
        };
        const _state = websocketNgPatRegistryAdapter.upsertOne(
          connectionService,
          state
        );

        return {
          ..._state,
          allConnected: false
        };
      }
    ),
    on(
      ngPatAddWebsocketRegistrys,
      (state: NgPatConnectionRegistryState, action) => {
        const services: NgPatConnectionService[] = action.ids.map(
          (id: string) => ({
            id,
            connected: false
          })
        );

        const _state = websocketNgPatRegistryAdapter.addMany(services, state);

        return {
          ..._state,
          allConnected: false
        };
      }
    ),
    on(
      ngPatUpsertWebsocketRegistrys,
      (state: NgPatConnectionRegistryState, action) => {
        const services: NgPatConnectionService[] = action.ids.map(
          (id: string) => ({
            id,
            connected: false
          })
        );

        const _state = websocketNgPatRegistryAdapter.upsertMany(
          services,
          state
        );

        return {
          ..._state,
          allConnected: false
        };
      }
    ),
    on(
      ngPatUpdateWebsocketRegistry,
      (state: NgPatConnectionRegistryState, action) =>
        websocketNgPatRegistryAdapter.updateOne(action.service, state)
    ),
    on(
      ngPatUpdateWebsocketRegistrys,
      (state: NgPatConnectionRegistryState, action) =>
        websocketNgPatRegistryAdapter.updateMany(action.services, state)
    ),
    on(
      ngPatDeleteWebsocketRegistry,
      (state: NgPatConnectionRegistryState, action) =>
        websocketNgPatRegistryAdapter.removeOne(action.id, state)
    ),
    on(
      ngPatDeleteWebsocketRegistrys,
      (state: NgPatConnectionRegistryState, action) =>
        websocketNgPatRegistryAdapter.removeMany(action.ids, state)
    ),
    on(
      ngPatSoadWebsocketRegistrys,
      (state: NgPatConnectionRegistryState, action) => {
        const services: NgPatConnectionService[] = action.ids.map(
          (id: string) => ({
            id,
            connected: false
          })
        );
        const _state = websocketNgPatRegistryAdapter.setAll(services, state);
        return {
          ..._state,
          allConnected: false
        };
      }
    ),
    on(ngPatClearWebsocketRegistrys, (state: NgPatConnectionRegistryState) =>
      websocketNgPatRegistryAdapter.removeAll(state)
    )
  );
