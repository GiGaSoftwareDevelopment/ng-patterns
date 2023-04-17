import {createAction, props} from '@ngrx/store';
import {EntityMap, EntityMapOne, Update} from '@ngrx/entity';

import {SubscriptionItem, Trial} from './subscription.model';

export const addSubscription = createAction(
  '[Subscription/API] Add Subscription',
  props<{subscription: SubscriptionItem}>()
);

export const setSubscription = createAction(
  '[Subscription/API] Set Subscription',
  props<{subscription: SubscriptionItem}>()
);

export const upsertSubscription = createAction(
  '[Subscription/API] Upsert Subscription',
  props<{subscription: SubscriptionItem}>()
);

export const addSubscriptions = createAction(
  '[Subscription/API] Add Subscriptions',
  props<{subscriptions: SubscriptionItem[]}>()
);

export const upsertSubscriptions = createAction(
  '[Subscription/API] Upsert Subscriptions',
  props<{subscriptions: SubscriptionItem[]}>()
);

export const updateSubscription = createAction(
  '[Subscription/API] Update Subscription',
  props<{subscription: Update<SubscriptionItem>}>()
);

export const updateSubscriptions = createAction(
  '[Subscription/API] Update Subscriptions',
  props<{subscriptions: Update<SubscriptionItem>[]}>()
);

export const mapSubscription = createAction(
  '[Subscription/API] Map Subscription',
  props<{entityMap: EntityMapOne<SubscriptionItem>}>()
);

export const mapSubscriptions = createAction(
  '[Subscription/API] Map Subscriptions',
  props<{entityMap: EntityMap<SubscriptionItem>}>()
);

export const deleteSubscription = createAction(
  '[Subscription/API] Delete Subscription',
  props<{id: string}>()
);

export const deleteSubscriptionFromfirestore = createAction(
  '[eSubscription/API] Delete eSubscription From Firestore',
  props<{id: string}>()
);

export const deleteSubscriptions = createAction(
  '[Subscription/API] Delete Subscriptions',
  props<{ids: string[]}>()
);

export const loadSubscriptions = createAction(
  '[Subscription/API] Load Subscriptions',
  props<{subscriptions: SubscriptionItem[]}>()
);

export const setSubscriptions = createAction(
  '[Subscription/API] Set Subscriptions',
  props<{subscriptions: SubscriptionItem[]}>()
);

export const clearSubscriptions = createAction(
  '[Subscription/API] Clear Subscriptions'
);

export const selectSubscriptionID = createAction(
  '[Subscription/API] Select Subscription',
  props<{id: string}>()
);

export const updateFirestorePartialSubscription = createAction(
  '[Subscription/API] Save Partial Subscription',
  props<{changes: Partial<SubscriptionItem>; subscription: SubscriptionItem}>()
);

export const updateTrial = createAction(
  '[Subscription/API] Update Trial',
  props<{trial: Trial}>()
);

export const subscriptionIsInit = createAction('[Subscription/API] Is Init');
