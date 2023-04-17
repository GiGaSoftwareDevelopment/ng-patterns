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
  on(PromoCodeActions.addPromoCode, (state, action) =>
    promoCodeAdapter.addOne(action.promoCode, state)
  ),
  on(PromoCodeActions.setPromoCode, (state, action) =>
    promoCodeAdapter.setOne(action.promoCode, state)
  ),
  on(PromoCodeActions.addPromoCodes, (state, action) =>
    promoCodeAdapter.addMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.updatePromoCode, (state, action) =>
    promoCodeAdapter.updateOne(action.promoCode, state)
  ),
  on(PromoCodeActions.updatePromoCodes, (state, action) =>
    promoCodeAdapter.updateMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.upsertPromoCode, (state, action) =>
    promoCodeAdapter.upsertOne(action.promoCode, state)
  ),
  on(PromoCodeActions.upsertPromoCodes, (state, action) =>
    promoCodeAdapter.upsertMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.mapPromoCode, (state, { entityMap }) => {
    return promoCodeAdapter.mapOne(entityMap, state);
  }),
  on(PromoCodeActions.mapPromoCodes, (state, { entityMap }) => {
    return promoCodeAdapter.map(entityMap, state);
  }),
  on(PromoCodeActions.deletePromoCode, (state, action) =>
    promoCodeAdapter.removeOne(action.id, state)
  ),
  on(PromoCodeActions.deletePromoCodes, (state, action) =>
    promoCodeAdapter.removeMany(action.ids, state)
  ),
  on(PromoCodeActions.loadPromoCodes, (state, action) =>
    promoCodeAdapter.setAll(action.promoCodes, state)
  ),
  on(PromoCodeActions.setPromoCodes, (state, action) =>
    promoCodeAdapter.setMany(action.promoCodes, state)
  ),
  on(PromoCodeActions.clearPromoCodes, state =>
    promoCodeAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialPromoCodeState,
    ...promoCodeAdapter.removeAll(state)
  })),
  on(PromoCodeActions.selectPromoCodeID, (state, action): PromoCodeState => {
    return {
      ...state,
      selectedPromoCodeID: action.id
    };
  })
);
