import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PaymentReducer from './payment.reducer';

export const selectNgPatStripePaymentState =
  createFeatureSelector<PaymentReducer.PaymentState>(
    PaymentReducer.paymentsFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  PaymentReducer.paymentAdapter.getSelectors();

export const selectNgPatAllStripePayments = createSelector(
  selectNgPatStripePaymentState,
  selectAll
);
export const selectNgPatPaymentStripeEntities = createSelector(
  selectNgPatStripePaymentState,
  selectEntities
);
export const selectNgPatStripePaymentIds = createSelector(
  selectNgPatStripePaymentState,
  selectIds
);
export const selectNgPatStripePaymentTotal = createSelector(
  selectNgPatStripePaymentState,
  selectTotal
);

export const selectNgPatStripePaymentLoadingInProgress = createSelector(
  selectNgPatStripePaymentState,
  (state: PaymentReducer.PaymentState) => state.isLoading
);
