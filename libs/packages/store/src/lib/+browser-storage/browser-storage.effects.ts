import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';

import { NgPatBrowserStorageService } from '../services/ng-pat-browser-storage.service';
import { PartialBrowserStorageState } from './browser-storage.reducer';
import * as BrowserStorageActions from './browser-storage.actions';
import { NgPatBrowserStorageItem } from './browser-storage.model';
import { selectBrowserStorageIds } from './browser-storage.selectors';
import { of } from 'rxjs';

@Injectable()
export class NgPatBrowserStorageEffects implements OnInitEffects {
  onInitBrowserStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrowserStorageActions.ngPatOnInitBrowserStorageEffect),
      switchMap(() =>
        this.browserStorageService.getAllLocalStorageItems().pipe(
          map((browserStorages: NgPatBrowserStorageItem[]) =>
            BrowserStorageActions.ngPatLoadBrowserStorageItems({
              browserStorageItems: browserStorages
            })
          ),
          catchError((message: string) =>
            of(BrowserStorageActions.ngPatBrowserStorageError({ message }))
          )
        )
      )
    )
  );

  onAddItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          BrowserStorageActions.ngPatAddBrowserStorageItem,
          BrowserStorageActions.ngPatSetBrowserStorageItem
        ),
        tap(({ browserStorageItem }) => {
          this.browserStorageService.setItem(
            browserStorageItem.key,
            browserStorageItem.value
          );
        })
      ),
    { dispatch: false }
  );

  onRemoveItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          BrowserStorageActions.ngPatDoDisconnectAndRemoveBrowserStorageItem
        ),
        tap(({ id }) => {
          this.browserStorageService.removeItem(id);
        })
      ),
    { dispatch: false }
  );

  onRemoveItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BrowserStorageActions.ngPatRemoveBrowserStorageItems),
        tap(({ ids }) => {
          ids.forEach((id: string) => {
            this.browserStorageService.removeItem(id);
          });
        })
      ),
    { dispatch: false }
  );

  onClearStorageItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BrowserStorageActions.ngPatClearBrowserStorageItems),
        withLatestFrom(selectBrowserStorageIds),
        tap((keys: any[]) => {
          if (keys && keys.length) {
          }
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<PartialBrowserStorageState>,
    private browserStorageService: NgPatBrowserStorageService
  ) {}

  ngrxOnInitEffects(): Action {
    return BrowserStorageActions.ngPatOnInitBrowserStorageEffect();
  }
}
