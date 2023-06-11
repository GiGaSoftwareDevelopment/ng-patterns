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
  on(ProductActions.ngPatAddProduct, (state, action) =>
    productAdapter.addOne(action.product, state)
  ),
  on(ProductActions.ngPatSetProduct, (state, action) =>
    productAdapter.setOne(action.product, state)
  ),
  on(ProductActions.ngPatAddProducts, (state, action) =>
    productAdapter.addMany(action.products, state)
  ),
  on(ProductActions.ngPatUpdateProduct, (state, action) =>
    productAdapter.updateOne(action.product, state)
  ),
  on(ProductActions.ngPatUpdateProducts, (state, action) =>
    productAdapter.updateMany(action.products, state)
  ),
  on(ProductActions.ngPatUpsertProduct, (state, action) =>
    productAdapter.upsertOne(action.product, state)
  ),
  on(ProductActions.ngPatUpsertProducts, (state, action) =>
    productAdapter.upsertMany(action.products, state)
  ),
  on(ProductActions.ngPatMapProduct, (state, { entityMap }) => {
    return productAdapter.mapOne(entityMap, state);
  }),
  on(ProductActions.ngPatMapProducts, (state, { entityMap }) => {
    return productAdapter.map(entityMap, state);
  }),
  on(ProductActions.ngPatDeleteProduct, (state, action) =>
    productAdapter.removeOne(action.id, state)
  ),
  on(ProductActions.ngPatDeleteProducts, (state, action) =>
    productAdapter.removeMany(action.ids, state)
  ),
  on(ProductActions.ngPatLoadProducts, (state, action) =>
    productAdapter.setAll(action.products, state)
  ),
  on(ProductActions.ngPatSetProducts, (state, action) =>
    productAdapter.setMany(action.products, state)
  ),
  on(ProductActions.ngPatClearProducts, state =>
    productAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialProductState,
    ...productAdapter.removeAll(state)
  })),
  on(ProductActions.ngPatSelectProductID, (state, action): ProductState => {
    return {
      ...state,
      selectedProductID: action.id
    };
  })
);
