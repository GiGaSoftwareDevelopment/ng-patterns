import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { NgPatStripeCheckoutSession } from './checkout-session.model';

export const ngPatOnInitStripeCheckoutSessionEffect = createAction(
  '[NgPatStripeCheckoutSession/API] Initial Query CheckoutSessions'
);

export const ngPatStripeCheckoutSessionError = createAction(
  '[NgPatStripeCheckoutSession/API] Error',
  props<{ message: string }>()
);

export const ngPatQueryStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Query CheckoutSessions',
  props<{ query: string }>()
);

export const ngPatLoadStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Load CheckoutSessions',
  props<{ checkoutSessions: NgPatStripeCheckoutSession[] }>()
);

export const ngPatSetStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Set CheckoutSessions',
  props<{ checkoutSessions: NgPatStripeCheckoutSession[] }>()
);

export const ngPatAddStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Add NgPatStripeCheckoutSession',
  props<{ checkoutSession: NgPatStripeCheckoutSession }>()
);

export const ngPatSetStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Set NgPatStripeCheckoutSession',
  props<{ checkoutSession: NgPatStripeCheckoutSession }>()
);

export const ngPatUpsertStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Upsert NgPatStripeCheckoutSession',
  props<{ checkoutSession: NgPatStripeCheckoutSession }>()
);

export const ngPatAddStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Add CheckoutSessions',
  props<{ checkoutSessions: NgPatStripeCheckoutSession[] }>()
);

export const ngPatUpsertStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Upsert CheckoutSessions',
  props<{ checkoutSessions: NgPatStripeCheckoutSession[] }>()
);

export const ngPatUpdateStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Update NgPatStripeCheckoutSession',
  props<{ checkoutSession: Update<NgPatStripeCheckoutSession> }>()
);

export const ngPatUpdateStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Update CheckoutSessions',
  props<{ checkoutSessions: Update<NgPatStripeCheckoutSession>[] }>()
);

export const ngPatMapStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Map NgPatStripeCheckoutSession',
  props<{ entityMap: EntityMapOne<NgPatStripeCheckoutSession> }>()
);
export const ngPatMapStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Map CheckoutSessions',
  props<{ entityMap: EntityMap<NgPatStripeCheckoutSession> }>()
);

export const ngPatDeleteStripeCheckoutSession = createAction(
  '[NgPatStripeCheckoutSession/API] Delete NgPatStripeCheckoutSession',
  props<{ id: string }>()
);

export const ngPatDeleteStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Delete CheckoutSessions',
  props<{ ids: string[] }>()
);

export const ngPatClearStripeCheckoutSessions = createAction(
  '[NgPatStripeCheckoutSession/API] Clear CheckoutSessions'
);
