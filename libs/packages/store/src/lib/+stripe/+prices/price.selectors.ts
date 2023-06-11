import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PriceReducer from './price.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { ProductPrice } from '../+product';

export const selectNgPatStripePriceState =
  createFeatureSelector<PriceReducer.PriceState>(PriceReducer.priceFeatureKey);

const { selectIds, selectEntities, selectAll, selectTotal } =
  PriceReducer.priceAdapter.getSelectors();

export const selectNgPatAllStripePrices = createSelector(
  selectNgPatStripePriceState,
  (state: PriceReducer.PriceState) => selectAll(state)
);
export const selectNgPatStripePriceEntities = createSelector(
  selectNgPatStripePriceState,
  (state: PriceReducer.PriceState) => selectEntities(state)
);
export const selectNgPatStripePriceIds = createSelector(
  selectNgPatStripePriceState,
  (state: PriceReducer.PriceState) => selectIds(state)
);
export const selectNgPatStripePriceTotal = createSelector(
  selectNgPatStripePriceState,
  (state: PriceReducer.PriceState) => selectTotal(state)
);

export const selectNgPatSelectedStripePriceID = createSelector(
  selectNgPatStripePriceState,
  (state: PriceReducer.PriceState) => state.selectedPriceID
);

export const selectNgPatStripePriceByID = (id: string) =>
  createSelector(
    selectNgPatStripePriceEntities,
    (entities: Dictionary<ProductPrice>) => {
      return entities[id];
    }
  );
