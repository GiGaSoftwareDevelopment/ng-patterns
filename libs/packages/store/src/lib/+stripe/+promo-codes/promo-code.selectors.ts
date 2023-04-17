import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PromoCodeReducer from './promo-code.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { PromoCode } from './promo-code.model';

export const selectPromoCodeState =
  createFeatureSelector<PromoCodeReducer.PromoCodeState>(
    PromoCodeReducer.promoCodeFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  PromoCodeReducer.promoCodeAdapter.getSelectors();

export const selectAllPromoCodes = createSelector(
  selectPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectAll(state)
);
export const selectPromoCodeEntities = createSelector(
  selectPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectEntities(state)
);
export const selectPromoCodeIds = createSelector(
  selectPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectIds(state)
);
export const selectPromoCodeTotal = createSelector(
  selectPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectTotal(state)
);

export const selectSelectedPromoCodeID = createSelector(
  selectPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => state.selectedPromoCodeID
);

export const selectPromoCodeByID = (id: string) =>
  createSelector(selectPromoCodeEntities, (entities: Dictionary<PromoCode>) => {
    return entities[id];
  });
