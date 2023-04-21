import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  tap
} from 'rxjs/operators';

import { NgPatAccountService } from './ng-pat-account.service';
import {
  selectNgPatAllDisconnectedFn,
  selectNgpatDoConnect
} from '../+websocket-registry/websocket-registry.selectors';
import { selectNgPatAccountState } from './account.selectors';
import {
  ngPatAccountLoadedFromAuthStateChange,
  ngPatAccountSaveFirebase,
  ngPatAuthError,
  ngPatLoggedOut,
  ngPatLogout
} from './account.actions';
import {
  NgPatAccountState,
  NgPatAccountStateConnect,
  NgPatUserAccount
} from './account.model';
import {
  accountIsLoaded,
  addMissingUserAccountProperties,
  createAccountStateFromFirestore,
  createFirestoreUserAccountFromAuth,
  hasAllUserAccountProperties
} from './account.fns';
import { of } from 'rxjs';
import { User } from 'firebase/auth';
import {
  FirebaseAnalyticEventParams,
  NgPatFirestoreService
} from '@ngpat/firebase';
import { ngPatDoDisconnectAndRemoveLocalStorageItem } from '../+local-storage/local-storage.actions';

@Injectable({ providedIn: 'root' })
export class NgPatAccountEffects {
  saveAccountToFirebase$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ngPatAccountSaveFirebase),
        switchMap(action => {
          return this._accountService.saveToFirebase(action.payload);
        })
      );
    },
    { dispatch: false }
  );

  $logout = createEffect(() => {
    return this.actions$.pipe(
      ofType(ngPatLogout),

      // Tell all WebSockets to disconnect
      map(() => {
        return ngPatDoDisconnectAndRemoveLocalStorageItem({ id: 'redirect' });
      })
    );
  });

  doDisconnectAndRemoveLocalStorageItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ngPatDoDisconnectAndRemoveLocalStorageItem),
      // Listen for when all WebSockets are disconnected
      mergeMap(() =>
        this.store.select(selectNgPatAllDisconnectedFn).pipe(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          filter((allDisconnected: boolean) => allDisconnected),
          distinctUntilChanged(),
          take(1),
          // Sign out of app
          switchMap(() => {
            return this._firestore.logoutFirebase$();
          }),

          tap(() => {
            if ((<any>window).FB && (<any>window).FB.logout) {
              try {
                // (<any>window).FB.ngPatLogout(function (response: any) {
                // });
              } catch (e) {
                console.error(e);
              }
            }
          }),
          map(() => {
            return ngPatLoggedOut();
          }),

          catchError((r: any) => {
            return of(
              ngPatAuthError({ payload: { code: r.code, message: r.message } })
            );
          })
        )
      )
    );
  });

  // setLinkCodeOnAccount$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(ngPatSetGuardianCodeOnAccount),
  //       switchMap(action => {
  //         return this._accountService.saveToFirebase({
  //           linkCode: action.code
  //         });
  //       })
  //     )
  //   },
  //   { dispatch: false }
  // );

  // addChildAccount$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(ngPatAddMonitorAccount),
  //       concatLatestFrom(() => this.store.select(selectNgPatLoggedInUID)),
  //       switchMap(([ action, uid ]: [ { code: string }, string | null ]) =>
  //           this._accountService
  //             .linkMonitoringAccount(action.code, <string>uid)
  //         // .pipe(
  //         //   tap((r: any) => {
  //         //     console.log(r);
  //         //   })
  //         // )
  //       )
  //     )
  //   },
  //   { dispatch: false }
  // );

  // private firestorePermissionsSub: (() => void) | undefined;

  constructor(
    private actions$: Actions,
    private _accountService: NgPatAccountService,
    private locationService: Location,
    private store: Store,
    private _firestore: NgPatFirestoreService,
    private zone: NgZone
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    this._firestore.user$
      .pipe(
        mergeMap((user: User) => {
          const userAccount: NgPatUserAccount =
            createFirestoreUserAccountFromAuth(user);

          return this._accountService.createAccountIfNotExist(userAccount).pipe(
            switchMap((f: NgPatUserAccount) => {
              const hasAllProperties = hasAllUserAccountProperties(f);

              if (!hasAllProperties) {
                return this._accountService.updateUserAccount$(
                  addMissingUserAccountProperties(f)
                );
              }

              return of(f);
            }),
            map((f: NgPatUserAccount) => {
              return <NgPatAccountState>{
                ...createAccountStateFromFirestore(f, user)
              };
            })
          );
        })
      )
      .subscribe((account: NgPatAccountState) => {
        that.zone.run(() => {
          that.store.dispatch(
            ngPatAccountLoadedFromAuthStateChange({
              payload: account
            })
          );
        });
      });

    // analytics
    this.store
      .select(selectNgPatAccountState)
      .pipe(
        filter(accountIsLoaded),
        distinctUntilKeyChanged('uid'),
        mergeMap((user: NgPatAccountState) =>
          this.store.select(selectNgpatDoConnect).pipe(
            distinctUntilChanged(),
            map((doConnect: boolean) => {
              return <NgPatAccountStateConnect>{
                doConnect,
                user
              };
            })
          )
        )
      )
      .subscribe(({ doConnect, user }: NgPatAccountStateConnect) => {
        const params: FirebaseAnalyticEventParams = {
          uid: user.uid,
          displayName: user.displayName
        };

        this._firestore.logEvent(
          doConnect ? 'app_active' : 'app_inactive',
          params
        );
      });
  }
}
