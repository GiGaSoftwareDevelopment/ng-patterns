import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PriceReducer from './price.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { ProductPrice } from '../+product';

export const selectNgPatPriceState =
  createFeatureSelector<PriceReducer.PriceState>(PriceReducer.priceFeatureKey);

const { selectIds, selectEntities, selectAll, selectTotal } =
  PriceReducer.priceAdapter.getSelectors();

export const selectNgPatAllPrices = createSelector(
  selectNgPatPriceState,
  (state: PriceReducer.PriceState) => selectAll(state)
);
export const selectNgPatPriceEntities = createSelector(
  selectNgPatPriceState,
  (state: PriceReducer.PriceState) => selectEntities(state)
);
export const selectNgPatPriceIds = createSelector(
  selectNgPatPriceState,
  (state: PriceReducer.PriceState) => selectIds(state)
);
export const selectNgPatPriceTotal = createSelector(
  selectNgPatPriceState,
  (state: PriceReducer.PriceState) => selectTotal(state)
);

export const selectNgPatSelectedPriceID = createSelector(
  selectNgPatPriceState,
  (state: PriceReducer.PriceState) => state.selectedPriceID
);

export const selectNgPatPriceByID = (id: string) =>
  createSelector(
    selectNgPatPriceEntities,
    (entities: Dictionary<ProductPrice>) => {
      return entities[id];
    }
  );
