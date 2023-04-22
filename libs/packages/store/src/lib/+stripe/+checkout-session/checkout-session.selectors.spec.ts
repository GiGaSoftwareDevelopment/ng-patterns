import { CheckoutSession } from './checkout-session.model';
import { CheckoutSessionState } from './checkout-session.reducer';
import * as fromCheckoutSessionReducer from './checkout-session.reducer';
import * as fromCheckoutSessionSelectors from './checkout-session.selectors';

describe('CheckoutSession Selectors', () => {
  let rootState: {
    [fromCheckoutSessionReducer.checkoutSessionsFeatureKey]: CheckoutSessionState;
  };

  const checkoutSession1: CheckoutSession = {
    id: 'foo1'
  };

  const checkoutSession2: CheckoutSession = {
    id: 'foo2'
  };

  beforeEach(() => {
    rootState = {
      [fromCheckoutSessionReducer.checkoutSessionsFeatureKey]: {
        ids: [checkoutSession1.id, checkoutSession2.id],
        entities: {
          [checkoutSession1.id]: checkoutSession1,
          [checkoutSession2.id]: checkoutSession2
        }
      }
    };
  });

  it('should selectAllCheckoutSessions', () => {
    expect(
      fromCheckoutSessionSelectors.selectAllCheckoutSessions(rootState).length
    ).toEqual(2);
  });

  it('should selectCheckoutSessionEntities', () => {
    expect(
      fromCheckoutSessionSelectors.selectCheckoutSessionEntities(rootState)
    ).toEqual(
      rootState[fromCheckoutSessionReducer.checkoutSessionsFeatureKey].entities
    );
  });

  it('should selectCheckoutSessionIds', () => {
    expect(
      fromCheckoutSessionSelectors.selectCheckoutSessionIds(rootState)
    ).toEqual(
      rootState[fromCheckoutSessionReducer.checkoutSessionsFeatureKey].ids
    );
  });

  it('should selectCheckoutSessionTotal', () => {
    expect(
      fromCheckoutSessionSelectors.selectCheckoutSessionTotal(rootState)
    ).toEqual(2);
  });
});
