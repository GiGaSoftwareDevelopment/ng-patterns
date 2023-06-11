import { Product } from './product.model';
import { ProductState } from './product.reducer';
import * as fromProductReducer from './product.reducer';
import * as fromProductSelectors from './product.selectors';

describe('Product Selectors', () => {
  let rootState: { [fromProductReducer.productFeatureKey]: ProductState };

  const product1: Product = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const product2: Product = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromProductReducer.productFeatureKey]: {
        ids: [product1.id, product2.id],
        entities: {
          [product1.id]: product1,
          [product2.id]: product2
        }
      }
    };
  });

  it('should selectNgPatAllProducts', () => {
    expect(
      fromProductSelectors.selectNgPatAllProducts(rootState).length
    ).toEqual(2);
  });

  it('should selectNgPatProductEntities', () => {
    expect(fromProductSelectors.selectNgPatProductEntities(rootState)).toEqual(
      rootState[fromProductReducer.productsFeatureKey].entities
    );
  });

  it('should selectNgPatProductIds', () => {
    expect(fromProductSelectors.selectNgPatProductIds(rootState)).toEqual(
      rootState[fromProductReducer.productsFeatureKey].ids
    );
  });

  it('should selectNgPatProductTotal', () => {
    expect(fromProductSelectors.selectNgPatProductTotal(rootState)).toEqual(2);
  });
});
