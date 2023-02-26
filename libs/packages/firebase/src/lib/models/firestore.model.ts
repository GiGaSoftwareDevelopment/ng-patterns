import { InjectionToken } from '@angular/core';

export interface Exists<T> {
  data: T;
  exists: boolean;
}


/**
 * Configuration from firebase project.
 */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  // databaseURL?: string; // used for firebase real time database, not firestore
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface DatabasePaths {
  // Path to users collection
  users: string;
}

export interface RemoteConfigParams {
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


/**
 * Firebase services configuration.
 * Wraps firebase config with additional params
 * for path to user collection and remote config
 * polling params.
 */
export interface FirebaseAppConfig<T> {
  firebase: FirebaseConfig;
  remoteConfigPollMillis?: number;
  defaultRemoteConfig?: T;

  /** database paths */
  databasePaths?: DatabasePaths;
  remoteConfigParams?: RemoteConfigParams;

  appName: string;
}

/**
 * Use FirebaseAppConfig interface for token.
 */
export const FIREBASE_APP_TOKEN = new InjectionToken('FIREBASE_APP_TOKEN');
