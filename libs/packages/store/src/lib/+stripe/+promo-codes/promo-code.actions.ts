import {createAction, props} from '@ngrx/store';
import {Update, EntityMap, EntityMapOne} from '@ngrx/entity';

import {PromoCode} from './promo-code.model';

export const addPromoCode = createAction(
  '[PromoCode/API] Add PromoCode',
  props<{promoCode: PromoCode}>()
);

export const setPromoCode = createAction(
  '[PromoCode/API] Set PromoCode',
  props<{promoCode: PromoCode}>()
);

export const upsertPromoCode = createAction(
  '[PromoCode/API] Upsert PromoCode',
  props<{promoCode: PromoCode}>()
);

export const addPromoCodes = createAction(
  '[PromoCode/API] Add PromoCodes',
  props<{promoCodes: PromoCode[]}>()
);

export const upsertPromoCodes = createAction(
  '[PromoCode/API] Upsert PromoCodes',
  props<{promoCodes: PromoCode[]}>()
);

export const updatePromoCode = createAction(
  '[PromoCode/API] Update PromoCode',
  props<{promoCode: Update<PromoCode>}>()
);

export const updatePromoCodes = createAction(
  '[PromoCode/API] Update PromoCodes',
  props<{promoCodes: Update<PromoCode>[]}>()
);

export const mapPromoCode = createAction(
  '[PromoCode/API] Map PromoCode',
  props<{entityMap: EntityMapOne<PromoCode>}>()
);

export const mapPromoCodes = createAction(
  '[PromoCode/API] Map PromoCodes',
  props<{entityMap: EntityMap<PromoCode>}>()
);

export const deletePromoCode = createAction(
  '[PromoCode/API] Delete PromoCode',
  props<{id: string}>()
);

export const deletePromoCodeFromfirestore = createAction(
  '[ePromoCode/API] Delete ePromoCode From Firestore',
  props<{id: string}>()
);

export const deletePromoCodes = createAction(
  '[PromoCode/API] Delete PromoCodes',
  props<{ids: string[]}>()
);

export const loadPromoCodes = createAction(
  '[PromoCode/API] Load PromoCodes',
  props<{promoCodes: PromoCode[]}>()
);

export const setPromoCodes = createAction(
  '[PromoCode/API] Set PromoCodes',
  props<{promoCodes: PromoCode[]}>()
);

export const clearPromoCodes = createAction('[PromoCode/API] Clear PromoCodes');

export const selectPromoCodeID = createAction(
  '[PromoCode/API] Select PromoCode',
  props<{id: string}>()
);

export const updateFirestorePartialPromoCode = createAction(
  '[PromoCode/API] Save Partial PromoCode',
  props<{changes: Partial<PromoCode>; promoCode: PromoCode}>()
);
