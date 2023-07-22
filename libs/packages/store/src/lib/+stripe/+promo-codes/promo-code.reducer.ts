import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { NgPatStripePromoCode } from './promo-code.model';
import * as PromoCodeActions from './promo-code.actions';
import { ngPatLogout } from '../../+account/account.actions';

export const promoCodeFeatureKey = 'ngPat_stripe_promoCode';

export interface PromoCodeState extends EntityState<NgPatStripePromoCode> {
  // additional entities state properties
  selectedPromoCodeID: string | null;
}

export const promoCodeAdapter: EntityAdapter<NgPatStripePromoCode> =
  createEntityAdapter<NgPatStripePromoCode>();

export const initialPromoCodeState: PromoCodeState =
  promoCodeAdapter.getInitialState({
    // additional entity state properties
    selectedPromoCodeID: null
  });

export const reducer = createReducer(
  initialPromoCodeState,
  on(PromoCodeActions.ngPatAddStripePromoCode, (state, action) =>
    promoCodeAdapter.addOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatSetStripePromoCode, (state, action) =>
    promoCodeAdapter.setOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatAddStripePromoCodes, (state, action) =>
    promoCodeAdapter.addMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatUpdateStripePromoCode, (state, action) =>
    promoCodeAdapter.updateOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatUpdateStripePromoCodes, (state, action) =>
    promoCodeAdapter.updateMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatUpsertStripePromoCode, (state, action) =>
    promoCodeAdapter.upsertOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatUpsertStripePromoCodes, (state, action) =>
    promoCodeAdapter.upsertMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatMapStripePromoCode, (state, { entityMap }) => {
    return promoCodeAdapter.mapOne(entityMap, state);
  }),
  on(PromoCodeActions.ngPatMapStripePromoCodes, (state, { entityMap }) => {
    return promoCodeAdapter.map(entityMap, state);
  }),
  on(PromoCodeActions.ngPatDeleteStripePromoCode, (state, action) =>
    promoCodeAdapter.removeOne(action.id, state)
  ),
  on(PromoCodeActions.ngPatDeleteStripePromoCodes, (state, action) =>
    promoCodeAdapter.removeMany(action.ids, state)
  ),
  on(PromoCodeActions.ngPatLoadStripePromoCodes, (state, action) =>
    promoCodeAdapter.setAll(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatSetStripePromoCodes, (state, action) =>
    promoCodeAdapter.setMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatClearStripePromoCodes, state =>
    promoCodeAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialPromoCodeState,
    ...promoCodeAdapter.removeAll(state)
  })),
  on(
    PromoCodeActions.ngPatSelectStripePromoCodeID,
    (state, action): PromoCodeState => {
      return {
        ...state,
        selectedPromoCodeID: action.id
      };
    }
  )
);
