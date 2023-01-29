import {Update} from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';
import {ConnectionService} from './websocket-registry.models';

export const websocketIsConnectedAction = createAction(
  '[WebsocketRegistry/API] Service Is Connected',
  props<{id: string}>()
);

export const websocketIsDisconnectedAction = createAction(
  '[WebsocketRegistry/API] Disconnect Service',
  props<{id: string}>()
);

export const serviceDoConnectAction = createAction(
  '[WebsocketRegistry/API] Service Do Connect'
);

export const serviceDoDisconnectAction = createAction(
  '[WebsocketRegistry/API] Service Do Disconnect'
);

export const loadWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Load WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const addWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Add WebsocketRegistry',
  props<{id: string}>()
);

export const upsertWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Upsert WebsocketRegistry',
  props<{id: string}>()
);

export const addWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Add WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const upsertWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Upsert WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const updateWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Update WebsocketRegistry',
  props<{service: Update<ConnectionService>}>()
);

export const updateWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Update WebsocketRegistrys',
  props<{services: Update<ConnectionService>[]}>()
);

export const deleteWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Delete WebsocketRegistry',
  props<{id: string}>()
);

export const deleteWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Delete WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const clearWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Clear WebsocketRegistrys'
);
