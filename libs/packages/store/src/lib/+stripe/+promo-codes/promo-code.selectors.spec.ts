import { PromoCode } from './promo-code.model';
import { PromoCodeState } from './promo-code.reducer';
import * as fromPromoCodeReducer from './promo-code.reducer';
import * as fromPromoCodeSelectors from './promo-code.selectors';

describe('PromoCode Selectors', () => {
  let rootState: { [fromPromoCodeReducer.promoCodeFeatureKey]: PromoCodeState };

  const promoCode1: PromoCode = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const promoCode2: PromoCode = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromPromoCodeReducer.promoCodeFeatureKey]: {
        ids: [promoCode1.id, promoCode2.id],
        entities: {
          [promoCode1.id]: promoCode1,
          [promoCode2.id]: promoCode2
        }
      }
    };
  });

  it('should selectNgPatAllPromoCodes', () => {
    expect(
      fromPromoCodeSelectors.selectNgPatAllPromoCodes(rootState).length
    ).toEqual(2);
  });

  it('should selectNgPatPromoCodeEntities', () => {
    expect(
      fromPromoCodeSelectors.selectNgPatPromoCodeEntities(rootState)
    ).toEqual(rootState[fromPromoCodeReducer.promoCodesFeatureKey].entities);
  });

  it('should selectNgPatPromoCodeIds', () => {
    expect(fromPromoCodeSelectors.selectNgPatPromoCodeIds(rootState)).toEqual(
      rootState[fromPromoCodeReducer.promoCodesFeatureKey].ids
    );
  });

  it('should selectNgPatPromoCodeTotal', () => {
    expect(fromPromoCodeSelectors.selectNgPatPromoCodeTotal(rootState)).toEqual(
      2
    );
  });
});
