import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import {
  ngPatAccountFeatureKey,
  NgPatAccountState,
  NgPatMonitorAccounts,
  NgPatProviderIDAndEmail,
  NgPatUserImage
} from './account.model';
import {
  accountIsLoaded,
  getFirestoreUserAccountFromState
} from './account.fns';
import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NG_PAT_ROLES, NgPatUserIdWithRole } from './user.model';

export const selectNgPatAccountState = createFeatureSelector<NgPatAccountState>(
  ngPatAccountFeatureKey
);

export const selectNgPatUserAccount = createSelector(
  selectNgPatAccountState,
  getFirestoreUserAccountFromState
);

export const selectNgPatIsLoggedIn = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): boolean => state.isLoggedIn
);

export const selectNgPatIsOnboarded = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState) => state.isOnboarded
);

export const selectNgPatAccountUsername = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState) => state.username
);

export const selectNgPatAccountEmail = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState) => state.email
);

export const selectNgPatAccountPromoCode = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState) => state.promoCode
);

export const selectNgPatLoggedInUID = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): string | null => state.uid
);

export const selectNgPatAccountLinkCode = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState) => state.linkCode
);

export const selectNgPatAccountIsLoaded = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): boolean =>
    state.uid !== undefined && state.uid !== null && state.uid.length > 0
);

export const selectNgPatIsOnboarded$ = pipe(
  select(selectNgPatAccountState),

  /**
   * Wait until account is retrieved from firestore
   */
  filter((a: NgPatAccountState) => a.isRetrievedFromFirestore),
  map((a: NgPatAccountState): boolean => a.isOnboarded)
);

export const selectNgPatProviderIDAndEmail = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): NgPatProviderIDAndEmail => {
    return <NgPatProviderIDAndEmail>{
      providerId: state.providerId ? state.providerId : '',
      email: state.email ? state.email : ''
    };
  }
);

/**
 * @deprecated use selectNgPatIsLoggedIn
 */
export const selectNgPatIsUserAuthenticated = createSelector(
  selectNgPatAccountState,
  accountIsLoaded
);

/**
 * Photo URL or first letter of display or user name.
 */
export const selectNgPatUserImage = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): NgPatUserImage => {
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

export const selectNgPatLoggedInUserCanInvite = (members: {
  [uid: string]: NgPatUserIdWithRole;
}) =>
  createSelector(selectNgPatLoggedInUID, (uid: string | null) => {
    if (uid) {
      const role = members[uid].role;
      return role === NG_PAT_ROLES.Owner;
    }
    return false;
  });

export const selectNgPatLoggedInUserCanDelete = (members: {
  [uid: string]: NgPatUserIdWithRole;
}) =>
  createSelector(selectNgPatLoggedInUID, (uid: string | null) => {
    if (uid) {
      const role = members[uid].role;
      return role === NG_PAT_ROLES.Owner;
    }
    return false;
  });

export const selectNgPatMentorAccounts = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): string[] => {
    return Object.keys(state.mentoringAccounts).filter(
      (k: string) => state.mentoringAccounts[k]
    );
  }
);

export const selectNgPatMentorAccountsDict = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): NgPatMonitorAccounts => {
    return Object.keys(state.mentoringAccounts)
      .filter((k: string) => state.mentoringAccounts[k])
      .reduce((a: NgPatMonitorAccounts, i: string) => {
        a[i] = true;
        return a;
      }, <NgPatMonitorAccounts>{});
  }
);

export const selectNgPatHasMentorAccounts = createSelector(
  selectNgPatMentorAccounts,
  (uids: string[]): boolean => {
    return uids.length > 0;
  }
);

export const selectNgPatMentoringMeAccounts = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): string[] => {
    return Object.keys(state.mentoringMeAccounts).filter(
      (k: string) => state.mentoringMeAccounts[k]
    );
  }
);

export const selectNgPatMentoringMeAccountsDict = createSelector(
  selectNgPatAccountState,
  (state: NgPatAccountState): NgPatMonitorAccounts => {
    return Object.keys(state.mentoringMeAccounts)
      .filter((k: string) => state.mentoringMeAccounts[k])
      .reduce((a: NgPatMonitorAccounts, i: string) => {
        a[i] = true;
        return a;
      }, <NgPatMonitorAccounts>{});
  }
);

export const selectNgPatHasMentoringMeAccounts = createSelector(
  selectNgPatMentoringMeAccounts,
  (uids: string[]): boolean => {
    return uids.length > 0;
  }
);
