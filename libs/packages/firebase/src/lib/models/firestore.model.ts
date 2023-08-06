import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { FirebaseStorage } from 'firebase/storage';
import { Functions } from 'firebase/functions';
import { RemoteConfig } from 'firebase/remote-config';
import { NgPatFirestoreTriggerEmailDoc } from '../services/ng-pat-trigger-email-from-firestore.service';

export interface Exists<T> {
  data: T;
  exists: boolean;
}

/**
 * For angular service to write NgPatFirestoreTriggerEmailDoc
 * to Firestore
 */
export interface FirestoreWriteEmailConfig {
  /**
   * Firestore Document ID
   */
  id: string;

  /**
   * Firestore  Email Doc - NgPatFirestoreTriggerEmailDoc
   */
  doc: NgPatFirestoreTriggerEmailDoc;
}

/**
 * Keys and values must match remove config keys
 * https://console.firebase.google.com/u/0/project/gigasoft-prd/config
 */
export enum RemoteConfigKey {
  trialDays = 'trialDays',
  maxNumberQuizzesWhileInTrial = 'maxNumberQuizzesWhileInTrial'
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
export interface NgPatFirebaseAppConfig<T> {
  firebase: FirebaseConfig;
  remoteConfigPollMillis?: number;
  defaultRemoteConfig?: T;

  /** database paths */
  databasePaths?: DatabasePaths;
  remoteConfigParams?: RemoteConfigParams;

  appName?: string;
}

export interface NgPatFirebaseAppInstance<T> extends NgPatFirebaseAppConfig<T> {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
  functions: Functions;
  analytics: any;
  remoteConfig: RemoteConfig;
}

export interface NgPatAggregateFirebaseSnapshotChanges<T> {
  added: T[];
  // modified: Update<{ id: string }>[];
  modified: T[];
  removed: string[];
}
