import {Inject, Injectable, NgZone} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {DIALOG_COMPONENT, ngPatInitialDialogQueue} from './dialog-queue.model';
import {WINDOW} from '@ngpat/utils';
import {
  ngPatCloseDialog,
  ngPatLoadDialogQueues,
  ngPatOpenDialog
} from './dialog-queue.actions';
import {ngPatDialogsStoreIsLoaded$} from './dialog-queue.selectors';
import {combineLatest} from 'rxjs';
import {distinctUntilChanged, tap} from 'rxjs/operators';
import {selectNgPatIsOnboarded$} from '../+account/account.selectors';
import {NgPatPresenceService} from '../services/ng-pat-presence.service';

@Injectable({providedIn: 'root'})
export class NgPatDialogQueueEffects implements OnInitEffects {
  // ngPatOpenDialog$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ngPatCloseDialog),
  //       map(action => {
  //         if (
  //           action.id === DIALOG_COMPONENT.PRESENCE_OFFLINE ||
  //           action.id === DIALOG_COMPONENT.PRESENCE_IDLE
  //         ) {
  //           this.window.location.reload();
  //         }
  //       })
  //     ),
  //   {dispatch: false}
  // );

  ngPatLoadDialogQueues$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ngPatLoadDialogQueues),
        tap(() => {
          this.presence.init();
        })
      );
    },
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private dialog: MatDialog,
    private zone: NgZone,
    private presence: NgPatPresenceService,
    @Inject(WINDOW) private window: Window
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    combineLatest([
      this.store.pipe(ngPatDialogsStoreIsLoaded$, distinctUntilChanged()),
      this.store.pipe(selectNgPatIsOnboarded$, distinctUntilChanged())
    ]).subscribe(([isLoaded, isOnboarded]: [boolean, boolean]) => {
      if (isLoaded) {
        if (!isOnboarded) {
          that.zone.run(() => {
            that.store.dispatch(
              ngPatOpenDialog({id: DIALOG_COMPONENT.ONBOARD})
            );
          });
        } else {
          that.zone.run(() => {
            that.store.dispatch(
              ngPatCloseDialog({id: DIALOG_COMPONENT.ONBOARD})
            );
          });
        }
      }
    });
  }

  ngrxOnInitEffects(): Action {
    return ngPatLoadDialogQueues({
      dialogQueues: ngPatInitialDialogQueue
    });
  }
}
