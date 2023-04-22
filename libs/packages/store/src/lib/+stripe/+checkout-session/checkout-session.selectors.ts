import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CheckoutSessionReducer from './checkout-session.reducer';

export const selectCheckoutSessionState =
  createFeatureSelector<CheckoutSessionReducer.CheckoutSessionState>(
    CheckoutSessionReducer.checkoutSessionsFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  CheckoutSessionReducer.checkoutSessionAdapter.getSelectors();

export const selectAllCheckoutSessions = createSelector(
  selectCheckoutSessionState,
  selectAll
);
export const selectCheckoutSessionEntities = createSelector(
  selectCheckoutSessionState,
  selectEntities
);
export const selectCheckoutSessionIds = createSelector(
  selectCheckoutSessionState,
  selectIds
);
export const selectCheckoutSessionTotal = createSelector(
  selectCheckoutSessionState,
  selectTotal
);

export const selectCheckoutSessionLoadingInProgress = createSelector(
  selectCheckoutSessionState,
  (state: CheckoutSessionReducer.CheckoutSessionState) => state.isLoading
);
