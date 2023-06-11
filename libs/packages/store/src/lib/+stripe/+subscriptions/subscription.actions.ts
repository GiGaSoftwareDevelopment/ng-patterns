import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { SubscriptionItem, Trial } from './subscription.model';

export const ngPatAddSubscription = createAction(
  '[Subscription/API] Add Subscription',
  props<{ subscription: SubscriptionItem }>()
);

export const ngPatSetSubscription = createAction(
  '[Subscription/API] Set Subscription',
  props<{ subscription: SubscriptionItem }>()
);

export const ngPatUpsertSubscription = createAction(
  '[Subscription/API] Upsert Subscription',
  props<{ subscription: SubscriptionItem }>()
);

export const ngPatAddSubscriptions = createAction(
  '[Subscription/API] Add Subscriptions',
  props<{ subscriptions: SubscriptionItem[] }>()
);

export const ngPatUpsertSubscriptions = createAction(
  '[Subscription/API] Upsert Subscriptions',
  props<{ subscriptions: SubscriptionItem[] }>()
);

export const ngPatUpdateSubscription = createAction(
  '[Subscription/API] Update Subscription',
  props<{ subscription: Update<SubscriptionItem> }>()
);

export const ngPatUpdateSubscriptions = createAction(
  '[Subscription/API] Update Subscriptions',
  props<{ subscriptions: Update<SubscriptionItem>[] }>()
);

export const ngPatMapSubscription = createAction(
  '[Subscription/API] Map Subscription',
  props<{ entityMap: EntityMapOne<SubscriptionItem> }>()
);

export const ngPatMapSubscriptions = createAction(
  '[Subscription/API] Map Subscriptions',
  props<{ entityMap: EntityMap<SubscriptionItem> }>()
);

export const ngPatDeleteSubscription = createAction(
  '[Subscription/API] Delete Subscription',
  props<{ id: string }>()
);

export const ngPatDeleteSubscriptionFromfirestore = createAction(
  '[eSubscription/API] Delete eSubscription From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteSubscriptions = createAction(
  '[Subscription/API] Delete Subscriptions',
  props<{ ids: string[] }>()
);

export const ngPatLoadSubscriptions = createAction(
  '[Subscription/API] Load Subscriptions',
  props<{ subscriptions: SubscriptionItem[] }>()
);

export const ngPatSetSubscriptions = createAction(
  '[Subscription/API] Set Subscriptions',
  props<{ subscriptions: SubscriptionItem[] }>()
);

export const ngPatClearSubscriptions = createAction(
  '[Subscription/API] Clear Subscriptions'
);

export const ngPatSelectSubscriptionID = createAction(
  '[Subscription/API] Select Subscription',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialSubscription = createAction(
  '[Subscription/API] Save Partial Subscription',
  props<{
    changes: Partial<SubscriptionItem>;
    subscription: SubscriptionItem;
  }>()
);

export const ngPatUpdateTrial = createAction(
  '[Subscription/API] Update Trial',
  props<{ trial: Trial }>()
);

export const ngPatSubscriptionIsInit = createAction(
  '[Subscription/API] Is Init'
);
