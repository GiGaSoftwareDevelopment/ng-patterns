import {User} from 'firebase/auth';
import {
  accountfirestoreMentorProperties,
  userAccountProperties,
  NgPatAccountState,
  MentorAccount,
  NgPatUserAccount
} from './account.model';
import {get, hasIn} from '@ngpat/fn';

export function getUserValue(user: User, key: string) {
  if (hasIn(user, key)) {
    return get(user, key);
  } else if (hasIn(user, `providerData[0].${key}`)) {
    return get(user, `providerData[0].${key}`);
  } else {
    return null;
  }
}

function getProviderData(user: User, key: string) {
  if (hasIn(user, `providerData[0].${key}`)) {
    return get(user, `providerData[0].${key}`);
  } else if (hasIn(user, key)) {
    return get(user, key);
  } else {
    return null;
  }
}

export function createFirestoreUserAccountFromAuth(
  user: User
): NgPatUserAccount {
  return {
    // isLoggedIn$: true,
    createdAt: null,
    displayName: getUserValue(user, 'displayName'),
    email: getUserValue(user, 'email'),
    linkCode: null,
    mentoringAccounts: {},
    mentoringMeAccounts: {},
    promoCode: null,
    uid: user.uid,
    updatedAt: null,
    username: null
    // emailVerified: user.emailVerified,
    // phoneNumber: getUserValue(user, 'phoneNumber'),
    // providerId: getProviderData(user, 'providerId'),
    // ngPatIsOnline: true,
    // isRetrievedFromFirestore: true
  };
}

/**
 * AcountState has a few more properties that what is store in firestore
 *
 * NgPatAccountState  is saved in client store
 * UserStore is saved in firestore
 *
 * @param userAccount
 */
export function createAccountStateFromFirestore(
  userAccount: NgPatUserAccount,
  user: User
): NgPatAccountState {
  const _accountState: NgPatAccountState = {
    ...userAccount,
    isOnline: true,
    isRetrievedFromFirestore: true,
    isOnboarded: false,
    isLoggedIn: true,
    photoURL: user.photoURL,
    providerId: user.providerId,
    authError: null
  };

  return {
    ..._accountState,
    isOnboarded: accountIsOnboarded(_accountState)
  };
}

export function hasAllUserAccountProperties(
  userAccount: NgPatUserAccount
): boolean {
  return <boolean>userAccountProperties.reduce(
    (hasAllProperties: boolean, prop: string) => {
      if (prop === 'mentoringAccounts' || prop === 'mentoringMeAccounts') {
        const _value = (<any>userAccount)[prop];
        return _value !== null && _value !== undefined;
      }

      if (hasAllProperties) {
        return (<any>userAccount)[prop] !== undefined;
      }

      return hasAllProperties;
    },
    true
  );
}

function addAccountProp(prop: string) {
  // TODO Add prop here

  if (prop === 'mentoringAccounts') {
    return {};
  }

  if (prop === 'mentoringMeAccounts') {
    return {};
  }

  return null;
}

export function addMissingUserAccountProperties(
  userAccount: NgPatUserAccount
): NgPatUserAccount {
  return userAccountProperties.reduce((acc: NgPatUserAccount, prop: string) => {
    const _value = (<any>acc)[prop];

    if (prop === 'mentoringAccounts' || prop === 'mentoringMeAccounts') {
      /*
      Checking if not objects
       */
      if (_value === undefined || _value === null) {
        (<any>acc)[prop] = addAccountProp(prop);
      }
    } else if (_value === undefined) {
      (<any>acc)[prop] = addAccountProp(prop);
    }

    return acc;
  }, userAccount);
}

export function getFirestoreUserAccountFromState(
  a: Partial<NgPatAccountState>
): NgPatUserAccount {
  return userAccountProperties.reduce((p: NgPatUserAccount, k: string) => {
    if ((<any>a)[k] !== undefined && (<any>a)[k] !== null) {
      (<any>p)[k] = (<any>a)[k];
    }
    return p;
  }, <NgPatUserAccount>{});
}

export function getAccountProperties(
  a: Partial<NgPatAccountState>
): NgPatUserAccount {
  return userAccountProperties.reduce((p: NgPatUserAccount, k: string) => {
    (<any>p)[k] = (<any>a)[k];
    return p;
  }, <NgPatUserAccount>{});
}

export function getMentorAccountProperties(
  a: Partial<NgPatAccountState>
): MentorAccount {
  return accountfirestoreMentorProperties.reduce(
    (p: MentorAccount, k: string) => {
      (<any>p)[k] = (<any>a)[k];
      return p;
    },
    <MentorAccount>{}
  );
}

export function accountIsLoaded(account: NgPatAccountState): boolean {
  return account && account.uid !== null && account.uid.length > 0;
}

export function accountIsOnboarded(state: NgPatAccountState) {
  return (
    state.username !== null &&
    state.username !== undefined &&
    state.username.length > 0
  );
}
