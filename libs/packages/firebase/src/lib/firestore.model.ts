import { InjectionToken } from '@angular/core';

export interface Exists<T> {
  data: T;
  exists: boolean;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL?: string; // used for firebase real time database, not firestore
  projectId: string;
  storageBucket: string;
  appId: string;
  // messagingSenderId: string;
  measurementId: string;
}

export interface FirebaseAppConfig<T> {
  firebase: FirebaseConfig;
  remoteConfigPollMillis?: number;
  defaultRemoteConfig?: T;
  remoteConfigParams?: {
    settings: {
      /**
       * Defines the maximum age in milliseconds of an entry in the config cache before
       * it is considered stale. Defaults to 43200000 (Twelve hours).
       */
      minimumFetchIntervalMillis: number;
      /**
       * Defines the maximum amount of milliseconds to wait for a response when fetching
       * configuration from the Remote Config server. Defaults to 60000 (One minute).
       */
      fetchTimeoutMillis: number;
    };
  }
}

export const FIREBASE_APP_TOKEN = new InjectionToken('FIREBASE_APP_TOKEN');
