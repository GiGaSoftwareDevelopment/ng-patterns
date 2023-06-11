import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { PriceService } from './price.service';
import { ngPatInitPrice } from './price.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceEffects implements OnInitEffects {
  onInitEffect$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(ngPatInitPrice),
        tap(() => {
          this._priceService.init$.next(true);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private store: Store,
    private _priceService: PriceService
  ) {}

  ngrxOnInitEffects(): Action {
    return ngPatInitPrice();
  }
}
