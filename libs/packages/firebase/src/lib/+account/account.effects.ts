import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  catchError,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { AccountService } from './account.service';
import { selectAllDisconnectedFn, selectDoConnect } from '../+websocket-registry/websocket-registry.selectors';
import { selectAccountState, selectLoggedInUID } from './account.selectors';
import {
  accountLoadedFromAuthStateChange,
  accountSaveFirebase,
  addMonitorAccount,
  authError,
  loggedOut,
  logout,
  setGuardianCodeOnAccount
} from './account.actions';
import { AccountState, AccountStateConnect, UserAccount } from './account.model';
import {
  accountIsLoaded,
  addMissingUserAccountProperties,
  createAccountStateFromFirestore,
  createFirestoreUserAccountFromAuth,
  hasAllUserAccountProperties
} from './account.fns';
import { serviceDoDisconnectAction } from '../+websocket-registry/websocket-registry.actions';
import { of } from 'rxjs';
import { User } from 'firebase/auth';
import { CustomFirestoreService } from '../services/custom-firestore.service';
import { FirebaseAnalyticEventParams } from '../models/analytics';
import { removeBrowserStorageItem } from '@uiux/store';

@Injectable({providedIn: 'root'})
export class UiuxAccountEffects {
  saveAccountToFirebase$ = createEffect(
    () =>
      { return this.actions$.pipe(
        ofType(accountSaveFirebase),
        switchMap(action => {
          return this._accountService.saveToFirebase(action.payload);
        })
      ) },
    {dispatch: false}
  );

  $logout = createEffect(() => {
    return this.actions$.pipe(
      ofType(logout),

      // Tell all WebSockets to disconnect
      tap(() => {
        this.zone.run(() => {
          this.store.dispatch(serviceDoDisconnectAction());
          this.store.dispatch(removeBrowserStorageItem({ id: 'redirect'}));
        });


      }),

      // Listen for when all WebSockets are disconnected
      mergeMap(() =>
        this.store.pipe(
          select(selectAllDisconnectedFn()),
          // tap(allDisconnected => {
          //   console.log(`selectAllDisconnected -> ${allDisconnected} `);
          // }),
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
                // (<any>window).FB.logout(function (response: any) {
                // });
              } catch (e) {
                console.error(e);
              }
            }
          }),
          map(() => {
            return loggedOut();
          }),

          catchError((r: any) => {
            return of(authError({payload: {code: r.code, message: r.message}}));
          })
        )
      )
    );
  });

  setLinkCodeOnAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setGuardianCodeOnAccount),
        switchMap(action => {
          return this._accountService.saveToFirebase({
            linkCode: action.code
          });
        })
      ),
    {dispatch: false}
  );

  addChildAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addMonitorAccount),
        withLatestFrom(this.store.pipe(select(selectLoggedInUID))),
        switchMap(([action, uid]: [{code: string}, string | null]) =>
          this._accountService
            .linkMonitoringAccount(action.code, <string>uid)
            .pipe(
              tap((r: any) => {
                console.log(r);
              })
            )
        )
      ),
    {dispatch: false}
  );

  private firestorePermissionsSub: (() => void) | undefined;

  constructor(
    private actions$: Actions,
    private _accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: Location,
    private store: Store,
    private _firestore: CustomFirestoreService,
    private zone: NgZone,
  ) {
    const that = this;

    this._firestore.user$
      .pipe(
        mergeMap((user: User) => {
          const userAccount: UserAccount =
            createFirestoreUserAccountFromAuth(user);

          return this._accountService.createAccountIfNotExist(userAccount).pipe(
            switchMap((f: UserAccount) => {
              const hasAllProperties = hasAllUserAccountProperties(f);

              if (!hasAllProperties) {
                return this._accountService.updateUserAccount$(
                  addMissingUserAccountProperties(f)
                );
              }

              return of(f);
            }),
            map((f: UserAccount) => {
              return <AccountState>{
                ...createAccountStateFromFirestore(f, user)
              };
            })
          );
        })
      )
      .subscribe((account: AccountState) => {
        that.zone.run(() => {
          that.store.dispatch(
            accountLoadedFromAuthStateChange({
              payload: account
            })
          );
        });
      });

    // analytics
    this.store
      .pipe(
        select(selectAccountState),
        filter(accountIsLoaded),
        distinctUntilKeyChanged('uid'),
        mergeMap((user: AccountState) =>
          this.store.pipe(
            select(selectDoConnect),
            distinctUntilChanged(),
            map((doConnect: boolean) => {
              return <AccountStateConnect>{
                doConnect,
                user
              };
            })
          )
        )
      )
      .subscribe(({doConnect, user}: AccountStateConnect) => {
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
