import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PaymentReducer from './payment.reducer';

export const selectNgPatPaymentState =
  createFeatureSelector<PaymentReducer.PaymentState>(
    PaymentReducer.paymentsFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  PaymentReducer.paymentAdapter.getSelectors();

export const selectNgPatAllPayments = createSelector(
  selectNgPatPaymentState,
  selectAll
);
export const selectNgPatPaymentEntities = createSelector(
  selectNgPatPaymentState,
  selectEntities
);
export const selectNgPatPaymentIds = createSelector(
  selectNgPatPaymentState,
  selectIds
);
export const selectNgPatPaymentTotal = createSelector(
  selectNgPatPaymentState,
  selectTotal
);

export const selectNgPatPaymentLoadingInProgress = createSelector(
  selectNgPatPaymentState,
  (state: PaymentReducer.PaymentState) => state.isLoading
);
