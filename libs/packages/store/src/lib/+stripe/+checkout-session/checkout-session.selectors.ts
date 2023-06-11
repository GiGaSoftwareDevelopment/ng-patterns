import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CheckoutSessionReducer from './checkout-session.reducer';

export const selectNgPatCheckoutSessionState =
  createFeatureSelector<CheckoutSessionReducer.CheckoutSessionState>(
    CheckoutSessionReducer.checkoutSessionsFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  CheckoutSessionReducer.checkoutSessionAdapter.getSelectors();

export const selectNgPatAllCheckoutSessions = createSelector(
  selectNgPatCheckoutSessionState,
  selectAll
);
export const selectNgPatCheckoutSessionEntities = createSelector(
  selectNgPatCheckoutSessionState,
  selectEntities
);
export const selectNgPatCheckoutSessionIds = createSelector(
  selectNgPatCheckoutSessionState,
  selectIds
);
export const selectNgPatCheckoutSessionTotal = createSelector(
  selectNgPatCheckoutSessionState,
  selectTotal
);

export const selectNgPatCheckoutSessionLoadingInProgress = createSelector(
  selectNgPatCheckoutSessionState,
  (state: CheckoutSessionReducer.CheckoutSessionState) => state.isLoading
);
