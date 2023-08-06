import { Action, Store } from '@ngrx/store';
import { DocumentData, DocumentSnapshot, onSnapshot } from 'firebase/firestore';
import { Injectable, NgZone } from '@angular/core';
import { DocumentReference } from '@firebase/firestore';
import { NgPatFirestoreService } from './ng-pat-firestore.service';

export interface FirestoreDocConfig<T> {
  updateAction?: (payload: T) => Action;
  deleteAction?: () => Action;

  updateUpdater?: (payload: T) => void;
  deleteUpdater?: () => void;
  mapFirestoreID?: boolean;
  logUpsert?: boolean;
}

export interface DocModel<T> {
  onConnect(path: string, uid: string): void;

  onDisconnect(): void;

  process(
    snapshot: DocumentSnapshot<DocumentData>,
    parentID: string | null
  ): void;
}

export class NgPatFirestoreDocQuery<T> implements DocModel<T> {
  private _firebaseSub: (() => void) | undefined | null = null;

  constructor(
    private _config: FirestoreDocConfig<T>,
    private _zone: NgZone,
    private store: Store,
    private _customFirestore: NgPatFirestoreService
  ) {}

  onConnect(
    path: string,
    parentID: string | null = null,
    uid: string | null = null
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    if (this._firebaseSub) {
      this._firebaseSub();
    }

    const _pathRef: DocumentReference<DocumentData> =
      this._customFirestore.docRef(path);

    // if (this._config.queryMember && uid) {
    //   _queryRef = query(_pathRef, where('memberUIDs', 'array-contains', uid));
    // }

    this._firebaseSub = onSnapshot(
      _pathRef,
      // .where('fileUploaded', '==', true)
      (snapshot: DocumentSnapshot<DocumentData>) => {
        that.process.apply(that, [snapshot]);
      },
      () => {
        /* noop */
      },
      () => {
        /* noop */
      }
    );
  }

  onDisconnect(uid: string | null = null) {
    if (this._firebaseSub) {
      this._firebaseSub();
      this._firebaseSub = null;
    }
  }

  process(snapshot: DocumentSnapshot<DocumentData>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const mapFirestoreID: boolean =
      this._config.mapFirestoreID !== undefined &&
      this._config.mapFirestoreID !== null
        ? this._config.mapFirestoreID
        : false;

    const data: DocumentData | undefined = snapshot.data();

    that._zone.run(() => {
      if (snapshot.exists() && data) {
        if (that._config.updateAction) {
          that.store.dispatch(that._config.updateAction(<T>data));
        }

        if (that._config.updateUpdater) {
          that._config.updateUpdater(<T>data);
        }
      } else {
        if (that._config.deleteAction) {
          that.store.dispatch(that._config.deleteAction());
        }

        if (that._config.deleteUpdater) {
          that._config.deleteUpdater();
        }
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class NgPatFirestoreDocQueryFactory {
  constructor(
    private zone: NgZone,
    private store: Store,
    private customFirestore: NgPatFirestoreService
  ) {}

  /**
   *
   * @param config: FirestoreDocConfig<T>
   */
  createFirestoreDocQuery<T>(config: FirestoreDocConfig<T>) {
    return new NgPatFirestoreDocQuery(
      config,
      this.zone,
      this.store,
      this.customFirestore
    );
  }
}
