import {createAction, props} from '@ngrx/store';
import {AccountState, AuthError} from './account.model';

/**
 * User information comes from firestore snapshotChanges
 */
export const accountLoadedFromSnapshotChanges = createAction(
  '[Account] Account Loaded from snapshotChanges',
  props<{
    payload: AccountState;
  }>()
);

/**
 * User information comes onAuthStateChanged of firebase auth
 */
export const accountLoadedFromAuthStateChange = createAction(
  '[Account] Account Loaded From onAuthStateChanged',
  props<{
    payload: AccountState;
  }>()
);

export const accountUpdated = createAction(
  '[Account] Account Updated',
  props<{updates: Partial<AccountState>}>()
);

export const accountLoadError = createAction(
  '[Account] Account Load Error',
  props<{payload: any}>()
);

export const accountSaveFirebase = createAction(
  '[Account] Account Save Firebase',
  props<{payload: Partial<AccountState>}>()
);

export const authError = createAction(
  '[Account] Auth Error',
  props<{payload: AuthError}>()
);

export const loggedOut = createAction('[Account] Logged Out');

export const logout = createAction('[Account] Log Out Action');

export const isOnline = createAction('[Account] Auth Is Online');

export const isOffline = createAction('[Account] Auth Is Offline');

export const setGuardianCodeOnAccount = createAction(
  '[Account] Set Guardian Code',
  props<{code: string}>()
);

export const addMonitorAccount = createAction(
  '[Account] Add Monitor Account',
  props<{code: string}>()
);
