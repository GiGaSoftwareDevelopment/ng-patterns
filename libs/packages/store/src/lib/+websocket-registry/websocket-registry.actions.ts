import {Update} from '@ngrx/entity';
import {createAction, props} from '@ngrx/store';
import {NgPatConnectionService} from './websocket-registry.models';

export const ngPatWebsocketIsConnectedAction = createAction(
  '[WebsocketRegistry/API] Service Is Connected',
  props<{id: string}>()
);

export const ngPatWebsocketIsDisconnectedAction = createAction(
  '[WebsocketRegistry/API] Disconnect Service',
  props<{id: string}>()
);

export const ngPatServiceDoConnectAction = createAction(
  '[WebsocketRegistry/API] Service Do Connect'
);

export const ngPatServiceDoDisconnectAction = createAction(
  '[WebsocketRegistry/API] Service Do Disconnect'
);

export const ngPatSoadWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Load WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const ngPatAddWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Add WebsocketRegistry',
  props<{id: string}>()
);

export const ngPatUpsertWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Upsert WebsocketRegistry',
  props<{id: string}>()
);

export const ngPatAddWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Add WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const ngPatUpsertWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Upsert WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const ngPatUpdateWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Update WebsocketRegistry',
  props<{service: Update<NgPatConnectionService>}>()
);

export const ngPatUpdateWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Update WebsocketRegistrys',
  props<{services: Update<NgPatConnectionService>[]}>()
);

export const ngPatDeleteWebsocketRegistry = createAction(
  '[WebsocketRegistry/API] Delete WebsocketRegistry',
  props<{id: string}>()
);

export const ngPatDeleteWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Delete WebsocketRegistrys',
  props<{ids: string[]}>()
);

export const ngPatClearWebsocketRegistrys = createAction(
  '[WebsocketRegistry/API] Clear WebsocketRegistrys'
);
