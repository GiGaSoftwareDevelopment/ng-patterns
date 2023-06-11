import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';
import { PaymentIntent } from '../entities/payment.model';

export const ngPatOnInitPaymentEffect = createAction(
  '[Payment/API] Initial Query Payments'
);

export const ngPatPaymentError = createAction(
  '[Payment/API] Error',
  props<{ message: string }>()
);

export const ngPatQueryPayment = createAction(
  '[Payment/API] Query Payments',
  props<{ query: string }>()
);

export const ngPatLoadPayments = createAction(
  '[Payment/API] Load Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatSetPayments = createAction(
  '[Payment/API] Set Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatAddPayment = createAction(
  '[Payment/API] Add Payment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatSetPayment = createAction(
  '[Payment/API] Set Payment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatUpsertPayment = createAction(
  '[Payment/API] Upsert Payment',
  props<{ payment: PaymentIntent }>()
);

export const ngPatAddPayments = createAction(
  '[Payment/API] Add Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatUpsertPayments = createAction(
  '[Payment/API] Upsert Payments',
  props<{ payments: PaymentIntent[] }>()
);

export const ngPatUpdatePayment = createAction(
  '[Payment/API] Update Payment',
  props<{ payment: Update<PaymentIntent> }>()
);

export const ngPatUpdatePayments = createAction(
  '[Payment/API] Update Payments',
  props<{ payments: Update<PaymentIntent>[] }>()
);

export const ngPatMapPayment = createAction(
  '[Payment/API] Map Payment',
  props<{ entityMap: EntityMapOne<PaymentIntent> }>()
);
export const ngPatMapPayments = createAction(
  '[Payment/API] Map Payments',
  props<{ entityMap: EntityMap<PaymentIntent> }>()
);

export const ngPatDeletePayment = createAction(
  '[Payment/API] Delete Payment',
  props<{ id: string }>()
);

export const ngPatDeletePayments = createAction(
  '[Payment/API] Delete Payments',
  props<{ ids: string[] }>()
);

export const ngPatClearPayments = createAction('[Payment/API] Clear Payments');
