# Payment NgRx Entity Store

This Store is built to NgRx recommended configuration. See [NgRX Entity Adapter Doc](https://ngrx.io/guide/entity/adapter) on how use the NgRx Entity Store.

## Add to your application

You have three options:

1. Import the `payment.module` into your app or library module.
2. Configure as a Feature store in your app or library module:

   ```typescript
   import * as fromPaymentReducer from '[ relative path or lib api ].reducer';

   StoreModule.forFeature(
     fromPaymentReducer.paymentsFeatureKey,
     fromPaymentReducer.paymentReducer,
     {
       initialState: fromPaymentReducer.initialPaymentState
     }
   ),
     EffectsModule.forFeature([PaymentEffects]);
   ```

3. Configure as a Root store in your app or library module:

   ```typescript

      import * as fromPaymentReducer from '[ relative path or lib api ].reducer';

      StoreModule.forRoot(
            {
                [fromPaymentReducer.paymentsFeatureKey]: fromPaymentReducer.paymentReducer,
                ...
            },
            {
                initialState: {
                    [fromPaymentReducer.paymentsFeatureKey]: fromPaymentReducer.initialPaymentState,
                    ...
                },
            }
        ),
      EffectsModule.forRoot([PaymentEffects]),
   ```
