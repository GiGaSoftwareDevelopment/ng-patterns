import { DocumentSnapshot } from 'firebase/firestore';
import { isPlainObject, get } from '@ngpat/fn';
import { clone } from '@ngpat/fn';
import { Observable, Observer } from 'rxjs';

export type RemoveCtorTimeStampFn<T> = (data: any) => T;
export type RecurseFn<T> = (...args: any[]) => T;

function removeCtorTimeStamp<T>(_data: T): T;
function removeCtorTimeStamp(_data: any): any {
  if (_data['createdAt']) {
    _data.createdAt = {
      nanoseconds: _data.createdAt ? _data.createdAt.nanoseconds : 0,
      seconds: _data.createdAt ? _data.createdAt.seconds : 0
    };
  }

  if (_data['updatedAt']) {
    _data.updatedAt = {
      nanoseconds: _data.updatedAt ? _data.updatedAt.nanoseconds : 0,
      seconds: _data.updatedAt ? _data.updatedAt.seconds : 0
    };
  }

  return _data;
}

function recurseDataObject<T>(
  data: any | null,
  removeCtorFn: RemoveCtorTimeStampFn<T>,
  recurseFn: (...args: any[]) => T
): T {
  if (data) {
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
