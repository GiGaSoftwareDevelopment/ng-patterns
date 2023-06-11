import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';
import { PaymentIntent } from '../entities/payment.model';

export const ngPatOnInitStripePaymentEffect = createAction(
  '[Payment/API] Initial Query Payments'
);

export const ngPatStripePaymentError = createAction(
  '[Payment/API] Error',
  props<{ message: string }>()
);

export const ngPatQueryStripePayment = createAction(
  '[Payment/API] Query Payments',
  props<{ query: string }>()
);

export const ngPatLoadStripePayments = createAction(
  '[Payment/API] Load Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatSetStripePayments = createAction(
  '[Payment/API] Set Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatAddStripePayment = createAction(
  '[Payment/API] Add Payment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatSetStripePayment = createAction(
  '[Payment/API] Set Payment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatUpsertStripePayment = createAction(
  '[Payment/API] Upsert Payment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatAddStripePayments = createAction(
  '[Payment/API] Add Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatUpsertStripePayments = createAction(
  '[Payment/API] Upsert Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatUpdateStripePayment = createAction(
  '[Payment/API] Update Payment',
  props<{ payment: Update<PaymentIntent> }>()
);

export const ngPatUpdateStripePayments = createAction(
  '[Payment/API] Update Payments',
  props<{ payments: Update<PaymentIntent>[] }>()
);

export const ngPatMapStripePayment = createAction(
  '[Payment/API] Map Payment',
  props<{ entityMap: EntityMapOne<PaymentIntent> }>()
);
export const ngPatMapStripePayments = createAction(
  '[Payment/API] Map Payments',
  props<{ entityMap: EntityMap<PaymentIntent> }>()
);

export const ngPatDeleteStripePayment = createAction(
  '[Payment/API] Delete Payment',
  props<{ id: string }>()
);

export const ngPatDeleteStripePayments = createAction(
  '[Payment/API] Delete Payments',
  props<{ ids: string[] }>()
);

export const ngPatClearStripePayments = createAction(
  '[Payment/API] Clear Payments'
);
