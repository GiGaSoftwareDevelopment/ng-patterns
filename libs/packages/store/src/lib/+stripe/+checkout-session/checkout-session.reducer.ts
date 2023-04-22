import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CheckoutSession } from './checkout-session.model';
import * as CheckoutSessionActions from './checkout-session.actions';

export const checkoutSessionsFeatureKey = 'stripe_checkout_sessions';

export interface CheckoutSessionState extends EntityState<CheckoutSession> {
  // additional entities state properties
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PartialCheckoutSessionState {
  readonly [checkoutSessionsFeatureKey]: CheckoutSessionState;
}

export const checkoutSessionAdapter: EntityAdapter<CheckoutSession> =
  createEntityAdapter<CheckoutSession>({});

export const initialCheckoutSessionState: CheckoutSessionState =
  checkoutSessionAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null
  });

export const checkoutSessionReducer = createReducer(
  initialCheckoutSessionState,
  on(CheckoutSessionActions.addCheckoutSession, (state, { checkoutSession }) =>
    checkoutSessionAdapter.addOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.setCheckoutSession,
    (state, { checkoutSession }) => {
      return checkoutSessionAdapter.setOne(checkoutSession, state);
    }
  ),
  on(
    CheckoutSessionActions.upsertCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.upsertOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.addCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.addMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.upsertCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.upsertMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.updateCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.updateOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.updateCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.updateMany(checkoutSessions, state)
  ),
  on(CheckoutSessionActions.mapCheckoutSession, (state, { entityMap }) => {
    return checkoutSessionAdapter.mapOne(entityMap, state);
  }),
  on(CheckoutSessionActions.mapCheckoutSessions, (state, { entityMap }) => {
    return checkoutSessionAdapter.map(entityMap, state);
  }),
  on(CheckoutSessionActions.deleteCheckoutSession, (state, { id }) =>
    checkoutSessionAdapter.removeOne(id, { ...state, error: null })
  ),
  on(CheckoutSessionActions.deleteCheckoutSessions, (state, { ids }) =>
    checkoutSessionAdapter.removeMany(ids, state)
  ),
  on(
    CheckoutSessionActions.loadCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.setAll(checkoutSessions, {
        ...state,
        isLoaded: true,
        isLoading: false
      })
  ),
  on(
    CheckoutSessionActions.setCheckoutSessions,
    (state, { checkoutSessions }) => {
      return checkoutSessionAdapter.setMany(checkoutSessions, state);
    }
  ),
  on(CheckoutSessionActions.clearCheckoutSessions, state =>
    checkoutSessionAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(CheckoutSessionActions.checkoutSessionError, (state, { message }) => ({
    ...state,
    error: message
  }))
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
