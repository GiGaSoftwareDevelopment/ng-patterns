import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Price } from './price.model';
import * as PriceActions from './price.actions';
import { ngPatLogout } from '../../+account/account.actions';

export const priceFeatureKey = 'stripe_prices';

export interface PriceState extends EntityState<Price> {
  // additional entities state properties
  selectedPriceID: string | null;
}

export const priceAdapter: EntityAdapter<Price> = createEntityAdapter<Price>();

export const initialPriceState: PriceState = priceAdapter.getInitialState({
  // additional entity state properties
  selectedPriceID: null
});

export const reducer = createReducer(
  initialPriceState,
  on(PriceActions.addPrice, (state, action) =>
    priceAdapter.addOne(action.price, state)
  ),
  on(PriceActions.setPrice, (state, action) =>
    priceAdapter.setOne(action.price, state)
  ),
  on(PriceActions.addPrices, (state, action) =>
    priceAdapter.addMany(action.prices, state)
  ),
  on(PriceActions.updatePrice, (state, action) =>
    priceAdapter.updateOne(action.price, state)
  ),
  on(PriceActions.updatePrices, (state, action) =>
    priceAdapter.updateMany(action.prices, state)
  ),
  on(PriceActions.upsertPrice, (state, action) =>
    priceAdapter.upsertOne(action.price, state)
  ),
  on(PriceActions.upsertPrices, (state, action) =>
    priceAdapter.upsertMany(action.prices, state)
  ),
  on(PriceActions.mapPrice, (state, { entityMap }) => {
    return priceAdapter.mapOne(entityMap, state);
  }),
  on(PriceActions.mapPrices, (state, { entityMap }) => {
    return priceAdapter.map(entityMap, state);
  }),
  on(PriceActions.deletePrice, (state, action) =>
    priceAdapter.removeOne(action.id, state)
  ),
  on(PriceActions.deletePrices, (state, action) =>
    priceAdapter.removeMany(action.ids, state)
  ),
  on(PriceActions.loadPrices, (state, action) =>
    priceAdapter.setAll(action.prices, state)
  ),
  on(PriceActions.setPrices, (state, action) =>
    priceAdapter.setMany(action.prices, state)
  ),
  on(PriceActions.clearPrices, state => priceAdapter.removeAll(state)),
  on(ngPatLogout, state => ({
    ...initialPriceState,
    ...priceAdapter.removeAll(state)
  })),
  on(PriceActions.selectPriceID, (state, action): PriceState => {
    return {
      ...state,
      selectedPriceID: action.id
    };
  })
);
