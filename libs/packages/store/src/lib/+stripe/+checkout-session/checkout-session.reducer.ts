import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NgPatStripeCheckoutSession } from './checkout-session.model';
import * as CheckoutSessionActions from './checkout-session.actions';

export const checkoutSessionsFeatureKey = 'ngPat_stripe_checkout_sessions';

export interface CheckoutSessionState
  extends EntityState<NgPatStripeCheckoutSession> {
  // additional entities state properties
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PartialCheckoutSessionState {
  readonly [checkoutSessionsFeatureKey]: CheckoutSessionState;
}

export const checkoutSessionAdapter: EntityAdapter<NgPatStripeCheckoutSession> =
  createEntityAdapter<NgPatStripeCheckoutSession>({});

export const initialCheckoutSessionState: CheckoutSessionState =
  checkoutSessionAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null
  });

export const checkoutSessionReducer = createReducer(
  initialCheckoutSessionState,
  on(
    CheckoutSessionActions.ngPatAddStripeCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.addOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.ngPatSetStripeCheckoutSession,
    (state, { checkoutSession }) => {
      return checkoutSessionAdapter.setOne(checkoutSession, state);
    }
  ),
  on(
    CheckoutSessionActions.ngPatUpsertStripeCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.upsertOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.ngPatAddStripeCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.addMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.ngPatUpsertStripeCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.upsertMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.ngPatUpdateStripeCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.updateOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.ngPatUpdateStripeCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.updateMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.ngPatMapStripeCheckoutSession,
    (state, { entityMap }) => {
      return checkoutSessionAdapter.mapOne(entityMap, state);
    }
  ),
  on(
    CheckoutSessionActions.ngPatMapStripeCheckoutSessions,
    (state, { entityMap }) => {
      return checkoutSessionAdapter.map(entityMap, state);
    }
  ),
  on(CheckoutSessionActions.ngPatDeleteStripeCheckoutSession, (state, { id }) =>
    checkoutSessionAdapter.removeOne(id, { ...state, error: null })
  ),
  on(
    CheckoutSessionActions.ngPatDeleteStripeCheckoutSessions,
    (state, { ids }) => checkoutSessionAdapter.removeMany(ids, state)
  ),
  on(
    CheckoutSessionActions.ngPatLoadStripeCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.setAll(checkoutSessions, {
        ...state,
        isLoaded: true,
        isLoading: false
      })
  ),
  on(
    CheckoutSessionActions.ngPatSetStripeCheckoutSessions,
    (state, { checkoutSessions }) => {
      return checkoutSessionAdapter.setMany(checkoutSessions, state);
    }
  ),
  on(CheckoutSessionActions.ngPatClearStripeCheckoutSessions, state =>
    checkoutSessionAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(
    CheckoutSessionActions.ngPatStripeCheckoutSessionError,
    (state, { message }) => ({
      ...state,
      error: message
    })
  )
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
