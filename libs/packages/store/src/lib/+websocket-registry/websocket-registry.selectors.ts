import {Dictionary} from '@ngrx/entity/src/models';
import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {pipe} from 'rxjs';
import {distinctUntilKeyChanged, filter} from 'rxjs/operators';
import {
  NgPatConnectionRegistryState,
  NgPatConnectionService,
  websocketNgPatRegistryAdapter,
  ngPatWebsocketRegistryFeatureKey
} from './websocket-registry.models';
import {selectNgPatAccountState} from '../+account/account.selectors';
import {
  NgPatAccountState,
  NgPatAccountStateConnect
} from '../+account/account.model';

// Lookup the 'ConnectionRegistry' feature state managed by NgRx
const selectNgPatConnectionRegistryState =
  createFeatureSelector<NgPatConnectionRegistryState>(
    ngPatWebsocketRegistryFeatureKey
  );

const {selectEntities} = websocketNgPatRegistryAdapter.getSelectors();

export const selectAllDisconnected = createSelector(
  selectNgPatConnectionRegistryState,
  (state: NgPatConnectionRegistryState) => {
    return !state.allConnected;
  }
);

export const selectNgPatAllDisconnectedFn = () => {
  return createSelector(
    selectNgPatConnectionRegistryState,
    (state: NgPatConnectionRegistryState) => {
      return !state.allConnected;
    }
  );
};

export const selectNgPatWebSockets = createSelector(
  selectNgPatConnectionRegistryState,
  selectEntities
);

export const selectNgPatGetWebSocketIdConnected = (id: string) =>
  createSelector(
    selectNgPatWebSockets,
    (entities: Dictionary<NgPatConnectionService>) => {
      if (entities !== undefined && id && entities[id] !== undefined) {
        return (<NgPatConnectionService>entities[id]).connected;
      } else {
        return false;
      }
    }
  );

export const selectNgpatDoConnect = createSelector(
  selectNgPatConnectionRegistryState,
  (state: NgPatConnectionRegistryState) => state.doConnect
);

export const selectNgPatDoDisconnect = createSelector(
  selectNgPatConnectionRegistryState,
  (state: NgPatConnectionRegistryState) => state.doDisconnect
);

export const selectNgPatAccountStateConnect = createSelector(
  selectNgPatAccountState,
  selectNgpatDoConnect,
  (user: NgPatAccountState, doConnect: boolean): NgPatAccountStateConnect => {
    // console.log(account);

    return {
      user,
      doConnect
    };
  }
);

/**
 * Returns SelectWebSocketStatus
 */
export const connectNgPatToFirestore$ = pipe(
  select(selectNgPatAccountStateConnect),
  filter(
    (d: NgPatAccountStateConnect): boolean => d.user.isRetrievedFromFirestore
  ),
  distinctUntilKeyChanged('doConnect')
);
