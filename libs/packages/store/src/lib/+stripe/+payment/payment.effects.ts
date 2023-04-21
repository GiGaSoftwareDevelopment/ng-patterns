import { Injectable } from '@angular/core';
import { Actions, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { PaymentService } from './payment.service';
import * as PaymentActions from './payment.actions';

@Injectable()
export class PaymentEffects implements OnInitEffects {
  // onInitPaymentEffect$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PaymentActions.onInitPaymentEffect),
  //     switchMap(() =>
  //       this.paymentService.getPayments().pipe(
  //         map((payments: PaymentIntent[]) =>
  //           PaymentActions.loadPayments({ payments })
  //         ),
  //         catchError((message: string) =>
  //           of(PaymentActions.paymentError({ message }))
  //         )
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private store: Store,
    private paymentService: PaymentService
  ) {}

  ngrxOnInitEffects(): Action {
    return PaymentActions.onInitPaymentEffect();
  }
}
