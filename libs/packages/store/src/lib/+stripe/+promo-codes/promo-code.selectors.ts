import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PromoCodeReducer from './promo-code.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { PromoCode } from './promo-code.model';

export const selectNgPatPromoCodeState =
  createFeatureSelector<PromoCodeReducer.PromoCodeState>(
    PromoCodeReducer.promoCodeFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  PromoCodeReducer.promoCodeAdapter.getSelectors();

export const selectNgPatAllPromoCodes = createSelector(
  selectNgPatPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectAll(state)
);
export const selectNgPatPromoCodeEntities = createSelector(
  selectNgPatPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectEntities(state)
);
export const selectNgPatPromoCodeIds = createSelector(
  selectNgPatPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectIds(state)
);
export const selectNgPatPromoCodeTotal = createSelector(
  selectNgPatPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectTotal(state)
);

export const selectNgPatSelectedPromoCodeID = createSelector(
  selectNgPatPromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => state.selectedPromoCodeID
);

export const selectNgPatPromoCodeByID = (id: string) =>
  createSelector(
    selectNgPatPromoCodeEntities,
    (entities: Dictionary<PromoCode>) => {
      return entities[id];
    }
  );
