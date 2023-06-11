import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NgPatStripeProduct } from './product.model';
import * as ProductActions from './product.actions';
import { ngPatLogout } from '../../+account/account.actions';

export const productFeatureKey = 'stripe_products';

export interface ProductState extends EntityState<NgPatStripeProduct> {
  // additional entities state properties
  selectedProductID: string | null;
}

export const productAdapter: EntityAdapter<NgPatStripeProduct> =
  createEntityAdapter<NgPatStripeProduct>();

export const initialProductState: ProductState = productAdapter.getInitialState(
  {
    // additional entity state properties
    selectedProductID: null
  }
);

export const reducer = createReducer(
  initialProductState,
  on(ProductActions.ngPatAddStripeProduct, (state, action) =>
    productAdapter.addOne(action.product, state)
  ),
  on(ProductActions.ngPatSetStripeProduct, (state, action) =>
    productAdapter.setOne(action.product, state)
  ),
  on(ProductActions.ngPatAddStripeProducts, (state, action) =>
    productAdapter.addMany(action.products, state)
  ),
  on(ProductActions.ngPatUpdateStripeProduct, (state, action) =>
    productAdapter.updateOne(action.product, state)
  ),
  on(ProductActions.ngPatUpdateStripeProducts, (state, action) =>
    productAdapter.updateMany(action.products, state)
  ),
  on(ProductActions.ngPatUpsertStripeProduct, (state, action) =>
    productAdapter.upsertOne(action.product, state)
  ),
  on(ProductActions.ngPatUpsertStripeProducts, (state, action) =>
    productAdapter.upsertMany(action.products, state)
  ),
  on(ProductActions.ngPatMapStripeProduct, (state, { entityMap }) => {
    return productAdapter.mapOne(entityMap, state);
  }),
  on(ProductActions.ngPatMapStripeProducts, (state, { entityMap }) => {
    return productAdapter.map(entityMap, state);
  }),
  on(ProductActions.ngPatDeleteStripeProduct, (state, action) =>
    productAdapter.removeOne(action.id, state)
  ),
  on(ProductActions.ngPatDeleteStripeProducts, (state, action) =>
    productAdapter.removeMany(action.ids, state)
  ),
  on(ProductActions.ngPatLoadStripeProducts, (state, action) =>
    productAdapter.setAll(action.products, state)
  ),
  on(ProductActions.ngPatSetStripeProducts, (state, action) =>
    productAdapter.setMany(action.products, state)
  ),
  on(ProductActions.ngPatClearStripeProducts, state =>
    productAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialProductState,
    ...productAdapter.removeAll(state)
  })),
  on(
    ProductActions.ngPatSelectStripeProductID,
    (state, action): ProductState => {
      return {
        ...state,
        selectedProductID: action.id
      };
    }
  )
);
