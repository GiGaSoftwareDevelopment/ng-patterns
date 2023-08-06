import {
  DocumentChange,
  DocumentData,
  onSnapshot,
  query,
  QueryConstraint,
  QuerySnapshot,
  where
} from 'firebase/firestore';
import {
  addParentIDToAggregateDocChanges,
  aggregateDocChangesFns
} from '../fns/aggregate-doc-changes.fns';
import { Injectable, NgZone } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { NgPatFirestoreService } from './ng-pat-firestore.service';
import { NgPatAggregateFirebaseSnapshotChanges } from '../models/firestore.model';

export interface FirestoreCollectionQueryConfig<T> {
  queryConstrains?: QueryConstraint[];
  queryMember: boolean;
  upsertManyAction?: (payload: T[]) => Action;
  updateManyAction?: (payload: T[]) => Action;
  deleteManyAction?: (ids: string[]) => Action;

  upsertManyUpdater?: (payload: T[]) => void;
  updateManyUpdater?: (payload: T[]) => void;
  deleteManyUpdater?: (ids: string[]) => void;
  mapFirestoreID?: boolean;
  logUpsert?: boolean;
}

export interface QueryModel<T> {
  onConnect(path: string, uid: string): void;

  onDisconnect(): void;

  process(
    snapshot: DocumentChange<DocumentData>[],
    parentID: string | null
  ): void;
}

export class NgPatFirestoreCollectionQuery<T> implements QueryModel<T> {
  private _firebaseSub: (() => void) | undefined | null = null;

  constructor(
    private _config: FirestoreCollectionQueryConfig<T>,
    private _zone: NgZone,
    private store: Store,
    private _customFirestore: NgPatFirestoreService
  ) {}

  onConnect(
    path: string,
    parentID: string | null = null,
    uid: string | null = null,
    queryConstraints: QueryConstraint[] = []
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    if (this._config.queryMember && !uid) {
      return;
    }

    if (this._firebaseSub) {
      this._firebaseSub();
    }

    const _pathRef = this._customFirestore.collectionRef(path);

    let _queryRef = undefined;
    let _queryConstraints: QueryConstraint[] = [];

    if (this._config.queryMember && uid) {
      _queryConstraints = [where('memberUIDs', 'array-contains', uid)];
    }

    if (queryConstraints && queryConstraints.length > 0) {
      _queryConstraints = [..._queryConstraints, ...queryConstraints];
    }

    if (
      this._config.queryConstrains &&
      this._config.queryConstrains.length > 0
    ) {
      _queryConstraints = [
        ..._queryConstraints,
        ...this._config.queryConstrains
      ];
    }

    if (_queryConstraints && _queryConstraints.length > 0) {
      _queryRef = query(_pathRef, ..._queryConstraints);
    }

    // if (this._config.queryMember && uid) {
    //   _queryRef = query(_pathRef, where('memberUIDs', 'array-contains', uid));
    // }

    this._firebaseSub = onSnapshot(
      _queryRef ? _queryRef : _pathRef,
      // .where('fileUploaded', '==', true)
      (snapshot: QuerySnapshot) => {
        that.process.apply(that, [snapshot.docChanges(), parentID]);
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

  process(snapshot: DocumentChange<DocumentData>[], parentID: string | null) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const mapFirestoreID: boolean =
      this._config.mapFirestoreID !== undefined &&
      this._config.mapFirestoreID !== null
        ? this._config.mapFirestoreID
        : false;
    let aggregate: NgPatAggregateFirebaseSnapshotChanges<T> =
      aggregateDocChangesFns<T>(snapshot, 'id', mapFirestoreID);

    if (parentID) {
      aggregate = addParentIDToAggregateDocChanges(aggregate, parentID);
    }

    that._zone.run(() => {
      if (aggregate.added.length) {
        if (this._config.upsertManyAction) {
          if (this._config.logUpsert) {
            console.log(JSON.stringify(aggregate.added[0], null, 2));
          }

          that.store.dispatch(this._config.upsertManyAction(aggregate.added));
        }

        if (this._config.upsertManyUpdater) {
          this._config.upsertManyUpdater(aggregate.added);
        }
      }

      if (aggregate.modified.length) {
        if (this._config.updateManyAction) {
          that.store.dispatch(
            this._config.updateManyAction(aggregate.modified)
          );
        }

        if (this._config.updateManyUpdater) {
          this._config.updateManyUpdater(aggregate.modified);
        }
      }

      if (aggregate.removed.length) {
        if (this._config.deleteManyAction) {
          that.store.dispatch(this._config.deleteManyAction(aggregate.removed));
        }

        if (this._config.deleteManyUpdater) {
          this._config.deleteManyUpdater(aggregate.removed);
        }
      }
    });
  }
}

export interface FirestoreCollectionQueryFactoryConfig<T> {
  createFirestoreCollectionQuery: () => NgPatFirestoreCollectionQuery<T>;
}

export function ngPatFirestoreCollectionQueryFactory<T>(
  _config: FirestoreCollectionQueryConfig<T>,
  _zone: NgZone,
  _store: Store,
  _customFirestore: NgPatFirestoreService
): FirestoreCollectionQueryFactoryConfig<T> {
  return {
    createFirestoreCollectionQuery: () => {
      return new NgPatFirestoreCollectionQuery(
        _config,
        _zone,
        _store,
        _customFirestore
      );
    }
  };
}

@Injectable({
  providedIn: 'root'
})
export class NgPatFirestoreCollectionQueryFactory {
  constructor(
    private zone: NgZone,
    private store: Store,
    private customFirestore: NgPatFirestoreService
  ) {}

  /**
   *
   * @param config: FirestoreCollectionQueryConfig
   */
  createFirestoreCollectionQuery<T>(config: FirestoreCollectionQueryConfig<T>) {
    return new NgPatFirestoreCollectionQuery(
      config,
      this.zone,
      this.store,
      this.customFirestore
    );
  }
}
