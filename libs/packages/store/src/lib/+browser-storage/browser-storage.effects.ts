import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

import {BrowserStorageService} from './browser-storage.service';
import {PartialBrowserStorageState} from './browser-storage.reducer';
import * as BrowserStorageActions from './browser-storage.actions';
import {BrowserStorageItem} from './browser-storage.model';

@Injectable()
export class BrowserStorageEffects implements OnInitEffects {
  onInitBrowserStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowserStorageActions.onInitBrowserStorageEffect),
      switchMap(() =>
        this.browserStorageService.getAllLocalStorageItems().pipe(
          map((browserStorages: BrowserStorageItem[]) =>
            BrowserStorageActions.loadBrowserStorageItems({browserStorageItems: browserStorages})
          ),
          catchError((message: string) =>
            of(BrowserStorageActions.browserStorageError({message}))
          )
        )
      )
    ));

    onAddItem$ = createEffect(() =>  this.actions$.pipe(
      ofType(BrowserStorageActions.addBrowserStorageItem, BrowserStorageActions.setBrowserStorageItem),
      tap(({ browserStorageItem }) => {
        this.browserStorageService.setItem(browserStorageItem.key, browserStorageItem.value);
      })
    ), { dispatch: false })


  constructor(
    private actions$: Actions,
    private store: Store<PartialBrowserStorageState>,
    private browserStorageService: BrowserStorageService
  ) {}

  ngrxOnInitEffects(): Action {
    return BrowserStorageActions.onInitBrowserStorageEffect();
  }
}
