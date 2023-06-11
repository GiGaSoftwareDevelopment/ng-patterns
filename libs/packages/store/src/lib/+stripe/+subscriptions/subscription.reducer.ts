import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { SubscriptionItem } from './subscription.model';
import * as SubscriptionActions from './subscription.actions';
import { ngPatLogout } from '../../+account/account.actions';
import { ngPatSetRemoteConfig } from '../../+remote-config/remote-config.actions';

export const subscriptionFeatureKey = 'stripe_subscription';

export interface SubscriptionState extends EntityState<SubscriptionItem> {
  // additional entities state properties
  isInit: boolean;
  // overridden by firestore value
  trialDays: number;
}

export interface PartialSubscriptionState {
  readonly [subscriptionFeatureKey]: SubscriptionState;
}

export const subscriptionAdapter: EntityAdapter<SubscriptionItem> =
  createEntityAdapter<SubscriptionItem>();

export const initialSubscriptionState: SubscriptionState =
  subscriptionAdapter.getInitialState({
    // additional entity state properties
    isInit: false,
    // overridden by firestore value
    trialDays: 10
  });

export const reducer = createReducer(
  initialSubscriptionState,
  on(SubscriptionActions.ngPatAddSubscription, (state, action) =>
    subscriptionAdapter.addOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatSetSubscription, (state, action) =>
    subscriptionAdapter.setOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatAddSubscriptions, (state, action) =>
    subscriptionAdapter.addMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatUpdateSubscription, (state, action) =>
    subscriptionAdapter.updateOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatUpdateSubscriptions, (state, action) =>
    subscriptionAdapter.updateMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatUpsertSubscription, (state, action) =>
    subscriptionAdapter.upsertOne(action.subscription, state)
  ),
  on(SubscriptionActions.ngPatUpsertSubscriptions, (state, action) =>
    subscriptionAdapter.upsertMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatMapSubscription, (state, { entityMap }) => {
    return subscriptionAdapter.mapOne(entityMap, state);
  }),
  on(SubscriptionActions.ngPatMapSubscriptions, (state, { entityMap }) => {
    return subscriptionAdapter.map(entityMap, state);
  }),
  on(SubscriptionActions.ngPatDeleteSubscription, (state, action) =>
    subscriptionAdapter.removeOne(action.id, state)
  ),
  on(SubscriptionActions.ngPatDeleteSubscriptions, (state, action) =>
    subscriptionAdapter.removeMany(action.ids, state)
  ),
  on(SubscriptionActions.ngPatLoadSubscriptions, (state, action) =>
    subscriptionAdapter.setAll(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatSetSubscriptions, (state, action) =>
    subscriptionAdapter.setMany(action.subscriptions, state)
  ),
  on(SubscriptionActions.ngPatClearSubscriptions, state =>
    subscriptionAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialSubscriptionState,
    ...subscriptionAdapter.removeAll(state)
  })),
  // on(SubscriptionActions.ngPatSelectSubscriptionID, (state, action) => {
  //   return {
  //     ...state,
  //     selectedSubscriptionID: action.id
  //   };
  // }),
  on(
    SubscriptionActions.ngPatUpdateTrial,
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
    SubscriptionActions.ngPatSubscriptionIsInit,
    (state, action): SubscriptionState => {
      return {
        ...state,
        isInit: true
      };
    }
  )
);
