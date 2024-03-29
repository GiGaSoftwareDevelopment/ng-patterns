import { Price } from './price.model';
import { PriceState } from './price.reducer';
import * as fromPriceReducer from './price.reducer';
import * as fromPriceSelectors from './price.selectors';

describe('Price Selectors', () => {
  let rootState: { [fromPriceReducer.priceFeatureKey]: PriceState };

  const price1: Price = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const price2: Price = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromPriceReducer.priceFeatureKey]: {
        ids: [price1.id, price2.id],
        entities: {
          [price1.id]: price1,
          [price2.id]: price2
        }
      }
    };
  });

  it('should selectNgPatAllStripePrices', () => {
    expect(
      fromPriceSelectors.selectNgPatAllStripePrices(rootState).length
    ).toEqual(2);
  });

  it('should selectNgPatStripePriceEntities', () => {
    expect(
      fromPriceSelectors.selectNgPatStripePriceEntities(rootState)
    ).toEqual(rootState[fromPriceReducer.pricesFeatureKey].entities);
  });

  it('should selectNgPatStripePriceIds', () => {
    expect(fromPriceSelectors.selectNgPatStripePriceIds(rootState)).toEqual(
      rootState[fromPriceReducer.pricesFeatureKey].ids
    );
  });

  it('should selectNgPatStripePriceTotal', () => {
    expect(fromPriceSelectors.selectNgPatStripePriceTotal(rootState)).toEqual(
      2
    );
  });
});
