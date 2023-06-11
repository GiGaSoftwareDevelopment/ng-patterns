import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { PromoCode } from './promo-code.model';
import * as PromoCodeActions from './promo-code.actions';
import { ngPatLogout } from '../../+account/account.actions';

export const promoCodeFeatureKey = 'stripe_promoCode';

export interface PromoCodeState extends EntityState<PromoCode> {
  // additional entities state properties
  selectedPromoCodeID: string | null;
}

export const promoCodeAdapter: EntityAdapter<PromoCode> =
  createEntityAdapter<PromoCode>();

export const initialPromoCodeState: PromoCodeState =
  promoCodeAdapter.getInitialState({
    // additional entity state properties
    selectedPromoCodeID: null
  });

export const reducer = createReducer(
  initialPromoCodeState,
  on(PromoCodeActions.ngPatAddPromoCode, (state, action) =>
    promoCodeAdapter.addOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatSetPromoCode, (state, action) =>
    promoCodeAdapter.setOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatAddPromoCodes, (state, action) =>
    promoCodeAdapter.addMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatUpdatePromoCode, (state, action) =>
    promoCodeAdapter.updateOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatUpdatePromoCodes, (state, action) =>
    promoCodeAdapter.updateMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatUpsertPromoCode, (state, action) =>
    promoCodeAdapter.upsertOne(action.promoCode, state)
  ),
  on(PromoCodeActions.ngPatUpsertPromoCodes, (state, action) =>
    promoCodeAdapter.upsertMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatMapPromoCode, (state, { entityMap }) => {
    return promoCodeAdapter.mapOne(entityMap, state);
  }),
  on(PromoCodeActions.ngPatMapPromoCodes, (state, { entityMap }) => {
    return promoCodeAdapter.map(entityMap, state);
  }),
  on(PromoCodeActions.ngPatDeletePromoCode, (state, action) =>
    promoCodeAdapter.removeOne(action.id, state)
  ),
  on(PromoCodeActions.ngPatDeletePromoCodes, (state, action) =>
    promoCodeAdapter.removeMany(action.ids, state)
  ),
  on(PromoCodeActions.ngPatLoadPromoCodes, (state, action) =>
    promoCodeAdapter.setAll(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatSetPromoCodes, (state, action) =>
    promoCodeAdapter.setMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.ngPatClearPromoCodes, state =>
    promoCodeAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialPromoCodeState,
    ...promoCodeAdapter.removeAll(state)
  })),
  on(
    PromoCodeActions.ngPatSelectPromoCodeID,
    (state, action): PromoCodeState => {
      return {
        ...state,
        selectedPromoCodeID: action.id
      };
    }
  )
);
