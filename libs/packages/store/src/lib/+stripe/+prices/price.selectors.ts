import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PriceReducer from './price.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { ProductPrice } from '../+product';

export const selectPriceState = createFeatureSelector<PriceReducer.PriceState>(
  PriceReducer.priceFeatureKey
);

const { selectIds, selectEntities, selectAll, selectTotal } =
  PriceReducer.priceAdapter.getSelectors();

export const selectAllPrices = createSelector(
  selectPriceState,
  (state: PriceReducer.PriceState) => selectAll(state)
);
export const selectPriceEntities = createSelector(
  selectPriceState,
  (state: PriceReducer.PriceState) => selectEntities(state)
);
export const selectPriceIds = createSelector(
  selectPriceState,
  (state: PriceReducer.PriceState) => selectIds(state)
);
export const selectPriceTotal = createSelector(
  selectPriceState,
  (state: PriceReducer.PriceState) => selectTotal(state)
);

export const selectSelectedPriceID = createSelector(
  selectPriceState,
  (state: PriceReducer.PriceState) => state.selectedPriceID
);

export const selectPriceByID = (id: string) =>
  createSelector(selectPriceEntities, (entities: Dictionary<ProductPrice>) => {
    return entities[id];
  });
