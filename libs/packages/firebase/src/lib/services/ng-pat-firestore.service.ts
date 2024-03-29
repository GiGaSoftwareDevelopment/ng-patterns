import { AnalyticsCallOptions, logEvent } from 'firebase/analytics';
import {
  ActionCodeSettings,
  AuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  Persistence,
  PopupRedirectResolver,
  sendPasswordResetEmail,
  setPersistence,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  User,
  UserCredential
} from 'firebase/auth';
import {
  addDoc,
  clearIndexedDbPersistence,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  enableIndexedDbPersistence,
  FieldPath,
  FieldValue,
  GeoPoint,
  getDoc,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  WhereFilterOp,
  writeBatch,
  WriteBatch
} from 'firebase/firestore';
import { HttpsCallable, httpsCallable } from 'firebase/functions';
import { StorageReference, deleteObject, getBlob, getDownloadURL, ref } from 'firebase/storage';
import { fetchAndActivate, getAll, getValue, Value } from 'firebase/remote-config';
import { BehaviorSubject, from, Observable, Observer, ReplaySubject, Subject, Subscription, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Exists, FirestoreWriteEmailConfig, NgPatFirebaseAppInstance } from '../models/firestore.model';
import { RemoteConfigEntity } from '../models/remote-config.model';
import { AppEventName, FirebaseAnalyticEventParams } from '../models/analytics.model';
import { removeTimeStampCTorFromData, removeTimestampCTorFromDocumentSnapshot } from '../fns/firestore.fns';
import { allValuesMatch, hasValue } from '@ngpat/fn';
import { Inject, Injectable } from '@angular/core';
import { NG_PAT_FIREBASE_INSTANCE } from '../fns/firebase-config.fns';
import { SetOptions } from '@firebase/firestore';

/**
 * Utility class to abstract connections to firebase.
 * Subclass and provide a NgPatFirebaseAppConfig object in the
 * constructor.
 */
@Injectable({
  providedIn: 'root'
})
export class NgPatFirestoreService {
  private remoteConfigStop$: Subject<boolean> = new Subject();
  private remoteConfigSub: Subscription = Subscription.EMPTY;
  remoteConfig$: ReplaySubject<RemoteConfigEntity[]> = new ReplaySubject<
    RemoteConfigEntity[]
  >(1);

  get app() {
    return this.appInstance.app;
  }

  get analytics() {
    return this.appInstance.analytics;
  }

  get db() {
    return this.appInstance.db;
  }

  get functions() {
    return this.appInstance.functions;
  }

  get auth() {
    return this.appInstance.auth;
  }

  get storage() {
    return this.appInstance.storage;
  }

  get remoteConfig() {
    return this.appInstance.remoteConfig;
  }

  get databasePaths() {
    return this.appInstance.databasePaths;
  }

