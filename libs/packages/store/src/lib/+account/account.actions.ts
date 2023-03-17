import {createAction, props} from '@ngrx/store';
import {NgPatAccountState, NgPatAuthError} from './account.model';

/**
 * User information comes from firestore snapshotChanges
 */
export const ngPatAccountLoadedFromSnapshotChanges = createAction(
  '[Account] Account Loaded from snapshotChanges',
  props<{
    payload: NgPatAccountState;
  }>()
);

/**
 * User information comes onAuthStateChanged of firebase auth
 */
export const ngPatAccountLoadedFromAuthStateChange = createAction(
  '[Account] Account Loaded From onAuthStateChanged',
  props<{
    payload: NgPatAccountState;
  }>()
);

export const ngPatAccountUpdated = createAction(
  '[Account] Account Updated',
  props<{updates: Partial<NgPatAccountState>}>()
);

export const ngPatAccountLoadError = createAction(
  '[Account] Account Load Error',
  props<{payload: any}>()
);

export const ngPatAccountSaveFirebase = createAction(
  '[Account] Account Save Firebase',
  props<{payload: Partial<NgPatAccountState>}>()
);

export const ngPatAuthError = createAction(
  '[Account] Auth Error',
  props<{payload: NgPatAuthError}>()
);

export const ngPatLoggedOut = createAction('[Account] Logged Out');

export const ngPatLogout = createAction('[Account] Log Out Action');

export const ngPatIsOnline = createAction('[Account] Auth Is Online');

export const ngPatIsOffline = createAction('[Account] Auth Is Offline');

export const ngPatSetGuardianCodeOnAccount = createAction(
  '[Account] Set Guardian Code',
  props<{code: string}>()
);

export const ngPatAddMonitorAccount = createAction(
  '[Account] Add Monitor Account',
  props<{code: string}>()
);
