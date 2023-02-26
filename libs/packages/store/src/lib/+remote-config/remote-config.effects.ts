import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { loadRemoteConfigEffect, upsertRemoteConfigs } from './remote-config.actions';
import { tap } from 'rxjs/operators';
import { RemoteConfigEntity } from './remote-config.model';
import { GigaAccountFirestoreService } from '@ngpat/store';

@Injectable()
export class NgPatRemoteConfigEffects implements OnInitEffects {
  loadRemoteConfigEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadRemoteConfigEffect),
        tap(() => {
          this.receiveConfigPoll();
        })
      ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private customFirebase: GigaAccountFirestoreService,
    private store: Store
  ) {}

  ngrxOnInitEffects(): Action {
    return loadRemoteConfigEffect();
  }

  private receiveConfigPoll() {
    this.customFirebase.remoteConfig$.subscribe(
      (remoteConfigs: RemoteConfigEntity[]) => {
        this.store.dispatch(upsertRemoteConfigs({remoteConfigs}));
      }
    );
  }
}
