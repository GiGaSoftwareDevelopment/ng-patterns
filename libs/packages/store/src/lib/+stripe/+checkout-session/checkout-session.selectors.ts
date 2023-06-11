import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CheckoutSessionReducer from './checkout-session.reducer';

export const selectNgPatStripeCheckoutSessionState =
  createFeatureSelector<CheckoutSessionReducer.CheckoutSessionState>(
    CheckoutSessionReducer.checkoutSessionsFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  CheckoutSessionReducer.checkoutSessionAdapter.getSelectors();

export const selectNgPatAllStripeCheckoutSessions = createSelector(
  selectNgPatStripeCheckoutSessionState,
  selectAll
);
export const selectNgPatStripeCheckoutSessionEntities = createSelector(
  selectNgPatStripeCheckoutSessionState,
  selectEntities
);
export const selectNgPatStripeCheckoutSessionIds = createSelector(
  selectNgPatStripeCheckoutSessionState,
  selectIds
);
export const selectNgPatStripeCheckoutSessionTotal = createSelector(
  selectNgPatStripeCheckoutSessionState,
  selectTotal
);

export const selectNgPatStripeCheckoutSessionLoadingInProgress = createSelector(
  selectNgPatStripeCheckoutSessionState,
  (state: CheckoutSessionReducer.CheckoutSessionState) => state.isLoading
);
