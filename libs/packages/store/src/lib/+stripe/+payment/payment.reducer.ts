import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as PaymentActions from './payment.actions';
import { PaymentIntent } from '../entities/payment.model';

export const paymentsFeatureKey = 'stripe_payments';

export function selectPaymentId(a: PaymentIntent): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export interface PaymentState extends EntityState<PaymentIntent> {
  // additional entities state properties
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PartialPaymentState {
  readonly [paymentsFeatureKey]: PaymentState;
}

export const paymentAdapter: EntityAdapter<PaymentIntent> =
  createEntityAdapter<PaymentIntent>({
    selectId: selectPaymentId
  });

export const initialPaymentState: PaymentState = paymentAdapter.getInitialState(
  {
    // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null
  }
);

export const paymentReducer = createReducer(
  initialPaymentState,
  on(PaymentActions.addPayment, (state, { payment }) =>
    paymentAdapter.addOne(payment, state)
  ),
  on(PaymentActions.setPayment, (state, { payment }) => {
    return paymentAdapter.setOne(payment, state);
  }),
  on(PaymentActions.upsertPayment, (state, { payment }) =>
    paymentAdapter.upsertOne(payment, state)
  ),
  on(PaymentActions.addPayments, (state, { payments }) =>
    paymentAdapter.addMany(payments, state)
  ),
  on(PaymentActions.upsertPayments, (state, { payments }) =>
    paymentAdapter.upsertMany(payments, state)
  ),
  on(PaymentActions.updatePayment, (state, { payment }) =>
    paymentAdapter.updateOne(payment, state)
  ),
  on(PaymentActions.updatePayments, (state, { payments }) =>
    paymentAdapter.updateMany(payments, state)
  ),
  on(PaymentActions.mapPayment, (state, { entityMap }) => {
    return paymentAdapter.mapOne(entityMap, state);
  }),
  on(PaymentActions.mapPayments, (state, { entityMap }) => {
    return paymentAdapter.map(entityMap, state);
  }),
  on(PaymentActions.deletePayment, (state, { id }) =>
    paymentAdapter.removeOne(id, { ...state, error: null })
  ),
  on(PaymentActions.deletePayments, (state, { ids }) =>
    paymentAdapter.removeMany(ids, state)
  ),
  on(PaymentActions.loadPayments, (state, { payments }) =>
    paymentAdapter.setAll(payments, {
      ...state,
      isLoaded: true,
      isLoading: false
    })
  ),
  on(PaymentActions.setPayments, (state, { payments }) => {
    return paymentAdapter.setMany(payments, state);
  }),
  on(PaymentActions.clearPayments, state =>
    paymentAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(PaymentActions.paymentError, (state, { message }) => ({
    ...state,
    error: message
  }))
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
