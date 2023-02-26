import { DocumentSnapshot } from 'firebase/firestore';
import { clone, get, isPlainObject } from '@ngpat/fn';
import { Observable, Observer, pipe } from 'rxjs';
import {
  DatabasePaths,
  FirebaseAppConfig,
  FirebaseConfig,
  RemoteConfigParams,
} from '../models/firestore.model';
import { TimeStamp } from '../models/time-stamp.model';

export type RemoveCtorTimeStampFn<T> = (data: any) => T;

function removeCtorTimeStamp<T>(_data: T): T;
function removeCtorTimeStamp(_data: any): any {
  console.log(_data);
  if (_data['createdAt']) {

    const createdAt: TimeStamp = {
      nanoseconds: _data.createdAt ? parseInt(_data.createdAt.nanoseconds, 10) : 0,
      seconds: _data.createdAt ? parseInt(_data.createdAt.seconds, 10) : 0
    }

    delete _data.createdAt;
    _data.createdAt = createdAt;
  }

  if (_data['updatedAt']) {

    const updatedAt = <TimeStamp>{
      nanoseconds: _data.updatedAt ? parseInt(_data.updatedAt.nanoseconds, 10) : 0,
      seconds: _data.updatedAt ? parseInt(_data.updatedAt.seconds) : 0
    };

    delete _data.updatedAt;
    _data.updatedAt = updatedAt;
  }

  console.log(_data);

  return _data;
}

function recurseDataObject<T>(
  data: any | null,
  removeCtorFn: RemoveCtorTimeStampFn<T>,
  recurseFn: (...args: any[]) => T
): T {
  if (data) {
    debugger;
    const keys: string[] = Object.keys(data);

    for (let index = 0; index < keys.length; index++) {
      if (isPlainObject(data[keys[index]])) {
        data[keys[index]] = removeCtorFn(data[keys[index]]);
      }

      if (Array.isArray(keys[index])) {
        for (let arrIndex = 0; arrIndex < keys[index].length; arrIndex++) {
          data[keys[index]][arrIndex] = recurseFn(
            keys[index],
            removeCtorFn,
            recurseFn
          );
        }
      }
    }
  }

  return data;
}

export function removeTimeStampCTorFromData<T>(_data: any): T {
  return clone(
    recurseDataObject(_data, removeCtorTimeStamp, recurseDataObject)
  );
}

export function removeTimestampCTorFromDocumentSnapshot<T>(
  snap: DocumentSnapshot
): T {
  return removeTimeStampCTorFromData(snap.data());
}

export function getUpdatedAtSeconds(data: any) {
  return get(data, 'updatedAt.seconds', null);
}

// export const clearFirebaseLocalStorage

export function clearFirestoreStorage(): Observable<boolean> {
  return new Observable((observer: Observer<boolean>) => {
    const dbName = 'firebaseLocalStorageDb';

    const req = indexedDB.deleteDatabase(dbName);
    req.onsuccess = function () {
      console.log(`Deleted ${dbName} successfully`);
      observer.next(true);
    };
    req.onerror = function () {
      console.log(`Couldn't delete ${dbName} `);
      observer.error(true);
    };
    req.onblocked = function () {
      console.log(
        `Couldn't delete ${dbName}  due to the operation being blocked`
      );
      observer.error(true);
    };
  });
}

export function clearFiresbaseInstallations(): Observable<boolean> {
  return new Observable((observer: Observer<boolean>) => {
    const dbName = 'firebase-installations-database';

    const req = indexedDB.deleteDatabase(dbName);
    req.onsuccess = function () {
      console.log(`Deleted ${dbName} successfully`);
      observer.next(true);
    };
    req.onerror = function () {
      console.log(`Couldn't delete ${dbName} `);
      observer.error(true);
    };
    req.onblocked = function () {
      console.log(
        `Couldn't delete ${dbName}  due to the operation being blocked`
      );
      observer.error(true);
    };
  });
}

export function addRemoteConfigParams<T>(config: FirebaseAppConfig<T>, params: RemoteConfigParams = {
  settings: {
    minimumFetchIntervalMillis: 43200000,
    fetchTimeoutMillis: 60000
  }
}): FirebaseAppConfig<T> {
  return {
    ...config,
    remoteConfigParams: {
      ...params
    }
  }
}

export function addDatabasePaths<T>(config: FirebaseAppConfig<T>, usersPath: { users: string } = { users: 'users'}): FirebaseAppConfig<T> {

  const databasePaths: DatabasePaths = config.databasePaths ? { ...config.databasePaths, ...usersPath } : { ...usersPath };

  return {
    ...config,
    databasePaths
  }
}


export const createDefaultFirebaseConfig = <T>(config: FirebaseConfig, userPath = 'users'): FirebaseAppConfig<T> => {

  return pipe(
    addRemoteConfigParams,
    addDatabasePaths
  )({
    firebase: config,
    appName: config.appId
  })
}
