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
  on(
    CheckoutSessionActions.ngPatAddCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.addOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.ngPatSetCheckoutSession,
    (state, { checkoutSession }) => {
      return checkoutSessionAdapter.setOne(checkoutSession, state);
    }
  ),
  on(
    CheckoutSessionActions.ngPatUpsertCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.upsertOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.ngPatAddCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.addMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.ngPatUpsertCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.upsertMany(checkoutSessions, state)
  ),
  on(
    CheckoutSessionActions.ngPatUpdateCheckoutSession,
    (state, { checkoutSession }) =>
      checkoutSessionAdapter.updateOne(checkoutSession, state)
  ),
  on(
    CheckoutSessionActions.ngPatUpdateCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.updateMany(checkoutSessions, state)
  ),
  on(CheckoutSessionActions.ngPatMapCheckoutSession, (state, { entityMap }) => {
    return checkoutSessionAdapter.mapOne(entityMap, state);
  }),
  on(
    CheckoutSessionActions.ngPatMapCheckoutSessions,
    (state, { entityMap }) => {
      return checkoutSessionAdapter.map(entityMap, state);
    }
  ),
  on(CheckoutSessionActions.ngPatDeleteCheckoutSession, (state, { id }) =>
    checkoutSessionAdapter.removeOne(id, { ...state, error: null })
  ),
  on(CheckoutSessionActions.ngPatDeleteCheckoutSessions, (state, { ids }) =>
    checkoutSessionAdapter.removeMany(ids, state)
  ),
  on(
    CheckoutSessionActions.ngPatLoadCheckoutSessions,
    (state, { checkoutSessions }) =>
      checkoutSessionAdapter.setAll(checkoutSessions, {
        ...state,
        isLoaded: true,
        isLoading: false
      })
  ),
  on(
    CheckoutSessionActions.ngPatSetCheckoutSessions,
    (state, { checkoutSessions }) => {
      return checkoutSessionAdapter.setMany(checkoutSessions, state);
    }
  ),
  on(CheckoutSessionActions.ngPatClearCheckoutSessions, state =>
    checkoutSessionAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(
    CheckoutSessionActions.ngPatCheckoutSessionError,
    (state, { message }) => ({
      ...state,
      error: message
    })
  )
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);
