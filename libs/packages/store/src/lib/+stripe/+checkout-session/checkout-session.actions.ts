import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { CheckoutSession } from './checkout-session.model';

export const onInitCheckoutSessionEffect = createAction(
  '[CheckoutSession/API] Initial Query CheckoutSessions'
);

export const checkoutSessionError = createAction(
  '[CheckoutSession/API] Error',
  props<{ message: string }>()
);

export const queryCheckoutSession = createAction(
  '[CheckoutSession/API] Query CheckoutSessions',
  props<{ query: string }>()
);

export const loadCheckoutSessions = createAction(
  '[CheckoutSession/API] Load CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const setCheckoutSessions = createAction(
  '[CheckoutSession/API] Set CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const addCheckoutSession = createAction(
  '[CheckoutSession/API] Add CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const setCheckoutSession = createAction(
  '[CheckoutSession/API] Set CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const upsertCheckoutSession = createAction(
  '[CheckoutSession/API] Upsert CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const addCheckoutSessions = createAction(
  '[CheckoutSession/API] Add CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const upsertCheckoutSessions = createAction(
  '[CheckoutSession/API] Upsert CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const updateCheckoutSession = createAction(
  '[CheckoutSession/API] Update CheckoutSession',
  props<{ checkoutSession: Update<CheckoutSession> }>()
);

export const updateCheckoutSessions = createAction(
  '[CheckoutSession/API] Update CheckoutSessions',
  props<{ checkoutSessions: Update<CheckoutSession>[] }>()
);

export const mapCheckoutSession = createAction(
  '[CheckoutSession/API] Map CheckoutSession',
  props<{ entityMap: EntityMapOne<CheckoutSession> }>()
);
export const mapCheckoutSessions = createAction(
  '[CheckoutSession/API] Map CheckoutSessions',
  props<{ entityMap: EntityMap<CheckoutSession> }>()
);

export const deleteCheckoutSession = createAction(
  '[CheckoutSession/API] Delete CheckoutSession',
  props<{ id: string }>()
);

export const deleteCheckoutSessions = createAction(
  '[CheckoutSession/API] Delete CheckoutSessions',
  props<{ ids: string[] }>()
);

export const clearCheckoutSessions = createAction(
  '[CheckoutSession/API] Clear CheckoutSessions'
);
