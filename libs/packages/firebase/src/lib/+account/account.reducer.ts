import {createReducer, on} from '@ngrx/store';
import {
  accountLoadedFromAuthStateChange,
  accountLoadedFromSnapshotChanges,
  authError,
  isOffline,
  isOnline,
  loggedOut
} from './account.actions';
import {accountIsLoaded, accountIsOnboarded} from './account.fns';
import {AccountState, initialAccountState} from './account.model';
import {ErrorModel} from '../models/error.model';
import {parseError} from '../fns/parse-errors';

export const reducer = createReducer(
  initialAccountState,
  on(
    accountLoadedFromAuthStateChange,
    (state: AccountState, action): AccountState => {
      return {
        ...state,
        ...action.payload
      };
    }
  ),
  on(
    accountLoadedFromSnapshotChanges,
    (state: AccountState, action): AccountState => {
      const _state = {
        ...state,
        ...action.payload
      };

      return {
        ..._state,
        isRetrievedFromFirestore: accountIsLoaded(_state),
        isOnboarded: accountIsOnboarded(_state)
      };
    }
  ),
  on(loggedOut, (): AccountState => {
    return {
      ...initialAccountState
    };
  }),

  on(authError, (state: AccountState, action): AccountState => {
    return {
      ...state,
      authError: parseError(<ErrorModel>action.payload)
    };
  }),
  on(isOnline, (state: AccountState): AccountState => {
    return <AccountState>{
      ...state,
      isOnline: true
    };
  }),
  on(isOffline, (state: AccountState): AccountState => {
    return <AccountState>{
      ...state,
      isOnline: false
    };
  })
);
