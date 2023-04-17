import {Product} from './product.model';
import {ProductState} from './product.reducer';
import * as fromProductReducer from './product.reducer';
import * as fromProductSelectors from './product.selectors';

describe('Product Selectors', () => {
  let rootState: {[fromProductReducer.productFeatureKey]: ProductState};

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

  it('should selectAllProducts', () => {
    expect(fromProductSelectors.selectAllProducts(rootState).length).toEqual(2);
  });

  it('should selectProductEntities', () => {
    expect(fromProductSelectors.selectProductEntities(rootState)).toEqual(
      rootState[fromProductReducer.productsFeatureKey].entities
    );
  });

  it('should selectProductIds', () => {
    expect(fromProductSelectors.selectProductIds(rootState)).toEqual(
      rootState[fromProductReducer.productsFeatureKey].ids
    );
  });

  it('should selectProductTotal', () => {
    expect(fromProductSelectors.selectProductTotal(rootState)).toEqual(2);
  });
});
