import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { CheckoutSessionService } from './checkout-session.service';
import * as CheckoutSessionActions from './checkout-session.actions';

@Injectable()
export class CheckoutSessionEffects implements OnInitEffects {
  onInitCheckoutSessionEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CheckoutSessionActions.ngPatOnInitStripeCheckoutSessionEffect),
        tap(() => {
          this.checkoutSessionService.init$.next(true);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private checkoutSessionService: CheckoutSessionService
  ) {}

  ngrxOnInitEffects(): Action {
    return CheckoutSessionActions.ngPatOnInitStripeCheckoutSessionEffect();
  }
}
