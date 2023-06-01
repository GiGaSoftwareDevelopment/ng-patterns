import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { NgPatLocalStorageService } from '../services/ng-pat-local-storage.service';
import * as LocalStorageActions from './local-storage.actions';
import { NgPatLocalStorageItem } from './local-storage.model';
import { PartialLocalStorageState } from './local-storage.reducer';

@Injectable()
export class NgPatLocalStorageEffects implements OnInitEffects {
  onInitLocalStorageEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LocalStorageActions.ngPatOnInitLocalStorageEffect),
      switchMap(() =>
        this.localStorageService.getAllLocalStorageItems().pipe(
          map((localStorages: NgPatLocalStorageItem[]) =>
            LocalStorageActions.ngPatLoadLocalStorageItems({
              localStorageItems: localStorages
            })
          ),
          catchError((message: string) =>
            of(LocalStorageActions.ngPatLocalStorageError({ message }))
          )
        )
      )
    )
  );

  onAddItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          LocalStorageActions.ngPatAddLocalStorageItem,
          LocalStorageActions.ngPatSetLocalStorageItem
        ),
        tap(({ localStorageItem }) => {
          let value: string | undefined;

          try {
            value = JSON.stringify(localStorageItem.value);
          } catch (e: any) {
            console.error(e);
          }

          if (value !== undefined) {
            this.localStorageService.setItem(localStorageItem.key, value);
          }
        })
      ),
    { dispatch: false }
  );

  onRemoveItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocalStorageActions.ngPatDoDisconnectAndRemoveLocalStorageItem),
        tap(({ id }) => {
          this.localStorageService.removeItem(id);
        })
      ),
    { dispatch: false }
  );

  onRemoveItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocalStorageActions.ngPatRemoveLocalStorageItems),
        tap(({ ids }) => {
          ids.forEach((id: string) => {
            this.localStorageService.removeItem(id);
          });
        })
      ),
    { dispatch: false }
  );

  onClearStorageItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LocalStorageActions.ngPatClearLocalStorageItems),
        tap(() => {
          this.localStorageService.clear();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<PartialLocalStorageState>,
    private localStorageService: NgPatLocalStorageService
  ) {}

  ngrxOnInitEffects(): Action {
    return LocalStorageActions.ngPatOnInitLocalStorageEffect();
  }
}
