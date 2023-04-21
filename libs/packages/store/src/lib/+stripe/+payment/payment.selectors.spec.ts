import { PaymentState } from './payment.reducer';
import * as fromPaymentReducer from './payment.reducer';
import * as fromPaymentSelectors from './payment.selectors';
import { PaymentIntent } from '../entities/payment.model';

describe('Payment Selectors', () => {
  let rootState: { [fromPaymentReducer.paymentsFeatureKey]: PaymentState };

  const payment1: PaymentIntent = {
    id: 'foo1'
  };

  const payment2: PaymentIntent = {
    id: 'foo2'
  };

  beforeEach(() => {
    rootState = {
      [fromPaymentReducer.paymentsFeatureKey]: {
        isLoaded: false,
        isLoading: false,
        error: null,
        ids: [payment1.id, payment2.id],
        entities: {
          [payment1.id]: payment1,
          [payment2.id]: payment2
        }
      }
    };
  });

  it('should selectAllPayments', () => {
    expect(fromPaymentSelectors.selectAllPayments(rootState).length).toEqual(2);
  });

  it('should selectPaymentEntities', () => {
    expect(fromPaymentSelectors.selectPaymentEntities(rootState)).toEqual(
      rootState[fromPaymentReducer.paymentsFeatureKey].entities
    );
  });

  it('should selectPaymentIds', () => {
    expect(fromPaymentSelectors.selectPaymentIds(rootState)).toEqual(
      rootState[fromPaymentReducer.paymentsFeatureKey].ids
    );
  });

  it('should selectPaymentTotal', () => {
    expect(fromPaymentSelectors.selectPaymentTotal(rootState)).toEqual(2);
  });
});
