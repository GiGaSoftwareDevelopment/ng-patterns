import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PaymentReducer from './payment.reducer';

export const selectPaymentState =
  createFeatureSelector<PaymentReducer.PaymentState>(
    PaymentReducer.paymentsFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  PaymentReducer.paymentAdapter.getSelectors();

export const selectAllPayments = createSelector(selectPaymentState, selectAll);
export const selectPaymentEntities = createSelector(
  selectPaymentState,
  selectEntities
);
export const selectPaymentIds = createSelector(selectPaymentState, selectIds);
export const selectPaymentTotal = createSelector(
  selectPaymentState,
  selectTotal
);

export const selectPaymentLoadingInProgress = createSelector(
  selectPaymentState,
  (state: PaymentReducer.PaymentState) => state.isLoading
);
