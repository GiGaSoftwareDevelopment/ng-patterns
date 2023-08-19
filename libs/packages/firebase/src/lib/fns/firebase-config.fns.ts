import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import { getRemoteConfig } from 'firebase/remote-config';
import { NgPatFirebaseAppConfig, NgPatFirebaseAppInstance } from '../models/firestore.model';
import { getAnalytics } from 'firebase/analytics';
import { InjectionToken } from '@angular/core';

export const NG_PAT_FIREBASE_INSTANCE: InjectionToken<
  NgPatFirebaseAppInstance<any>
> = new InjectionToken<NgPatFirebaseAppInstance<any>>(
  'NG_PAT_FIREBASE_INSTANCE'
);

export function createNgPatFirebaseAppInstance<T>(
  config: NgPatFirebaseAppConfig<T>,
  appName?: string
): NgPatFirebaseAppInstance<T> {

  const app = appName ? initializeApp(config.firebase, config.appName) : initializeApp(config.firebase);

  // initializeAnalytics(app);
  return {
    ...config,
    app,
    db: getFirestore(app),
    auth: getAuth(app),
    storage: getStorage(app),
    functions: getFunctions(app),
    remoteConfig: getRemoteConfig(app),
    analytics: getAnalytics(app)
  };
}
