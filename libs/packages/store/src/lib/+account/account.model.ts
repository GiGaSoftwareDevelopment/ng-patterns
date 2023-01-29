/**
 * Edit userAccountProperties
 * if this interface is edited
 */
import {TimeStamp} from '@uiux/firebase';

export interface UserAccount {
  createdAt: TimeStamp | null;
  displayName: string | null;
  email: string | null;
  linkCode: string | null;
  /**
   * Accounts User is mentoring
   */
  mentoringAccounts: MonitorAccounts;

  /**
   * Accounts mentoring logged in user
   */
  mentoringMeAccounts: MonitorAccounts;
  promoCode: string | null;
  uid: string | null;
  updatedAt: TimeStamp | null;
  username: string | null;
}

export const userAccountProperties: string[] = [
  'createdAt',
  'displayName',
  'email',
  'linkCode',
  'mentoringAccounts',
  'mentoringMeAccounts',
  'promoCode',
  'uid',
  'updatedAt',
  'username'
];

export interface MentorAccount {
  username: string | null;
  displayName: string | null;
  uid: string | null;
}

export const accountfirestoreMentorProperties: string[] = [
  'username',
  'displayName',
  'uid'
];

export const accountFeatureKey = 'account';

export interface MonitorAccounts {
  [uid: string]: boolean;
}

export interface AccountState extends UserAccount {
  authError: AuthError | null;
  /**
   * When account is received from Firestore, not when authenticated
   */
  isRetrievedFromFirestore: boolean;

  /**
   * Account information has been provided by the user, such as user name.
   */
  isOnboarded: boolean;

  /**
   * When account is received from authStateChanges of firebase auth.
   * This does not mean the account has been received from firestore.
   */
  isLoggedIn: boolean;

  /**
   * User is actively interacting with app for set period of time.
   */
  isOnline: boolean;

  /**
   * this may change frequently, so use from auth,
   * do not save in firestore
   */
  photoURL: string | null;

  /**
   * Authentication provider received from Google Auth.
   */
  providerId: string | null;
}

export interface ProviderIDAndEmail {
  providerId: string;
  email: string;
}

export interface AccountAlgolia {
  email: string | null;
  username: string | null;
  displayName: string | null;
  hasSubscription?: boolean;
  uid: string | null;
  active: boolean;
  trialOverAt?: number | null;
}

export interface UserImage {
  isPhotoURL: boolean;
  photoURL: string;
  character: string;
  name: string;
}

export interface PartialAccountStates {
  [accountFeatureKey]: AccountState;
}

export interface AccountStateConnect {
  user: AccountState;
  doConnect: boolean;
}

export interface AuthError {
  code: string | null;
  message: string | null;
}

export interface AuthEmail {
  email: string;
  password: string;
}

/**
 * stsTokenManager
 */
// export interface StsTokenManager {
//   apiKey: string;
//   refreshToken: string;
//   accessToken: string;
//   expirationTime: number;
// }

/**
 * Provider Data
 */
export interface Provider {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  providerId: string;
}

export const initialAccountState: AccountState = {
  // UserAccount
  createdAt: {
    nanoseconds: 0,
    seconds: 0
  },
  displayName: null,
  email: null,
  linkCode: null,
  mentoringAccounts: {},
  mentoringMeAccounts: {},
  promoCode: null,
  uid: null,
  updatedAt: {
    nanoseconds: 0,
    seconds: 0
  },
  username: null,

  // AccountState
  authError: null,
  isRetrievedFromFirestore: false,
  isOnboarded: false,
  isLoggedIn: false,
  isOnline: false,
  photoURL: null,
  providerId: null
};
