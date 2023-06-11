import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { PaymentService } from './payment.service';
import * as PaymentActions from './payment.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class NgPatPaymentEffects implements OnInitEffects {
  onInitPaymentEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(PaymentActions.ngPatOnInitStripePaymentEffect),
        tap(() => {
          this.paymentService.init$.next(true);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private paymentService: PaymentService
  ) {}

  ngrxOnInitEffects(): Action {
    return PaymentActions.ngPatOnInitStripePaymentEffect();
  }
}
