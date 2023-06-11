import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { CheckoutSession } from './checkout-session.model';

export const ngPatOnInitStripeCheckoutSessionEffect = createAction(
  '[CheckoutSession/API] Initial Query CheckoutSessions'
);

export const ngPatStripeCheckoutSessionError = createAction(
  '[CheckoutSession/API] Error',
  props<{ message: string }>()
);

export const ngPatQueryStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Query CheckoutSessions',
  props<{ query: string }>()
);

export const ngPatLoadStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Load CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatSetStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Set CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatAddStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Add CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const ngPatSetStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Set CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const ngPatUpsertStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Upsert CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const ngPatAddStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Add CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatUpsertStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Upsert CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatUpdateStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Update CheckoutSession',
  props<{ checkoutSession: Update<CheckoutSession> }>()
);

export const ngPatUpdateStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Update CheckoutSessions',
  props<{ checkoutSessions: Update<CheckoutSession>[] }>()
);

export const ngPatMapStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Map CheckoutSession',
  props<{ entityMap: EntityMapOne<CheckoutSession> }>()
);
export const ngPatMapStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Map CheckoutSessions',
  props<{ entityMap: EntityMap<CheckoutSession> }>()
);

export const ngPatDeleteStripeCheckoutSession = createAction(
  '[CheckoutSession/API] Delete CheckoutSession',
  props<{ id: string }>()
);

export const ngPatDeleteStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Delete CheckoutSessions',
  props<{ ids: string[] }>()
);

export const ngPatClearStripeCheckoutSessions = createAction(
  '[CheckoutSession/API] Clear CheckoutSessions'
);
