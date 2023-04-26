import { Inject, Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { NG_PAT_LOAD_DIALOGS, NgPatDialog } from './dialog-queue.model';
import { ngPatLoadDialogs, ngPatOpenDialog } from './dialog-queue.actions';
import { tap } from 'rxjs/operators';
import { NgPatPresenceService } from '../services/ng-pat-presence.service';
import { NgPatProcessQueue } from '@ngpat/utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgPatDialogQueue implements OnInitEffects {
  ngPatOpenDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ngPatOpenDialog),
        tap(action => {
          this.dialogQueue.addUnique(action.id);
        })
      );
    },
    { dispatch: false }
  );

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

  private dialogQueue = new NgPatProcessQueue<string>();

  currentItem$: Observable<string> = this.dialogQueue.currentItem$;

  constructor(
    private actions$: Actions,
    private zone: NgZone,
    private presence: NgPatPresenceService,
    // @Inject(WINDOW) private window: Window,
    @Inject(NG_PAT_LOAD_DIALOGS) private dialogs: string[]
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    // const that = this;

    if (dialogs && dialogs.length) {
      this.dialogQueue.addItems(dialogs);
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

  next() {
    this.dialogQueue.next();
  }

  ngrxOnInitEffects(): Action {
    return ngPatLoadDialogs();
  }
}
