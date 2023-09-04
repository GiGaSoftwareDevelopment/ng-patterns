import { Injectable } from '@angular/core';
import {
  Exists,
  firestoreUserAccountDoc,
  NgPatFirestoreService,
  removeTimestampCTorFromDocumentSnapshot
} from '@ngpat/firebase';
import { Store } from '@ngrx/store';
import { DocumentData, DocumentSnapshot, onSnapshot } from 'firebase/firestore';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { NgPatServiceConnector } from '../+websocket-registry/ng-pat-service-connector';
import { ngPatUpsertWebsocketRegistry } from '../+websocket-registry/websocket-registry.actions';
import { NgPatFirebaseConnectionService } from '../+websocket-registry/websocket-registry.models';
import { connectNgPatToFirestore$ } from '../+websocket-registry/websocket-registry.selectors';
import { ngPatAccountLoadedFromSnapshotChanges } from './account.actions';
import { getAccountProperties } from './account.fns';
import { ngPatAccountFeatureKey, NgPatAccountState, NgPatAccountStateConnect, NgPatUserAccount } from './account.model';
import { selectNgPatAccountState, selectNgPatIsUserAuthenticated } from './account.selectors';

@Injectable({
  providedIn: 'root'
})
export class NgPatAccountService implements NgPatFirebaseConnectionService {
  private accountChangesSub: (() => void) | undefined | null;
  private subscriptionsSub: (() => void) | undefined | null;
  private _isConnected$: BehaviorSubject<boolean>;

  connectionKey = ngPatAccountFeatureKey;
  connection: NgPatServiceConnector = new NgPatServiceConnector(this, this.store);

  constructor(
    private store: Store,
    private _firestore: NgPatFirestoreService,
  ) {
    this._isConnected$ = new BehaviorSubject<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    that.store.dispatch(
      ngPatUpsertWebsocketRegistry({
        id: ngPatAccountFeatureKey
      })
    );

    /**
     * This getService receives the user account information.
     *
     * Some services are dependent on information from the user account.
     * Therefore, the user account is needed from firestore first ( even upon creation )
     * before all services can connect to firestore.
     *
     * The rest of the services listen to 'doConnect' rather than 'isAuthenticated' to
     * connect to firestore to ensure the user's complete account profile is used
     * upon connection.
     */
    combineLatest([
      this.store
        .select(selectNgPatIsUserAuthenticated)
        .pipe(distinctUntilChanged<boolean>()),
      this.store.pipe(connectNgPatToFirestore$)
    ]).subscribe(
      ([isAuthenticated, account]: [boolean, NgPatAccountStateConnect]) => {
        if (isAuthenticated) {
          this._isConnected$
            .pipe(
              take(1),
              filter((isConnected: boolean) => !isConnected)
            )
            .subscribe(() => {
              this.onConnect.call(this, account.user);
            });
        } else if (!account.doConnect) {
          this.onDisconnect.call(this);
        }
      }
    );
  }

  createAccountIfNotExist(
    userAccount: NgPatUserAccount
  ): Observable<NgPatUserAccount> {
    return this._firestore
      .setDocIfNotExist<NgPatUserAccount>(
        firestoreUserAccountDoc(<string>userAccount.uid),
        userAccount
      )
      .pipe(
        map((d: Exists<NgPatUserAccount>) => {
          return d.data;
        })
      );
  }

  updateUserAccount$(
    userAccount: NgPatUserAccount
  ): Observable<NgPatUserAccount> {
    return this._firestore
      .upsertDoc$<NgPatUserAccount>(
        firestoreUserAccountDoc(<string>userAccount.uid),
        userAccount
      )
      .pipe(
        map((d: Exists<NgPatUserAccount>) => {
          return d.data;
        })
      );
  }

  saveToFirebase(account: Partial<NgPatAccountState>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return this.store.pipe(
      connectNgPatToFirestore$,
      filter((d: NgPatAccountStateConnect) => d.doConnect),
      take(1),
      withLatestFrom(this.store.select(selectNgPatAccountState)),
      switchMap(
        ([d, _state]: [NgPatAccountStateConnect, NgPatAccountState]) => {
          const _updateAccount: NgPatAccountState = {
            ..._state,
            ...account
          };

          return that._firestore.upsertDoc$<NgPatAccountState>(
            firestoreUserAccountDoc(
              <string>d.user.uid,
              this._firestore.databasePaths?.users
            ),
            getAccountProperties({ ..._updateAccount })
          );
        }
      )
    );
  }

  // linkMonitoringAccount(code: string, loggedInUID: string) {
  //   console.log(code, loggedInUID);
  //
  //   return this._firestore
  //     .queryCollection(firestoreUserCollection(this.config.databasePaths?.users), 'linkCode', '==', code)
  //     .pipe(
  //       switchMap((accounts: unknown[] | NgPatAccountState[]) => {
  //         if (accounts && accounts.length) {
  //           const batch: WriteBatch = this._firestore.writeBatch();
  //
  //           // USERS TO MENTOR
  //           const mentoringMeUID: string = (<NgPatAccountState>accounts[0])
  //             .uid as string;
  //
  //           const mentoringMeAccountsPathDoc = this._firestore.docRef(
  //             firestoreUserAccountDoc(mentoringMeUID)
  //           );
  //
  //           batch.update(mentoringMeAccountsPathDoc, {
  //             [`mentoringMeAccounts.${loggedInUID}`]: true
  //           });
  //
  //           // LOGGED IN USER
  //
  //           const mentoringAccountsPathDoc = this._firestore.docRef(
  //             firestoreUserAccountDoc(loggedInUID)
  //           );
  //           batch.update(mentoringAccountsPathDoc, {
  //             [`mentoringAccounts.${mentoringMeUID}`]: true
  //           });
  //
  //           return from(batch.commit());
  //         }
  //
  //         return of(false);
  //       })
  //     );
  // }

  onConnect(user: NgPatAccountState): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this._isConnected$.next(true);

    if (user && user.uid) {
      /**
       * SUBSCRIPTION
       */
      if (this.subscriptionsSub) {
        this.subscriptionsSub();
      }

      if (!this.accountChangesSub) {
        /**
         * ACCOUNT
         */
        this.accountChangesSub = onSnapshot(
          this._firestore.docRef(firestoreUserAccountDoc(user.uid)),
          (_doc: DocumentSnapshot<DocumentData>) => {
            if (_doc.exists()) {
              that.store.dispatch(
                /**
                 * Triggers 'doConnect' for all other services
                 */
                ngPatAccountLoadedFromSnapshotChanges({
                  payload: <NgPatAccountState>(
                    removeTimestampCTorFromDocumentSnapshot<DocumentData>(
                      _doc
                    )
                  )
                })
              );
            }
          }
        );
      }
    }
  }

  onDisconnect() {
    this._isConnected$.next(false);

    if (this.accountChangesSub) {
      this.accountChangesSub();
      this.accountChangesSub = null;
    }

  }
}
