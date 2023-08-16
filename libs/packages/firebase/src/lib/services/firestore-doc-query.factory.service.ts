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
    private config: FirestoreDocConfig<T>,
    private store: Store,
    private customFirestore: NgPatFirestoreService
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
      this.customFirestore.docRef(path);

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
      this.config.mapFirestoreID !== undefined &&
      this.config.mapFirestoreID !== null
        ? this.config.mapFirestoreID
        : false;

    const data: DocumentData | undefined = snapshot.data();

    if (snapshot.exists() && data) {
      if (that.config.updateAction) {
        that.store.dispatch(that.config.updateAction(<T>data));
      }

      if (that.config.updateUpdater) {
        that.config.updateUpdater(<T>data);
      }
    } else {
      if (that.config.deleteAction) {
        that.store.dispatch(that.config.deleteAction());
      }

      if (that.config.deleteUpdater) {
        that.config.deleteUpdater();
      }
    }
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
      this.store,
      this.customFirestore
    );
  }
}
