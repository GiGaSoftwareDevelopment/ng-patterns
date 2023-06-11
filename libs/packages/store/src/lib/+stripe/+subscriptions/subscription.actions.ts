import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { NgPatStripeSubscriptionItem, Trial } from './subscription.model';

export const ngPatAddStripeSubscription = createAction(
  '[Subscription/API] Add Subscription',
  props<{ subscription: NgPatStripeSubscriptionItem }>()
);

export const ngPatSetStripeSubscription = createAction(
  '[Subscription/API] Set Subscription',
  props<{ subscription: NgPatStripeSubscriptionItem }>()
);

export const ngPatUpsertStripeSubscription = createAction(
  '[Subscription/API] Upsert Subscription',
  props<{ subscription: NgPatStripeSubscriptionItem }>()
);

export const ngPatAddStripeSubscriptions = createAction(
  '[Subscription/API] Add Subscriptions',
  props<{ subscriptions: NgPatStripeSubscriptionItem[] }>()
);

export const ngPatUpsertStripeSubscriptions = createAction(
  '[Subscription/API] Upsert Subscriptions',
  props<{ subscriptions: NgPatStripeSubscriptionItem[] }>()
);

export const ngPatUpdateStripeSubscription = createAction(
  '[Subscription/API] Update Subscription',
  props<{ subscription: Update<NgPatStripeSubscriptionItem> }>()
);

export const ngPatUpdateStripeSubscriptions = createAction(
  '[Subscription/API] Update Subscriptions',
  props<{ subscriptions: Update<NgPatStripeSubscriptionItem>[] }>()
);

export const ngPatMapStripeSubscription = createAction(
  '[Subscription/API] Map Subscription',
  props<{ entityMap: EntityMapOne<NgPatStripeSubscriptionItem> }>()
);

export const ngPatMapStripeSubscriptions = createAction(
  '[Subscription/API] Map Subscriptions',
  props<{ entityMap: EntityMap<NgPatStripeSubscriptionItem> }>()
);

export const ngPatDeleteStripeSubscription = createAction(
  '[Subscription/API] Delete Subscription',
  props<{ id: string }>()
);

export const ngPatDeleteStripeSubscriptionFromfirestore = createAction(
  '[eSubscription/API] Delete eSubscription From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripeSubscriptions = createAction(
  '[Subscription/API] Delete Subscriptions',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripeSubscriptions = createAction(
  '[Subscription/API] Load Subscriptions',
  props<{ subscriptions: NgPatStripeSubscriptionItem[] }>()
);

export const ngPatSetStripeSubscriptions = createAction(
  '[Subscription/API] Set Subscriptions',
  props<{ subscriptions: NgPatStripeSubscriptionItem[] }>()
);

export const ngPatClearStripeSubscriptions = createAction(
  '[Subscription/API] Clear Subscriptions'
);

export const ngPatSelectStripeSubscriptionID = createAction(
  '[Subscription/API] Select Subscription',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripeSubscription = createAction(
  '[Subscription/API] Save Partial Subscription',
  props<{
    changes: Partial<NgPatStripeSubscriptionItem>;
    subscription: NgPatStripeSubscriptionItem;
  }>()
);

export const ngPatUpdateStripeTrial = createAction(
  '[Subscription/API] Update Trial',
  props<{ trial: Trial }>()
);

export const ngPatStripeSubscriptionIsInit = createAction(
  '[Subscription/API] Is Init'
);
