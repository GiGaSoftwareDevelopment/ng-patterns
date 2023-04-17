import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ProductService } from './product.service';
import { initProduct } from './product.actions';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductEffects implements OnInitEffects {
  onInitEffects$ = createEffect(
    () => {
      return this._actions$.pipe(
        ofType(initProduct),
        tap(() => {
          this._productService.init$.next(true);
        })
      );
    },
    { dispatch: false }
  );
  constructor(
    private _actions$: Actions,
    private store: Store,
    private _productService: ProductService
  ) {}

  ngrxOnInitEffects(): Action {
    return initProduct();
  }
}
