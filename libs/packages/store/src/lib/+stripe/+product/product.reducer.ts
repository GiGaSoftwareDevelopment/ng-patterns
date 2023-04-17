import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from './product.model';
import * as ProductActions from './product.actions';
import { ngPatLogout } from '../../+account/account.actions';

export const productFeatureKey = 'stripe_products';

export interface ProductState extends EntityState<Product> {
  // additional entities state properties
  selectedProductID: string | null;
}

export const productAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>();

export const initialProductState: ProductState = productAdapter.getInitialState(
  {
    // additional entity state properties
    selectedProductID: null
  }
);

export const reducer = createReducer(
  initialProductState,
  on(ProductActions.addProduct, (state, action) =>
    productAdapter.addOne(action.product, state)
  ),
  on(ProductActions.setProduct, (state, action) =>
    productAdapter.setOne(action.product, state)
  ),
  on(ProductActions.addProducts, (state, action) =>
    productAdapter.addMany(action.products, state)
  ),
  on(ProductActions.updateProduct, (state, action) =>
    productAdapter.updateOne(action.product, state)
  ),
  on(ProductActions.updateProducts, (state, action) =>
    productAdapter.updateMany(action.products, state)
  ),
  on(ProductActions.upsertProduct, (state, action) =>
    productAdapter.upsertOne(action.product, state)
  ),
  on(ProductActions.upsertProducts, (state, action) =>
    productAdapter.upsertMany(action.products, state)
  ),
  on(ProductActions.mapProduct, (state, { entityMap }) => {
    return productAdapter.mapOne(entityMap, state);
  }),
  on(ProductActions.mapProducts, (state, { entityMap }) => {
    return productAdapter.map(entityMap, state);
  }),
  on(ProductActions.deleteProduct, (state, action) =>
    productAdapter.removeOne(action.id, state)
  ),
  on(ProductActions.deleteProducts, (state, action) =>
    productAdapter.removeMany(action.ids, state)
  ),
  on(ProductActions.loadProducts, (state, action) =>
    productAdapter.setAll(action.products, state)
  ),
  on(ProductActions.setProducts, (state, action) =>
    productAdapter.setMany(action.products, state)
  ),
  on(ProductActions.clearProducts, state => productAdapter.removeAll(state)),
  on(ngPatLogout, state => ({
    ...initialProductState,
    ...productAdapter.removeAll(state)
  })),
  on(ProductActions.selectProductID, (state, action): ProductState => {
    return {
      ...state,
      selectedProductID: action.id
    };
  })
);
