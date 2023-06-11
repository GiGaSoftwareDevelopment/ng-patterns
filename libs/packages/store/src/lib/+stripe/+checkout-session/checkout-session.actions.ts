import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { CheckoutSession } from './checkout-session.model';

export const ngPatOnInitCheckoutSessionEffect = createAction(
  '[CheckoutSession/API] Initial Query CheckoutSessions'
);

export const ngPatCheckoutSessionError = createAction(
  '[CheckoutSession/API] Error',
  props<{ message: string }>()
);

export const ngPatQueryCheckoutSession = createAction(
  '[CheckoutSession/API] Query CheckoutSessions',
  props<{ query: string }>()
);

export const ngPatLoadCheckoutSessions = createAction(
  '[CheckoutSession/API] Load CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatSetCheckoutSessions = createAction(
  '[CheckoutSession/API] Set CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatAddCheckoutSession = createAction(
  '[CheckoutSession/API] Add CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const ngPatSetCheckoutSession = createAction(
  '[CheckoutSession/API] Set CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const ngPatUpsertCheckoutSession = createAction(
  '[CheckoutSession/API] Upsert CheckoutSession',
  props<{ checkoutSession: CheckoutSession }>()
);

export const ngPatAddCheckoutSessions = createAction(
  '[CheckoutSession/API] Add CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatUpsertCheckoutSessions = createAction(
  '[CheckoutSession/API] Upsert CheckoutSessions',
  props<{ checkoutSessions: CheckoutSession[] }>()
);

export const ngPatUpdateCheckoutSession = createAction(
  '[CheckoutSession/API] Update CheckoutSession',
  props<{ checkoutSession: Update<CheckoutSession> }>()
);

export const ngPatUpdateCheckoutSessions = createAction(
  '[CheckoutSession/API] Update CheckoutSessions',
  props<{ checkoutSessions: Update<CheckoutSession>[] }>()
);

export const ngPatMapCheckoutSession = createAction(
  '[CheckoutSession/API] Map CheckoutSession',
  props<{ entityMap: EntityMapOne<CheckoutSession> }>()
);
export const ngPatMapCheckoutSessions = createAction(
  '[CheckoutSession/API] Map CheckoutSessions',
  props<{ entityMap: EntityMap<CheckoutSession> }>()
);

export const ngPatDeleteCheckoutSession = createAction(
  '[CheckoutSession/API] Delete CheckoutSession',
  props<{ id: string }>()
);

export const ngPatDeleteCheckoutSessions = createAction(
  '[CheckoutSession/API] Delete CheckoutSessions',
  props<{ ids: string[] }>()
);

export const ngPatClearCheckoutSessions = createAction(
  '[CheckoutSession/API] Clear CheckoutSessions'
);
