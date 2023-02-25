import { FirebaseAppConfig, FirebaseConfig } from '../models/firestore.model';
import { addDatabasePaths, addRemoteConfigParams, createDefaultFirebaseConfig } from './firestore.fns';

describe('createDefaultFirebaseConfig', () => {


  const config: FirebaseConfig = {
    apiKey: 'apiKey',
    authDomain: 'authDomain',
    projectId: 'projectId',
    storageBucket: 'storageBucket',
    // databaseURL?: string; // used for firebase real time database, not firestore
    messagingSenderId: 'messagingSenderId',
    appId: 'appId',
    measurementId: 'measurementId'
  }

  const appConfig: FirebaseAppConfig<any> = {
    firebase: config,
    appName: config.appId
  }


  it('should addRemoteConfigParams', () => {

    // expect(createDefaultFirebaseConfig(config)).toEqual(expected);

    const expected: FirebaseAppConfig<any> = {
      ...appConfig,
      remoteConfigParams: {
        settings: {
          fetchTimeoutMillis: 60000,
          minimumFetchIntervalMillis: 43200000
        }
      }
    }

    expect(addRemoteConfigParams(appConfig)).toEqual(expected);

  });

  it('should addDatabasePaths', () => {

    // expect(createDefaultFirebaseConfig(config)).toEqual(expected);

    const expected: FirebaseAppConfig<any> = {
      ...appConfig,
      databasePaths: {
        users: 'users'
      }
    }

    expect(addDatabasePaths(appConfig)).toEqual(expected);

  })

  it('should create default firebase config', () => {

    const expected: FirebaseAppConfig<any> = {
      ...appConfig,
      databasePaths: {
        users: 'users'
      },
      remoteConfigParams: {
        settings: {
          fetchTimeoutMillis: 60000,
          minimumFetchIntervalMillis: 43200000
        }
      }
    }

    expect(createDefaultFirebaseConfig(config)).toEqual(expected);
  })

})
