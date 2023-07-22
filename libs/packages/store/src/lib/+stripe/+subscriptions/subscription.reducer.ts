import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NgPatStripeSubscriptionItem } from './subscription.model';
import * as SubscriptionActions from './subscription.actions';
import { ngPatLogout } from '../../+account/account.actions';
import { ngPatSetRemoteConfig } from '../../+remote-config/remote-config.actions';

export const subscriptionFeatureKey = 'ngPat_stripe_subscription';

export interface SubscriptionState
  extends EntityState<NgPatStripeSubscriptionItem> {
  // additional entities state properties
  isInit: boolean;
  // overridden by firestore value
  trialDays: number;
}

export interface PartialSubscriptionState {
  readonly [subscriptionFeatureKey]: SubscriptionState;
}

export const subscriptionAdapter: EntityAdapter<NgPatStripeSubscriptionItem> =
  createEntityAdapter<NgPatStripeSubscriptionItem>();

export const initialSubscriptionState: SubscriptionState =
  subscriptionAdapter.getInitialState({
    // additional entity state properties
    isInit: false,
    // overridden by firestore value
    trialDays: 10
  });

export const reducer = createReducer(
  initialSubscriptionState,
  on(SubscriptionActions.ngPatAddStripeSubscription, (state, action) =>
    subscriptionAdapter.addOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatSetStripeSubscription, (state, action) =>
    subscriptionAdapter.setOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatAddStripeSubscriptions, (state, action) =>
    subscriptionAdapter.addMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatUpdateStripeSubscription, (state, action) =>
    subscriptionAdapter.updateOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatUpdateStripeSubscriptions, (state, action) =>
    subscriptionAdapter.updateMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatUpsertStripeSubscription, (state, action) =>
    subscriptionAdapter.upsertOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatUpsertStripeSubscriptions, (state, action) =>
    subscriptionAdapter.upsertMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatMapStripeSubscription, (state, { entityMap }) => {
    return subscriptionAdapter.mapOne(entityMap, state);
  }),
  on(
    SubscriptionActions.ngPatMapStripeSubscriptions,
    (state, { entityMap }) => {
      return subscriptionAdapter.map(entityMap, state);
    }
  ),
  on(SubscriptionActions.ngPatDeleteStripeSubscription, (state, action) =>
    subscriptionAdapter.removeOne(action.id, state)
  ),
  on(SubscriptionActions.ngPatDeleteStripeSubscriptions, (state, action) =>
    subscriptionAdapter.removeMany(action.ids, state)
  ),
  on(SubscriptionActions.ngPatLoadStripeSubscriptions, (state, action) =>
    subscriptionAdapter.setAll(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatSetStripeSubscriptions, (state, action) =>
    subscriptionAdapter.setMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatClearStripeSubscriptions, state =>
    subscriptionAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialSubscriptionState,
    ...subscriptionAdapter.removeAll(state)
  })),
  // on(SubscriptionActions.ngPatSelectStripeSubscriptionID, (state, action) => {
  //   return {
  //     ...state,
  //     selectedSubscriptionID: action.id
  //   };
  // }),
  on(
    SubscriptionActions.ngPatUpdateStripeTrial,
    (state, action): SubscriptionState => {
      return {
        ...state,
        trialDays: action.trial.days
      };
    }
  ),
  on(ngPatSetRemoteConfig, (state, action): SubscriptionState => {
    return {
      ...state,
      trialDays: <number>action.remoteConfig.value
    };
  }),
  on(
    SubscriptionActions.ngPatStripeSubscriptionIsInit,
    (state, action): SubscriptionState => {
      return {
        ...state,
        isInit: true
      };
    }
  )
);
