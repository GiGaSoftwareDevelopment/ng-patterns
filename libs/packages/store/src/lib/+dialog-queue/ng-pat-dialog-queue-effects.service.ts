import { Inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  NG_PAT_LOAD_DIALOGS,
  NgPatDialog,
  ngPatInitialDialog
} from './dialog-queue.model';
import { ngPatAddDialogs, ngPatLoadDialogs } from './dialog-queue.actions';
import { tap } from 'rxjs/operators';
import { NgPatPresenceService } from '../services/ng-pat-presence.service';

@Injectable({ providedIn: 'root' })
export class NgPatDialogEffects implements OnInitEffects {
  // ngPatOpenDialog$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ngPatCloseDialog),
  //       map(action => {
  //         if (
  //           action.id === NG_PAT_DIALOG_ITEM.PRESENCE_OFFLINE ||
  //           action.id === NG_PAT_DIALOG_ITEM.PRESENCE_IDLE
  //         ) {
  //           this.window.location.reload();
  //         }
  //       })
  //     ),
  //   {dispatch: false}
  // );

  ngPatLoadDialogs$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ngPatLoadDialogs),
        tap(() => {
          this.presence.init();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    // private dialog: MatDialog,
    private zone: NgZone,
    private presence: NgPatPresenceService,
    // @Inject(WINDOW) private window: Window,
    @Inject(NG_PAT_LOAD_DIALOGS) private dialogs: NgPatDialog[]
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const that = this;

    if (dialogs && dialogs.length) {
      this.zone.run(() => {
        this.store.dispatch(ngPatAddDialogs({ dialogs: dialogs }));
      });
    }

    // combineLatest([
    //   this.store.pipe(ngPatDialogsStoreIsLoaded$, distinctUntilChanged()),
    //   this.store.pipe(selectNgPatIsOnboarded$, distinctUntilChanged())
    // ]).subscribe(([isLoaded, isOnboarded]: [boolean, boolean]) => {
    //   if (isLoaded) {
    //     if (!isOnboarded) {
    //       that.zone.run(() => {
    //         that.store.dispatch(
    //           ngPatOpenDialog({id: NG_PAT_DIALOG_ITEM.ONBOARD})
    //         );
    //       });
    //     } else {
    //       that.zone.run(() => {
    //         that.store.dispatch(
    //           ngPatCloseDialog({id: NG_PAT_DIALOG_ITEM.ONBOARD})
    //         );
    //       });
    //     }
    //   }
    // });
  }

  ngrxOnInitEffects(): Action {
    return ngPatLoadDialogs({
      dialogs: ngPatInitialDialog
    });
  }
}
