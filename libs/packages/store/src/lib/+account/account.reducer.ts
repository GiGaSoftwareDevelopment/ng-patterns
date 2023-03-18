import {createReducer, on} from '@ngrx/store';
import {
  ngPatAccountLoadedFromAuthStateChange,
  ngPatAccountLoadedFromSnapshotChanges,
  ngPatAuthError,
  ngPatIsOffline,
  ngPatIsOnline,
  ngPatLoggedOut
} from './account.actions';
import {accountIsLoaded, accountIsOnboarded} from './account.fns';
import {NgPatAccountState, ngPatInitialAccountState} from './account.model';
import {ErrorModel} from '../models/error.model';
import {parseError} from '../fns/parse-errors';

export const ngPatAccountReducer = createReducer(
  ngPatInitialAccountState,
  on(
    ngPatAccountLoadedFromAuthStateChange,
    (state: NgPatAccountState, action): NgPatAccountState => {
      return {
        ...state,
        ...action.payload
      };
    }
  ),
  on(
    ngPatAccountLoadedFromSnapshotChanges,
    (state: NgPatAccountState, action): NgPatAccountState => {
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
  on(ngPatLoggedOut, (): NgPatAccountState => {
    return {
      ...ngPatInitialAccountState
    };
  }),

  on(ngPatAuthError, (state: NgPatAccountState, action): NgPatAccountState => {
    return {
      ...state,
      authError: parseError(<ErrorModel>action.payload)
    };
  }),
  on(ngPatIsOnline, (state: NgPatAccountState): NgPatAccountState => {
    return <NgPatAccountState>{
      ...state,
      isOnline: true
    };
  }),
  on(ngPatIsOffline, (state: NgPatAccountState): NgPatAccountState => {
    return <NgPatAccountState>{
      ...state,
      isOnline: false
    };
  })
);
