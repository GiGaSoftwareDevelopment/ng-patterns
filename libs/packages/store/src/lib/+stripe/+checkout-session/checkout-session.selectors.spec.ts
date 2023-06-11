import { NgPatStripeCheckoutSession } from './checkout-session.model';
import { CheckoutSessionState } from './checkout-session.reducer';
import * as fromCheckoutSessionReducer from './checkout-session.reducer';
import * as fromCheckoutSessionSelectors from './checkout-session.selectors';

describe('NgPatStripeCheckoutSession Selectors', () => {
  let rootState: {
    [fromCheckoutSessionReducer.checkoutSessionsFeatureKey]: CheckoutSessionState;
  };

  const checkoutSession1: NgPatStripeCheckoutSession = {
    id: 'foo1'
  };

  const checkoutSession2: NgPatStripeCheckoutSession = {
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

  it('should selectNgPatAllStripeCheckoutSessions', () => {
    expect(
      fromCheckoutSessionSelectors.selectNgPatAllStripeCheckoutSessions(
        rootState
      ).length
    ).toEqual(2);
  });

  it('should selectNgPatStripeCheckoutSessionEntities', () => {
    expect(
      fromCheckoutSessionSelectors.selectNgPatStripeCheckoutSessionEntities(
        rootState
      )
    ).toEqual(
      rootState[fromCheckoutSessionReducer.checkoutSessionsFeatureKey].entities
    );
  });

  it('should selectNgPatStripeCheckoutSessionIds', () => {
    expect(
      fromCheckoutSessionSelectors.selectNgPatStripeCheckoutSessionIds(
        rootState
      )
    ).toEqual(
      rootState[fromCheckoutSessionReducer.checkoutSessionsFeatureKey].ids
    );
  });

  it('should selectNgPatStripeCheckoutSessionTotal', () => {
    expect(
      fromCheckoutSessionSelectors.selectNgPatStripeCheckoutSessionTotal(
        rootState
      )
    ).toEqual(2);
  });
});
