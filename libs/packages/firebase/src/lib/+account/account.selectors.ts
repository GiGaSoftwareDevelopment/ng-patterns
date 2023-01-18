import {createFeatureSelector, createSelector, select} from '@ngrx/store';
import {
  accountFeatureKey,
  AccountState,
  MonitorAccounts,
  ProviderIDAndEmail,
  UserImage
} from './account.model';
import {accountIsLoaded, getFirestoreUserAccountFromState} from './account.fns';
import {pipe} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ROLES, UserIdWithRole} from '../models/user.model';

export const selectAccountState =
  createFeatureSelector<AccountState>(accountFeatureKey);

export const selectUserAccount = createSelector(
  selectAccountState,
  getFirestoreUserAccountFromState
);

export const selectIsLoggedIn = createSelector(
  selectAccountState,
  (state: AccountState): boolean => state.isLoggedIn
);

export const selectIsOnboarded = createSelector(
  selectAccountState,
  (state: AccountState) => state.isOnboarded
);

export const selectAccountUsername = createSelector(
  selectAccountState,
  (state: AccountState) => state.username
);

export const selectAccountPromoCode = createSelector(
  selectAccountState,
  (state: AccountState) => state.promoCode
);

export const selectLoggedInUID = createSelector(
  selectAccountState,
  (state: AccountState): string | null => state.uid
);

export const selectAccountLinkCode = createSelector(
  selectAccountState,
  (state: AccountState) => state.linkCode
);

export const selectAccountIsLoaded = createSelector(
  selectAccountState,
  (state: AccountState): boolean =>
    state.uid !== undefined && state.uid !== null && state.uid.length > 0
);

export const selectIsOnboarded$ = pipe(
  select(selectAccountState),

  /**
   * Wait until account is retrieved from firestore
   */
  filter((a: AccountState) => a.isRetrievedFromFirestore),
  map((a: AccountState): boolean => a.isOnboarded)
);

export const selectProviderIDAndEmail = createSelector(
  selectAccountState,
  (state: AccountState): ProviderIDAndEmail => {
    return <ProviderIDAndEmail>{
      providerId: state.providerId ? state.providerId : '',
      email: state.email ? state.email : ''
    };
  }
);

export const selectIsUserAuthenticated = createSelector(
  selectAccountState,
  accountIsLoaded
);

/**
 * Photo URL or first letter of display or user name.
 */
export const selectUserImage = createSelector(
  selectAccountState,
  (state: AccountState): UserImage => {
    let character = '';
    let name = '';

    if (state.username && state.username.length > 0) {
      character = state.username.substr(0, 1).toUpperCase();
      name = state.username;
    } else if (state.displayName && state.displayName.length > 0) {
      character = state.displayName.substr(0, 1).toUpperCase();
      name = state.displayName;
    } else if (state.email && state.email.length > 0) {
      character = state.email.substr(0, 1).toUpperCase();
    }

    if (state.photoURL && state.photoURL.length > 0) {
      return {
        isPhotoURL: false,
        photoURL: state.photoURL,
        character,
        name
      };
    }

    return {
      isPhotoURL: false,
      photoURL: <string>state.photoURL,
      character,
      name
    };
  }
);

export const loggedInUserCanInvite = (members: {
  [uid: string]: UserIdWithRole;
}) =>
  createSelector(selectLoggedInUID, (uid: string | null) => {
    if (uid) {
      const role = members[uid].role;
      return role === ROLES.Owner;
    }
    return false;
  });

export const loggedInUserCanDelete = (members: {
  [uid: string]: UserIdWithRole;
}) =>
  createSelector(selectLoggedInUID, (uid: string | null) => {
    if (uid) {
      const role = members[uid].role;
      return role === ROLES.Owner;
    }
    return false;
  });

export const selectMentorAccounts = createSelector(
  selectAccountState,
  (state: AccountState): string[] => {
    return Object.keys(state.mentoringAccounts).filter(
      (k: string) => state.mentoringAccounts[k]
    );
  }
);

export const selectMentorAccountsDict = createSelector(
  selectAccountState,
  (state: AccountState): MonitorAccounts => {
    return Object.keys(state.mentoringAccounts)
      .filter((k: string) => state.mentoringAccounts[k])
      .reduce((a: MonitorAccounts, i: string) => {
        a[i] = true;
        return a;
      }, <MonitorAccounts>{});
  }
);

export const hasMentorAccounts = createSelector(
  selectMentorAccounts,
  (uids: string[]): boolean => {
    return uids.length > 0;
  }
);

export const selectMentoringMeAccounts = createSelector(
  selectAccountState,
  (state: AccountState): string[] => {
    return Object.keys(state.mentoringMeAccounts).filter(
      (k: string) => state.mentoringMeAccounts[k]
    );
  }
);

export const selectMentoringMeAccountsDict = createSelector(
  selectAccountState,
  (state: AccountState): MonitorAccounts => {
    return Object.keys(state.mentoringMeAccounts)
      .filter((k: string) => state.mentoringMeAccounts[k])
      .reduce((a: MonitorAccounts, i: string) => {
        a[i] = true;
        return a;
      }, <MonitorAccounts>{});
  }
);

export const hasMentoringMeAccounts = createSelector(
  selectMentoringMeAccounts,
  (uids: string[]): boolean => {
    return uids.length > 0;
  }
);
