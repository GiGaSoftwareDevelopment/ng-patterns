import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';
import { PaymentIntent } from '../entities/payment.model';

export const onInitPaymentEffect = createAction(
  '[Payment/API] Initial Query Payments'
);

export const paymentError = createAction(
  '[Payment/API] Error',
  props<{ message: string }>()
);

export const queryPayment = createAction(
  '[Payment/API] Query Payments',
  props<{ query: string }>()
);

export const loadPayments = createAction(
  '[Payment/API] Load Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const setPayments = createAction(
  '[Payment/API] Set Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const addPayment = createAction(
  '[Payment/API] Add Payment',
  props<{ payment: PaymentIntent }>()
);

export const setPayment = createAction(
  '[Payment/API] Set Payment',
  props<{ payment: PaymentIntent }>()
);

export const upsertPayment = createAction(
  '[Payment/API] Upsert Payment',
  props<{ payment: PaymentIntent }>()
);

export const addPayments = createAction(
  '[Payment/API] Add Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const upsertPayments = createAction(
  '[Payment/API] Upsert Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const updatePayment = createAction(
  '[Payment/API] Update Payment',
  props<{ payment: Update<PaymentIntent> }>()
);

export const updatePayments = createAction(
  '[Payment/API] Update Payments',
  props<{ payments: Update<PaymentIntent>[] }>()
);

export const mapPayment = createAction(
  '[Payment/API] Map Payment',
  props<{ entityMap: EntityMapOne<PaymentIntent> }>()
);
export const mapPayments = createAction(
  '[Payment/API] Map Payments',
  props<{ entityMap: EntityMap<PaymentIntent> }>()
);

export const deletePayment = createAction(
  '[Payment/API] Delete Payment',
  props<{ id: string }>()
);

export const deletePayments = createAction(
  '[Payment/API] Delete Payments',
  props<{ ids: string[] }>()
);

export const clearPayments = createAction('[Payment/API] Clear Payments');
