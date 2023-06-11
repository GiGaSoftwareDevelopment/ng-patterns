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

  it('should selectNgPatAllSubscriptions', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatAllSubscriptions(rootState).length
    ).toEqual(2);
  });

  it('should selectNgPatSubscriptionEntities', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatSubscriptionEntities(rootState)
    ).toEqual(
      rootState[fromSubscriptionReducer.subscriptionsFeatureKey].entities
    );
  });

  it('should selectNgPatSubscriptionIds', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatSubscriptionIds(rootState)
    ).toEqual(rootState[fromSubscriptionReducer.subscriptionsFeatureKey].ids);
  });

  it('should selectNgPatSubscriptionTotal', () => {
    expect(
      fromSubscriptionSelectors.selectNgPatSubscriptionTotal(rootState)
    ).toEqual(2);
  });
});
