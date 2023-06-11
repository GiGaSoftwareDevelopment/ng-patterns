import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as PromoCodeReducer from './promo-code.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { NgPatStripePromoCode } from './promo-code.model';

export const selectNgPatStripePromoCodeState =
  createFeatureSelector<PromoCodeReducer.PromoCodeState>(
    PromoCodeReducer.promoCodeFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  PromoCodeReducer.promoCodeAdapter.getSelectors();

export const selectNgPatStripeAllPromoCodes = createSelector(
  selectNgPatStripePromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectAll(state)
);
export const selectNgPatStripePromoCodeEntities = createSelector(
  selectNgPatStripePromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectEntities(state)
);
export const selectNgPatStripePromoCodeIds = createSelector(
  selectNgPatStripePromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectIds(state)
);
export const selectNgPatStripePromoCodeTotal = createSelector(
  selectNgPatStripePromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => selectTotal(state)
);

export const selectNgPatStripeSelectedPromoCodeID = createSelector(
  selectNgPatStripePromoCodeState,
  (state: PromoCodeReducer.PromoCodeState) => state.selectedPromoCodeID
);

export const selectNgPatStripePromoCodeByID = (id: string) =>
  createSelector(
    selectNgPatStripePromoCodeEntities,
    (entities: Dictionary<NgPatStripePromoCode>) => {
      return entities[id];
    }
  );
