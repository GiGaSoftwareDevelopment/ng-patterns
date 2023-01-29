import {Dictionary} from '@ngrx/entity/src/models';
import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {pipe} from 'rxjs';
import {distinctUntilKeyChanged, filter} from 'rxjs/operators';
import {
  ConnectionRegistryState,
  ConnectionService,
  websocketRegistryAdapter,
  websocketRegistryFeatureKey
} from './websocket-registry.models';
import {selectAccountState} from '../+account/account.selectors';
import {AccountState, AccountStateConnect} from '../+account/account.model';

// Lookup the 'ConnectionRegistry' feature state managed by NgRx
const selectConnectionRegistryState =
  createFeatureSelector<ConnectionRegistryState>(websocketRegistryFeatureKey);

const {selectEntities} = websocketRegistryAdapter.getSelectors();

export const selectAllDisconnected = createSelector(
  selectConnectionRegistryState,
  (state: ConnectionRegistryState) => {
    return !state.allConnected;
  }
);

export const selectAllDisconnectedFn = () => {
  return createSelector(
    selectConnectionRegistryState,
    (state: ConnectionRegistryState) => {
      return !state.allConnected;
    }
  );
};

export const selectWebSockets = createSelector(
  selectConnectionRegistryState,
  selectEntities
);

export const getWebSocketIdConnected = (id: string) =>
  createSelector(
    selectWebSockets,
    (entities: Dictionary<ConnectionService>) => {
      if (entities !== undefined && id && entities[id] !== undefined) {
        return (<ConnectionService>entities[id]).connected;
      } else {
        return false;
      }
    }
  );

export const selectDoConnect = createSelector(
  selectConnectionRegistryState,
  (state: ConnectionRegistryState) => state.doConnect
);

export const selectDoDisconnect = createSelector(
  selectConnectionRegistryState,
  (state: ConnectionRegistryState) => state.doDisconnect
);

export const selectAccountStateConnect = createSelector(
  selectAccountState,
  selectDoConnect,
  (user: AccountState, doConnect: boolean): AccountStateConnect => {
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
export const connectToFirestore$ = pipe(
  select(selectAccountStateConnect),
  filter((d: AccountStateConnect): boolean => d.user.isRetrievedFromFirestore),
  distinctUntilKeyChanged('doConnect')
);
