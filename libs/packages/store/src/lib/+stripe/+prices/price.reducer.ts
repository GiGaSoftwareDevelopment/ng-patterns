import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as PriceActions from './price.actions';
import { ngPatLogout } from '../../+account/account.actions';
import { NgPatStripeProductPrice } from '../+product/product.model';

export const priceFeatureKey = 'ngPat_stripe_prices';

export interface PriceState extends EntityState<NgPatStripeProductPrice> {
  // additional entities state properties
  selectedPriceID: string | null;
}

export const priceAdapter: EntityAdapter<NgPatStripeProductPrice> =
  createEntityAdapter<NgPatStripeProductPrice>();

export const initialPriceState: PriceState = priceAdapter.getInitialState({
  // additional entity state properties
  selectedPriceID: null
});

export const reducer = createReducer(
  initialPriceState,
  on(PriceActions.ngPatAddStripePrice, (state, action) =>
    priceAdapter.addOne(action.price, state)
  ),
  on(PriceActions.ngPatSetStripePrice, (state, action) =>
    priceAdapter.setOne(action.price, state)
  ),
  on(PriceActions.ngPatAddStripePrices, (state, action) =>
    priceAdapter.addMany(action.prices, state)
  ),
  on(PriceActions.ngPatUpdateStripePrice, (state, action) =>
    priceAdapter.updateOne(action.price, state)
  ),
  on(PriceActions.ngPatUpdateStripePrices, (state, action) =>
    priceAdapter.updateMany(action.prices, state)
  ),
  on(PriceActions.ngPatUpsertStripePrice, (state, action) =>
    priceAdapter.upsertOne(action.price, state)
  ),
  on(PriceActions.ngPatUpsertStripePrices, (state, action) =>
    priceAdapter.upsertMany(action.prices, state)
  ),
  on(PriceActions.ngPatMapStripePrice, (state, { entityMap }) => {
    return priceAdapter.mapOne(entityMap, state);
  }),
  on(PriceActions.ngPatMapStripePrices, (state, { entityMap }) => {
    return priceAdapter.map(entityMap, state);
  }),
  on(PriceActions.ngPatDeleteStripePrice, (state, action) =>
    priceAdapter.removeOne(action.id, state)
  ),
  on(PriceActions.ngPatDeleteStripePrices, (state, action) =>
    priceAdapter.removeMany(action.ids, state)
  ),
  on(PriceActions.ngPatLoadStripePrices, (state, action) =>
    priceAdapter.setAll(action.prices, state)
  ),
  on(PriceActions.ngPatSetStripePrices, (state, action) =>
    priceAdapter.setMany(action.prices, state)
  ),
  on(PriceActions.ngPatClearStripePrices, state =>
    priceAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialPriceState,
    ...priceAdapter.removeAll(state)
  })),
  on(PriceActions.ngPatSelectStripePriceID, (state, action): PriceState => {
    return {
      ...state,
      selectedPriceID: action.id
    };
  })
);
