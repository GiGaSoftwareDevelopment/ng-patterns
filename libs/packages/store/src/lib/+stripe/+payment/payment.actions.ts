import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';
import { PaymentIntent } from '../entities/payment.model';

export const ngPatOnInitStripePaymentEffect = createAction(
  '[NgPatStripePayment/API] Initial Query Payments'
);

export const ngPatStripePaymentError = createAction(
  '[NgPatStripePayment/API] Error',
  props<{ message: string }>()
);

export const ngPatQueryStripePayment = createAction(
  '[NgPatStripePayment/API] Query Payments',
  props<{ query: string }>()
);

export const ngPatLoadStripePayments = createAction(
  '[NgPatStripePayment/API] Load Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatSetStripePayments = createAction(
  '[NgPatStripePayment/API] Set Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatAddStripePayment = createAction(
  '[NgPatStripePayment/API] Add NgPatStripePayment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatSetStripePayment = createAction(
  '[NgPatStripePayment/API] Set NgPatStripePayment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatUpsertStripePayment = createAction(
  '[NgPatStripePayment/API] Upsert NgPatStripePayment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatAddStripePayments = createAction(
  '[NgPatStripePayment/API] Add Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatUpsertStripePayments = createAction(
  '[NgPatStripePayment/API] Upsert Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatUpdateStripePayment = createAction(
  '[NgPatStripePayment/API] Update NgPatStripePayment',
  props<{ payment: Update<PaymentIntent> }>()
);

export const ngPatUpdateStripePayments = createAction(
  '[NgPatStripePayment/API] Update Payments',
  props<{ payments: Update<PaymentIntent>[] }>()
);

export const ngPatMapStripePayment = createAction(
  '[NgPatStripePayment/API] Map NgPatStripePayment',
  props<{ entityMap: EntityMapOne<PaymentIntent> }>()
);
export const ngPatMapStripePayments = createAction(
  '[NgPatStripePayment/API] Map Payments',
  props<{ entityMap: EntityMap<PaymentIntent> }>()
);

export const ngPatDeleteStripePayment = createAction(
  '[NgPatStripePayment/API] Delete NgPatStripePayment',
  props<{ id: string }>()
);

export const ngPatDeleteStripePayments = createAction(
  '[NgPatStripePayment/API] Delete Payments',
  props<{ ids: string[] }>()
);

export const ngPatClearStripePayments = createAction(
  '[NgPatStripePayment/API] Clear Payments'
);
