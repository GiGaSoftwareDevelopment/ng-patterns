import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as PriceActions from './price.actions';
import { ngPatLogout } from '../../+account/account.actions';
import { ProductPrice } from '../+product/product.model';

export const priceFeatureKey = 'stripe_prices';

export interface PriceState extends EntityState<ProductPrice> {
  // additional entities state properties
  selectedPriceID: string | null;
}

export const priceAdapter: EntityAdapter<ProductPrice> =
  createEntityAdapter<ProductPrice>();

export const initialPriceState: PriceState = priceAdapter.getInitialState({
  // additional entity state properties
  selectedPriceID: null
});

export const reducer = createReducer(
  initialPriceState,
  on(PriceActions.ngPatAddPrice, (state, action) =>
    priceAdapter.addOne(action.price, state)
  ),
  on(PriceActions.ngPatSetPrice, (state, action) =>
    priceAdapter.setOne(action.price, state)
  ),
  on(PriceActions.ngPatAddPrices, (state, action) =>
    priceAdapter.addMany(action.prices, state)
  ),
  on(PriceActions.ngPatUpdatePrice, (state, action) =>
    priceAdapter.updateOne(action.price, state)
  ),
  on(PriceActions.ngPatUpdatePrices, (state, action) =>
    priceAdapter.updateMany(action.prices, state)
  ),
  on(PriceActions.ngPatUpsertPrice, (state, action) =>
    priceAdapter.upsertOne(action.price, state)
  ),
  on(PriceActions.ngPatUpsertPrices, (state, action) =>
    priceAdapter.upsertMany(action.prices, state)
  ),
  on(PriceActions.ngPatMapPrice, (state, { entityMap }) => {
    return priceAdapter.mapOne(entityMap, state);
  }),
  on(PriceActions.ngPatMapPrices, (state, { entityMap }) => {
    return priceAdapter.map(entityMap, state);
  }),
  on(PriceActions.ngPatDeletePrice, (state, action) =>
    priceAdapter.removeOne(action.id, state)
  ),
  on(PriceActions.ngPatDeletePrices, (state, action) =>
    priceAdapter.removeMany(action.ids, state)
  ),
  on(PriceActions.ngPatLoadPrices, (state, action) =>
    priceAdapter.setAll(action.prices, state)
  ),
  on(PriceActions.ngPatSetPrices, (state, action) =>
    priceAdapter.setMany(action.prices, state)
  ),
  on(PriceActions.ngPatClearPrices, state => priceAdapter.removeAll(state)),
  on(ngPatLogout, state => ({
    ...initialPriceState,
    ...priceAdapter.removeAll(state)
  })),
  on(PriceActions.ngPatSelectPriceID, (state, action): PriceState => {
    return {
      ...state,
      selectedPriceID: action.id
    };
  })
);
