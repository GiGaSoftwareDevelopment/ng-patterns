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
  on(PaymentActions.ngPatAddPayment, (state, { payment }) =>
    paymentAdapter.addOne(payment, state)
  ),
  on(PaymentActions.ngPatSetPayment, (state, { payment }) => {
    return paymentAdapter.setOne(payment, state);
  }),
  on(PaymentActions.ngPatUpsertPayment, (state, { payment }) =>
    paymentAdapter.upsertOne(payment, state)
  ),
  on(PaymentActions.ngPatAddPayments, (state, { payments }) =>
    paymentAdapter.addMany(payments, state)
  ),
  on(PaymentActions.ngPatUpsertPayments, (state, { payments }) =>
    paymentAdapter.upsertMany(payments, state)
  ),
  on(PaymentActions.ngPatUpdatePayment, (state, { payment }) =>
    paymentAdapter.updateOne(payment, state)
  ),
  on(PaymentActions.ngPatUpdatePayments, (state, { payments }) =>
    paymentAdapter.updateMany(payments, state)
  ),
  on(PaymentActions.ngPatMapPayment, (state, { entityMap }) => {
    return paymentAdapter.mapOne(entityMap, state);
  }),
  on(PaymentActions.ngPatMapPayments, (state, { entityMap }) => {
    return paymentAdapter.map(entityMap, state);
  }),
  on(PaymentActions.ngPatDeletePayment, (state, { id }) =>
    paymentAdapter.removeOne(id, { ...state, error: null })
  ),
  on(PaymentActions.ngPatDeletePayments, (state, { ids }) =>
    paymentAdapter.removeMany(ids, state)
  ),
  on(PaymentActions.ngPatLoadPayments, (state, { payments }) =>
    paymentAdapter.setAll(payments, {
      ...state,
      isLoaded: true,
      isLoading: false
    })
  ),
  on(PaymentActions.ngPatSetPayments, (state, { payments }) => {
    return paymentAdapter.setMany(payments, state);
  }),
  on(PaymentActions.ngPatClearPayments, state =>
    paymentAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(PaymentActions.ngPatPaymentError, (state, { message }) => ({
    ...state,
    error: message
  }))
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
