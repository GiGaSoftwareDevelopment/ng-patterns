import { Subscription } from './subscription.model';
import { SubscriptionState } from './subscription.reducer';
import * as fromSubscriptionReducer from './subscription.reducer';
import * as fromSubscriptionSelectors from './subscription.selectors';

describe('Subscription Selectors', () => {
  let rootState: {
    [fromSubscriptionReducer.subscriptionFeatureKey]: SubscriptionState;
  };

  const subscription1: Subscription = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const subscription2: Subscription = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromSubscriptionReducer.subscriptionFeatureKey]: {
        ids: [subscription1.id, subscription2.id],
        entities: {
          [subscription1.id]: subscription1,
          [subscription2.id]: subscription2
        }
      }
    };
  });

  it('should selectNgPatStripeAllSubscriptions', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatStripeAllSubscriptions(rootState)
        .length
    ).toEqual(2);
  });

  it('should selectNgPatStripeSubscriptionEntities', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatStripeSubscriptionEntities(rootState)
    ).toEqual(
      rootState[fromSubscriptionReducer.subscriptionsFeatureKey].entities
    );
  });

  it('should selectNgPatStripeSubscriptionIds', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatStripeSubscriptionIds(rootState)
    ).toEqual(rootState[fromSubscriptionReducer.subscriptionsFeatureKey].ids);
  });

  it('should selectNgPatStripeSubscriptionTotal', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatStripeSubscriptionTotal(rootState)
    ).toEqual(2);
  });
});