  public user$: ReplaySubject<User> = new ReplaySubject<User>(1);
  public isLoggedIn$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(NG_PAT_FIREBASE_INSTANCE)
    protected appInstance: NgPatFirebaseAppInstance<any>
  ) {
    // https://firebase.google.com/docs/remote-config/get-started?platform=web
    if (this.appInstance.remoteConfigParams) {
      this.appInstance.remoteConfig.settings = {
        ...this.appInstance.remoteConfigParams.settings
      };
    }
    if (this.appInstance.defaultRemoteConfig) {
      this.appInstance.remoteConfig.defaultConfig = {
        ...this.appInstance.defaultRemoteConfig
      };
    }

    fetchAndActivate(this.appInstance.remoteConfig)
      .then(() => {
        this.getRemoteConfigTimer();
        // ...
      })
      .catch(err => {
        // ...
      });

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    this.auth.onAuthStateChanged(function(user: User | null) {
      if (user) {
        self.user$.next(user);
      }

      self.isLoggedIn$.next(user !== null);
      self.isLoaded$.next(true);
    });

    // if (this.environment.emulator) {
    //   this._db.useEmulator('localhost', EMULATOR_PORTS.FIRESTORE);
    //   this._auth.useEmulator(`http://localhost:${EMULATOR_PORTS.AUTH}`);
    //   this._storage.useEmulator('localhost', EMULATOR_PORTS.STORAGE);
    //   this._functions.useEmulator('localhost', EMULATOR_PORTS.FUNCTIONS);
    // }

    // const messaging = firebase.messaging();

    // TODO FirestoreSettings.localCache
    // https://youtu.be/ciu62KLlwGQ?t=318
    // enableIndexedDbPersistence(this.db).catch(err => {
    //   if (err.code == 'failed-precondition') {
    //     // Multiple tabs open, persistence can only be enabled
    //     // in one tab at a a time.
    //     // ...
    //   } else if (err.code == 'unimplemented') {
    //     // The current browser does not support all of the
    //     // features required to enable persistence
    //     // ...
    //   }
    // });

    // console.log('SptFirestoreService INIT');
  }

  private getRemoteConfigTimer() {
    if (
      this.remoteConfigSub.closed &&
      this.appInstance.remoteConfigPollMillis
    ) {
      this.remoteConfigSub = timer(0, this.appInstance.remoteConfigPollMillis)
        .pipe(
          map(() => getAll(this.remoteConfig)),
          takeUntil(this.remoteConfigStop$)
        )
        .subscribe((remoteConfigValue: Record<string, Value>) => {
          const config: RemoteConfigEntity[] = Object.keys(
            remoteConfigValue
          ).map((key: string) => {
            return <RemoteConfigEntity>{
              id: key,
              value: getValue(this.remoteConfig, key).asString()
            };
          }, []);

          this.remoteConfig$.next(config);
        });
    }
  }

  stopRemoteConfigPoll() {
    this.remoteConfigStop$.next(true);
  }

  /// Firebase Server Timestamp
  get timestamp(): FieldValue {
    // return firebase.database.ServerValue.TIMESTAMP;
    return serverTimestamp();
  }

  logEvent(
    eventName: AppEventName<string>,
    eventParams?: FirebaseAnalyticEventParams,
    options?: AnalyticsCallOptions
  ): void {
    logEvent(this.analytics, eventName, eventParams, options);
  }

  /// **************
  collectionRef(path: string): CollectionReference<DocumentData> {
    return collection(this.db, path);
  }

  collectionData<T>(path: string): Promise<T[]> {
    return getDocs(this.collectionRef(path)).then(
      (q: QuerySnapshot<DocumentData>) => {
        return new Promise<T[]>((resolve, reject) => {
          const docs: T[] = [];

          q.forEach((d: QueryDocumentSnapshot<DocumentData>) => {
            docs.push(<T>removeTimestampCTorFromDocumentSnapshot(d));
          });

          resolve(docs);
        });
      }
    );
  }

  collectionData$<T>(path: string): Observable<T[]> {
    return from(this.collectionData<T>(path));
  }

  /// **************
  /// Get Data

  docRef(path: string): DocumentReference<DocumentData> {
    return doc(this.db, path);
  }

  docData$<T>(path: string): Observable<T | null> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return new Observable((observer: Observer<T | null>) => {
      const doc = getDoc(that.docRef(path));
      doc
        .then((snap: DocumentSnapshot) => {
          observer.next(<T>removeTimestampCTorFromDocumentSnapshot(snap));
          observer.complete();
        })
        .catch(() => {
          observer.next(null);
          observer.complete();
        });
    });
  }

  docData<T>(path: string): Promise<T | null> {
    return new Promise(resolve => {
      getDoc(this.docRef(path))
        .then((d: DocumentSnapshot<DocumentData>) => {
          resolve(removeTimestampCTorFromDocumentSnapshot<T>(d));
        })
        .catch(() => {
          resolve(null);
        });
    });
  }

  getDoc(path: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(this.docRef(path));
  }

  getDoc$(path: string): Observable<DocumentSnapshot<DocumentData>> {
    return new Observable(
      (observer: Observer<DocumentSnapshot<DocumentData>>) => {
        getDoc(this.docRef(path))
          .then((snap: DocumentSnapshot<DocumentData>) => {
            observer.next(snap);
            observer.complete();
          })
          .catch((error: any) => {
            observer.error(error);
          });
      }
    );
  }

  /**
   * adds createdAt field
   *
   * Usage:
   * db.set('items/ID', data) })
   *
   * @param {DocPredicate<T>} ref
   * @param data
   * @returns {Promise<void>}
   */
  setDoc(path: string, data: any): Promise<void> {
    return setDoc(this.docRef(path), this.payloadForSet(data));
  }

  set$<T>(path: string, data: any, options?: SetOptions): Observable<T> {
    return new Observable((observer: Observer<any>) => {
      const payload = this.payloadForSet(data);

      // console.log(path, data, options);
      const p: Promise<void> = options
        ? setDoc(this.docRef(path), payload, options)
        : setDoc(this.docRef(path), payload);
      p.then(() => {
        observer.next(removeTimeStampCTorFromData(payload));
        observer.complete();
      }).catch((e: any) => {
        console.log('error');
        console.log(e);
        observer.error(e);
      });
    });
  }

  setWithoutTimestamp<T>(path: string, data: any): Promise<void> {
    return setDoc(
      this.docRef(path),
      {
        ...data
      },
      { merge: true }
    );
  }

  /**
   * adds updatedAt field do document
   * @param path
   * @param data
   */
  merge$<T>(path: string, data: any): Observable<Exists<T>> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return new Observable((observer: Observer<any>) => {
      setDoc(that.docRef(path), that.payloadForUpdate(data), { merge: true })
        .then(() => {
          // console.log('result', result);
          // Get data after it is set

          getDoc(that.docRef(path))
            .then((setSnap: DocumentSnapshot) => {
              observer.next(<Exists<T>>{
                data: removeTimeStampCTorFromData(setSnap.data()),
                exists: true
              });
              observer.complete();
            })
            .catch(error => {
              observer.error(error);
            });
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   * Update firestore doc only if values updated
   * do not match value already set in firestore doc.
   * @param path
   */
  mergeIfValuesNotMatch$<T>(
    path: string,
    data: any,
    transformFn: (data: any) => any
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Observable((observer: Observer<T>) => {
      getDoc(that.docRef(path))
        .then((snap: DocumentSnapshot) => {
          if (snap.exists()) {
            if (!allValuesMatch(data, transformFn(snap.data()))) {
              setDoc(that.docRef(path), that.payloadForUpdate(data), {
                merge: true
              })
                .then(() => {
                  observer.next(data);
                  observer.complete();
                })
                .catch((error: any) => {
                  observer.error(error);
                });
            }
          } else {
            setDoc(that.docRef(path), that.payloadForUpdate(data), {
              merge: true
            })
              .then(() => {
                observer.next(data);
                observer.complete();
              })
              .catch((error: any) => {
                observer.error(error);
              });
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  update$<T>(path: string, data: any): Observable<Exists<T>> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return new Observable((observer: Observer<any>) => {
      updateDoc(that.docRef(path), that.payloadForUpdate(data))
        .then(() => {
          // console.log('result', result);
          // Get data after it is set

          getDoc(that.docRef(path))
            .then((setSnap: DocumentSnapshot) => {
              observer.next(<Exists<T>>{
                data: removeTimeStampCTorFromData(setSnap.data()),
                exists: true
              });
              observer.complete();
            })
            .catch(error => {
              observer.error(error);
            });
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  updateWithoutTimestamp<T>(path: string, data: any): Promise<void> {
    return setDoc(this.docRef(path), data, { merge: true });
  }

  deleteDoc<T>(path: string): Promise<void> {
    return deleteDoc(this.docRef(path));
  }

  deleteDoc$<T>(path: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      deleteDoc(this.docRef(path)).then(
        () => {
          observer.next(true);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  deleteDocs$<T>(basePath: string, ids: string[]): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const batch: WriteBatch = this.writeBatch();

      ids.forEach((id: string) => {
        batch.delete(this.docRef(`${basePath}/${id}`));
      });

      batch.commit().then(
        () => {
          observer.next(true);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  writeDocs$<T>(
    basePath: string,
    docs: FirestoreWriteEmailConfig[]
  ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const batch: WriteBatch = this.writeBatch();

      docs.forEach((d: FirestoreWriteEmailConfig) => {
        batch.set(this.docRef(`${basePath}/${d.id}`), d.doc);
      });

      batch.commit().then(
        () => {
          observer.next(true);
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  /**
   * adds createdAt field
   *
   * Usage:
   * db.add('items', data) })
   *
   * @param {CollectionPredicate<T>} ref
   * @param data
   * @returns {Promise<firebase.firestore.DocumentReference>}
   */
  addDoc<T>(path: string, data: any): Promise<DocumentReference> {
    return addDoc(this.collectionRef(path), this.payloadForSet(data));
  }

  /**
   * Usage:
   * const geopoint = this.db.geopoint(38, -119)
   * return this.db.add('items', { location: geopoint })
   *
   * @param {number} lat
   * @param {number} lng
   * @returns {firebase.firestore.GeoPoint}
   */
  geopoint(lat: number, lng: number): GeoPoint {
    return new GeoPoint(lat, lng);
  }

  /**
   * If doc exists update$, otherwise set
   *
   * Usage:
   * this.db.upsert('notes/xyz', { content: 'hello dude'})
   *
   * @param {DocPredicate<T>} ref
   * @param data
   * @returns {Promise<any>}
   */
  upsertDoc$<T>(path: string, data: any): Observable<Exists<T>> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    return new Observable((observer: Observer<any>) => {
      getDoc(this.docRef(path)).then((snap: DocumentSnapshot): any => {
        if (!snap.exists()) {
          that
            .setDoc(path, data)
            .then((result: any) => {
              // console.log('result', result);
              // Get data after it is set
              getDoc(that.docRef(path))
                .then((setSnap: DocumentSnapshot) => {
                  observer.next(<Exists<T>>{
                    data: removeTimestampCTorFromDocumentSnapshot(setSnap),
                    exists: true
                  });
                  observer.complete();
                })
                .catch(error => {
                  observer.error(error);
                });
            })
            .catch(error => {
              observer.error(error);
            });
        } else {
          that.merge$<T>(path, data).subscribe((r: Exists<T>) => {
            observer.next(r);
            observer.complete();
          });
        }
      });
    });
  }

  /**
   * Returns true if doc existed, false if not
   * Always returns data if not exists since it's created
   * @param path
   * @param data
   */
  setDocIfNotExist<T>(path: string, data: any): Observable<Exists<T>> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return new Observable((observer: Observer<any>) => {
      getDoc(this.docRef(path)).then((snap: DocumentSnapshot): any => {
        if (!snap.exists()) {
          setDoc(this.docRef(path), that.payloadForSet(data))
            .then(() => {
              // Get data after it is set
              getDoc(that.docRef(path))
                .then((setSnap: DocumentSnapshot) => {
                  observer.next(<Exists<T>>{
                    data: removeTimeStampCTorFromData(setSnap.data()),
                    exists: true
                  });
                  observer.complete();
                })
                .catch(error => {
                  console.error(error);
                  observer.error(error);
                });
            })
            .catch(error => {
              console.error(error);
              observer.error(error);
            });
        } else {
          observer.next(<Exists<T>>{
            data: removeTimestampCTorFromDocumentSnapshot(snap),
            exists: true
          });
          observer.complete();
        }
      });
    });
  }

  /**
   * If doc exists update$, otherwise set
   *
   * Usage:
   * this.db.upsert('notes/xyz', { content: 'hello dude'})
   *
   * @param {DocPredicate<T>} path
   * @param data
   * @returns {Promise<any>}
   */
  setDocMerge<T>(path: string, data: any): Observable<Exists<T>> {
    // console.log(path, data);
    return new Observable((observer: Observer<Exists<T>>) => {
      getDoc(this.docRef(path)).then((snap: DocumentSnapshot): any => {
        // console.log(snap);

        if (!snap.exists) {
          const payload = this.payloadForSet(data);

          // use .set with merge true
          setDoc(this.docRef(path), payload, { merge: true })
            .then(() => {
              // console.log(path, payload);
              observer.next(<Exists<T>>{
                data: <T>removeTimeStampCTorFromData(payload),
                exists: true
              });
              observer.complete();
            })
            .catch((e: any) => {
              console.log(e);
              observer.error(e);
            });
        } else {
          // Get the entire document
          const rootData: any = snap.data();

          if (hasValue(rootData)) {
            const payload = this.payloadForUpdate(data);

            setDoc(this.docRef(path), payload, { merge: true })
              .then(() => {
                observer.next(<Exists<T>>{
                  data: <T>removeTimeStampCTorFromData(payload),
                  exists: true
                });
                observer.complete();
              })
              .catch((e: any) => {
                observer.error(e);
              });
          } else {
            // use .set with merge true
            const payload = this.payloadForSet(data);
            setDoc(this.docRef(path), payload, { merge: true })
              .then(() => {
                observer.next(<Exists<T>>{
                  data: <T>removeTimeStampCTorFromData(payload),
                  exists: true
                });
                observer.complete();
              })
              .catch((e: any) => {
                observer.error(e);
              });
          }
        }
      });
    });
  }

  mergeAndReturnPayload$<T>(path: string, data: any): Observable<Exists<T>> {
    return new Observable((observer: Observer<any>) => {
      const payload = this.payloadForSet(data);

      setDoc(this.docRef(path), payload, { merge: true })
        .then(() => {
          observer.next(<Exists<T>>{
            data: <T>removeTimeStampCTorFromData(payload),
            exists: true
          });
          observer.complete();
        })
        .catch((e: any) => {
          observer.error(e);
        });
    });
  }

  payloadForSet(_data: any): any {
    const timestamp: FieldValue = this.timestamp;

    const data = JSON.parse(JSON.stringify(_data));

    const payload: any = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    return payload;
  }

  payloadForUpdate(_data: any): any {
    const timestamp: FieldValue = this.timestamp;

    const data = JSON.parse(JSON.stringify(_data));

    delete data.createdAt;
    delete data.updatedAtSeconds;

    const payload: any = {
      ...data,
      updatedAt: timestamp
    };

    return payload;
  }

  /// **************
  /// Inspect Data
  /// **************

  /**
   * Usage:
   * this.db.inspectDoc('notes/xyz')
   *
   * @param {DocPredicate<any>} ref
   */
  inspectDoc(path: string): void {
    const tick: number = new Date().getTime();

    getDoc(this.docRef(path)).then((r: any) => {
      const tock: number = new Date().getTime() - tick;
      console.log(`Loaded Document in ${tock}ms`, r);
    });
  }

  /**
   * Usage:
   * this.db.inspectCol('notes')
   *
   * @param {CollectionPredicate<any>} path
   */
  inspectCol(path: string): void {
    const tick: number = new Date().getTime();

    getDocs(this.collectionRef(path)).then((r: any) => {
      const tock: number = new Date().getTime() - tick;
      console.log(`Loaded Collection in ${tock}ms`, r);
    });
  }

  /// **************
  /// Create and read doc references
  /// **************
  /// create a reference between two documents
  // connect<T>(host: string, key: string, doc: string): Promise<void | T> {
  //   return this.docData(host).then((d: unknown | T) => {
  //     if (d) {
  //       updateDoc(this.docRef(host), {[key]: <T>d});
  //     }
  //     // this.doc(host).update$({[key]: d});
  //   });
  //
  //   // return updateDoc(this.docRef(host), {[key]: this.docRef(doc)});
  //   // return this.doc(host).update$({[key]: this.doc(doc)});
  // }

  writeBatch() {
    return writeBatch(this.db);
  }

  httpsCallable<R, T>(functionName: string): HttpsCallable<R, T> {
    return httpsCallable(this.functions, functionName);
  }

  getDownloadURL(url: string): Promise<string> {
    return getDownloadURL(ref(this.storage, url));
  }

  getBlobFromStorage(url: string): Promise<Blob> {
    const storageRef = ref(this.storage, url);
    return getBlob(storageRef);
  }

  deleteObjectFromStorage(url: string) {
    const desertRef = ref(this.storage, url);
    return deleteObject(desertRef);
  }

  deleteManyObjectsFromStorage(urls: string[]) {

    const refs: StorageReference[] = urls.map((url: string) => {
      return ref(this.storage, url);
    });

    const promises: Promise<void>[] = refs.map((ref: StorageReference) => {
      return deleteObject(ref);
    });

    return Promise.allSettled(promises);
  }

  /// **************
  /// Atomic batch example
  /// **************
  /// Just an example, you will need to customize this method.
  atomic(): Promise<void> {
    // Get a new write batch
    const batch = writeBatch(this.db);

    /// add your operations here
    const itemDoc: DocumentReference = this.docRef('items/myCoolItem');
    const userDoc: DocumentReference = this.docRef('users/userId');
    const currentTime: FieldValue = this.timestamp;
    batch.update(itemDoc, { timestamp: currentTime });
    batch.update(userDoc, { timestamp: currentTime });

    /// commit operations
    return batch.commit();
  }

  logoutFirebase$(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      this.auth
        .signOut()
        .then(() => {
          // this.clearIndexedDbPersistence().then(() => {
          //   /* noo */
          // });

          observer.next(true);
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  /**
   * Call the 'recursiveDelete' callable function with a path to initiate
   * a server-side delete.
   */
  deleteAtPath(path: string) {
    return new Observable((observer: Observer<boolean>) => {
      const deleteFn = httpsCallable(this.functions, 'recursiveDelete');
      deleteFn({ path: path })
        .then(function(result) {
          // console.log('Delete success: ' + JSON.stringify(result));
          observer.next(true);
          observer.complete();
        })
        .catch(function(err) {
          console.log('Delete failed, see console,');
          console.warn(err);
          observer.error(err);
        });
    });
  }

  /**
   * TODO Move to it's own getService
   * @param key
   */
  // setWebSocketConnected(key: string): void {
  //   this.store.pipe(select(selectNgPatGetWebSocketIdConnected(key)), take(1)).subscribe((connected: boolean) => {
  //     // Only dispatch action if websocket is not connected
  //     if (!connected) {
  //       this.store.dispatch(
  //         ngPatWebsocketIsConnectedAction({
  //           id: key
  //         })
  //       );
  //     }
  //   });
  // }

  // setWebSocketDisconnected(key: string): void {
  //   this.store.dispatch(
  //     ngPatWebsocketIsDisconnectedAction({
  //       id: key
  //     })
  //   );
  // }

  // getSocketIsConnected(key: string): Observable<boolean> {
  //   return this.store.pipe(select(selectNgPatGetWebSocketIdConnected(key)), take(1));
  // }

  removeTimeStampCTorFromData<T>(data: { createdAt: any; updatedAt: any }): T {
    return removeTimeStampCTorFromData(data);
  }

  removeTimeStampCTorFromDocumentData<T>(
    snap: DocumentSnapshot<DocumentData>
  ): T {
    return removeTimestampCTorFromDocumentSnapshot(snap);
  }

  signInWithPopup(
    provider: AuthProvider,
    resolver?: PopupRedirectResolver
  ): Promise<UserCredential> {
    return this.setPersistence().then(() => {
      return signInWithPopup(this.auth, provider, resolver);
    });
  }

  /**
   *
   * @param collectionPath
   * @param fieldPath
   * @param opStr
   * @param value
   */
  queryCollection<T>(
    collectionPath: string,
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: unknown
  ): Observable<T[]> {
    return new Observable((observer: Observer<T[]>) => {
      const q: Query<DocumentData> = query(
        this.collectionRef(collectionPath),
        where(fieldPath, opStr, value)
      );

      getDocs(q)
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          if (querySnapshot.size) {
            const docs: T[] = [];

            querySnapshot.forEach(
              (doc: QueryDocumentSnapshot<DocumentData>) => {
                docs.push(removeTimestampCTorFromDocumentSnapshot(doc));
              }
            );

            observer.next(docs);
          } else {
            observer.error('No Found');
          }
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  signInWithRedirect(
    provider: AuthProvider,
    resolver?: PopupRedirectResolver
  ): Promise<never> {
    return this.setPersistence().then(() => {
      return signInWithRedirect(this.auth, provider, resolver);
    });
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.setPersistence().then(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
  }

  signInWithCustomToken(customToken: string): Promise<UserCredential> {
    return this.setPersistence().then(() => {
      return signInWithCustomToken(this.auth, customToken);
    });
  }

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return this.setPersistence().then(() => {
      return createUserWithEmailAndPassword(this.auth, email, password);
    });
  }

  sendPasswordResetEmail(
    email: string,
    actionCodeSettings?: ActionCodeSettings
  ): Promise<void> {
    return this.setPersistence().then(() => {
      return sendPasswordResetEmail(this.auth, email, actionCodeSettings);
    });
  }

  setPersistence(
    persistence: Persistence = browserLocalPersistence
  ): Promise<void> {
    return setPersistence(this.auth, persistence);
  }

  clearIndexedDbPersistence() {
    return clearIndexedDbPersistence(this.db);
  }

  initialize(): void {
    /* noop */
  }

  // REMOTE CONFIG

  getRemoteConfig(key: string): Value {
    return getValue(this.remoteConfig, key);
  }

  getAllRemoteConfig(): Record<string, Value> {
    return getAll(this.remoteConfig);
  }
}
