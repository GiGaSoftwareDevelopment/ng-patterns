import {Inject, Injectable, NgZone} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  DocumentData,
  DocumentSnapshot,
  onSnapshot, QueryDocumentSnapshot,
  WriteBatch
} from 'firebase/firestore';

import {BehaviorSubject, combineLatest, from, Observable, of} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  withLatestFrom
} from 'rxjs/operators';
import {
  CustomFirestoreService,
  Exists, FIREBASE_APP_TOKEN, FirebaseAppConfig, firestoreUserAccountDoc, firestoreUserCollection,
  removeTimestampCTorFromDocumentSnapshot
} from '@uiux/firebase';
import {
  upsertWebsocketRegistry,
  websocketIsConnectedAction,
  websocketIsDisconnectedAction
} from '../+websocket-registry/websocket-registry.actions';
import {
  accountFeatureKey,
  AccountState,
  AccountStateConnect,
  UserAccount
} from './account.model';
import {accountLoadedFromSnapshotChanges} from './account.actions';
import {connectToFirestore$} from '../+websocket-registry/websocket-registry.selectors';
import {FirebaseConnectionService} from '../+websocket-registry/websocket-registry.models';
import {getAccountProperties} from './account.fns';
import {
  selectAccountState,
  selectIsUserAuthenticated
} from './account.selectors';



@Injectable({
  providedIn: 'root'
})
export class AccountService implements FirebaseConnectionService {
  private accountChangesSub: (() => void) | undefined | null;
  private subscriptionsSub: (() => void) | undefined | null;
  private _isConnected$: BehaviorSubject<boolean>;

  constructor(
    private store: Store,
    private _firestore: CustomFirestoreService,
    private _zone: NgZone,
    @Inject(FIREBASE_APP_TOKEN) private config: FirebaseAppConfig<any>
  ) {
    this._isConnected$ = new BehaviorSubject<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this._zone.run(() => {
      that.store.dispatch(
        upsertWebsocketRegistry({
          id: accountFeatureKey
        })
      );
    });

    /**
     * This service receives the user account information.
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
      this.store.select(
        selectIsUserAuthenticated).pipe(
        distinctUntilChanged<boolean>()
      ),
      this.store.pipe(connectToFirestore$)
    ]).subscribe(
      ([isAuthenticated, account]: [boolean, AccountStateConnect]) => {
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

  createAccountIfNotExist(userAccount: UserAccount): Observable<UserAccount> {
    return this._firestore
      .setDocIfNotExist<UserAccount>(
        firestoreUserAccountDoc(<string>userAccount.uid),
        userAccount
      )
      .pipe(
        map((d: Exists<UserAccount>) => {
          return d.data;
        })
      );
  }

  updateUserAccount$(userAccount: UserAccount): Observable<UserAccount> {
    return this._firestore
      .upsertDoc$<UserAccount>(
        firestoreUserAccountDoc(<string>userAccount.uid),
        userAccount
      )
      .pipe(
        map((d: Exists<UserAccount>) => {
          return d.data;
        })
      );
  }

  saveToFirebase(account: Partial<AccountState>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return this.store.pipe(
      connectToFirestore$,
      filter((d: AccountStateConnect) => d.doConnect),
      take(1),
      withLatestFrom(this.store.select(selectAccountState)),
      switchMap(([d, _state]: [AccountStateConnect, AccountState]) => {
        const _updateAccount: AccountState = {
          ..._state,
          ...account
        };

        return that._firestore.upsertDoc$<AccountState>(
          firestoreUserAccountDoc(<string>d.user.uid, this.config.databasePaths.user),
          getAccountProperties({..._updateAccount})
        );
      })
    );
  }

  linkMonitoringAccount(code: string, loggedInUID: string) {
    console.log(code, loggedInUID);

    return this._firestore
      .queryCollection(firestoreUserCollection(this.config.databasePaths.user), 'linkCode', '==', code)
      .pipe(
        switchMap((accounts: unknown[] | AccountState[]) => {
          if (accounts && accounts.length) {
            const batch: WriteBatch = this._firestore.writeBatch();

            // USERS TO MENTOR
            const mentoringMeUID: string = (<AccountState>accounts[0])
              .uid as string;

            const mentoringMeAccountsPathDoc = this._firestore.docRef(
              firestoreUserAccountDoc(mentoringMeUID)
            );

            batch.update(mentoringMeAccountsPathDoc, {
              [`mentoringMeAccounts.${loggedInUID}`]: true
            });

            // LOGGED IN USER

            const mentoringAccountsPathDoc = this._firestore.docRef(
              firestoreUserAccountDoc(loggedInUID)
            );
            batch.update(mentoringAccountsPathDoc, {
              [`mentoringAccounts.${mentoringMeUID}`]: true
            });

            return from(batch.commit());
          }

          return of(false);
        })
      );
  }

  onConnect(user: AccountState): void {
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

      that._zone.run(() => {
        that.store.dispatch(
          websocketIsConnectedAction({
            id: accountFeatureKey
          })
        );
      });

      if (!this.accountChangesSub) {
        /**
         * ACCOUNT
         */
        this.accountChangesSub = onSnapshot<DocumentData>(
          this._firestore.docRef(firestoreUserAccountDoc(user.uid)),
          (_doc: DocumentSnapshot<DocumentData>) => {
            if (_doc.exists()) {
              that._zone.run(() => {
                that.store.dispatch(
                  /**
                   * Triggers 'doConnect' for all other services
                   */
                  accountLoadedFromSnapshotChanges({
                    payload:
                      <AccountState>removeTimestampCTorFromDocumentSnapshot<DocumentData>(
                        _doc
                      )
                  })
                );
              });
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

    this._zone.run(() => {
      this.store.dispatch(
        websocketIsDisconnectedAction({
          id: accountFeatureKey
        })
      );
    });
  }
}
