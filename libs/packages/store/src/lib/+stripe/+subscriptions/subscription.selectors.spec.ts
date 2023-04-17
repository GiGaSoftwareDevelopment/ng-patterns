import {Subscription} from './subscription.model';
import {SubscriptionState} from './subscription.reducer';
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

  it('should selectAllSubscriptions', () => {
    expect(
      fromSubscriptionSelectors.selectAllSubscriptions(rootState).length
    ).toEqual(2);
  });

  it('should selectSubscriptionEntities', () => {
    expect(
      fromSubscriptionSelectors.selectSubscriptionEntities(rootState)
    ).toEqual(
      rootState[fromSubscriptionReducer.subscriptionsFeatureKey].entities
    );
  });

  it('should selectSubscriptionIds', () => {
    expect(fromSubscriptionSelectors.selectSubscriptionIds(rootState)).toEqual(
      rootState[fromSubscriptionReducer.subscriptionsFeatureKey].ids
    );
  });

  it('should selectSubscriptionTotal', () => {
    expect(
      fromSubscriptionSelectors.selectSubscriptionTotal(rootState)
    ).toEqual(2);
  });
});
