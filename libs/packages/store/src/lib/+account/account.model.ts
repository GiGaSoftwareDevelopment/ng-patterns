/**
 * Edit userAccountProperties
 * if this interface is edited
 */
import { NgPatTimeStamp } from '@ngpat/firebase';

export interface NgPatUserAccount {
  createdAt: NgPatTimeStamp | null;
  displayName: string | null;
  email: string | null;
  linkCode: string | null;
  /**
   * Logged-in user is mentor to these accounts, or
   * accounts User is mentoring.
   */
  mentoringAccounts: NgPatMonitorAccounts;

  /**
   * Logged-in user is the mentee of these accounts, or
   * accounts mentoring logged-in user as the mentee
   */
  mentoringMeAccounts: NgPatMonitorAccounts;
  // promoCode: string | null;
  uid: string | null;
  updatedAt: NgPatTimeStamp | null;
  username: string | null;
}

export const userAccountProperties: string[] = [
  'createdAt',
  'displayName',
  'email',
  'linkCode',
  'mentoringAccounts',
  'mentoringMeAccounts',
  // 'promoCode',
  'uid',
  'updatedAt',
  'username'
];

export interface NgPatMentorAccount {
  username: string | null;
  displayName: string | null;
  uid: string | null;
}

export const accountfirestoreMentorProperties: string[] = [
  'username',
  'displayName',
  'uid'
];

export const ngPatAccountFeatureKey = 'ngPatAccountFeatureKey';

export interface NgPatMonitorAccounts {
  [uid: string]: boolean;
}

export interface NgPatAccountState extends NgPatUserAccount {
  authError: NgPatAuthError | null;
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

export interface NgPatProviderIDAndEmail {
  providerId: string;
  email: string;
}

export interface NgPatAccountAlgolia {
  email: string | null;
  username: string | null;
  displayName: string | null;
  hasSubscription?: boolean;
  uid: string | null;
  active: boolean;
  trialOverAt?: number | null;
}

export interface NgPatUserImage {
  isPhotoURL: boolean;
  photoURL: string;
  character: string;
  name: string;
}

export interface NgPatPartialAccountStates {
  [ngPatAccountFeatureKey]: NgPatAccountState;
}

export interface NgPatAccountStateConnect {
  user: NgPatAccountState;
  doConnect: boolean;
}

export interface NgPatAuthError {
  code: string | null;
  message: string | null;
}

export interface NgPatAuthEmail {
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
 * NgPatProvider Data
 */
export interface NgPatProvider {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  providerId: string;
}

export const ngPatInitialAccountState: NgPatAccountState = {
  // NgPatUserAccount
  createdAt: {
    nanoseconds: 0,
    seconds: 0
  },
  displayName: null,
  email: null,
  linkCode: null,
  mentoringAccounts: {},
  mentoringMeAccounts: {},
  // promoCode: null,
  uid: null,
  updatedAt: {
    nanoseconds: 0,
    seconds: 0
  },
  username: null,

  // NgPatAccountState
  authError: null,
  isRetrievedFromFirestore: false,
  isOnboarded: false,
  isLoggedIn: false,
  isOnline: false,
  photoURL: null,
  providerId: null
};
