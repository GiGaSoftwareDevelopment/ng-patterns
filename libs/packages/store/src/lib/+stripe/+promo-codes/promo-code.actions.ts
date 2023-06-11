import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { PromoCode } from './promo-code.model';

export const ngPatAddPromoCode = createAction(
  '[PromoCode/API] Add PromoCode',
  props<{ promoCode: PromoCode }>()
);

export const ngPatSetPromoCode = createAction(
  '[PromoCode/API] Set PromoCode',
  props<{ promoCode: PromoCode }>()
);

export const ngPatUpsertPromoCode = createAction(
  '[PromoCode/API] Upsert PromoCode',
  props<{ promoCode: PromoCode }>()
);

export const ngPatAddPromoCodes = createAction(
  '[PromoCode/API] Add PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatUpsertPromoCodes = createAction(
  '[PromoCode/API] Upsert PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatUpdatePromoCode = createAction(
  '[PromoCode/API] Update PromoCode',
  props<{ promoCode: Update<PromoCode> }>()
);

export const ngPatUpdatePromoCodes = createAction(
  '[PromoCode/API] Update PromoCodes',
  props<{ promoCodes: Update<PromoCode>[] }>()
);

export const ngPatMapPromoCode = createAction(
  '[PromoCode/API] Map PromoCode',
  props<{ entityMap: EntityMapOne<PromoCode> }>()
);

export const ngPatMapPromoCodes = createAction(
  '[PromoCode/API] Map PromoCodes',
  props<{ entityMap: EntityMap<PromoCode> }>()
);

export const ngPatDeletePromoCode = createAction(
  '[PromoCode/API] Delete PromoCode',
  props<{ id: string }>()
);

export const ngPatDeletePromoCodeFromfirestore = createAction(
  '[ePromoCode/API] Delete ePromoCode From Firestore',
  props<{ id: string }>()
);

export const ngPatDeletePromoCodes = createAction(
  '[PromoCode/API] Delete PromoCodes',
  props<{ ids: string[] }>()
);

export const ngPatLoadPromoCodes = createAction(
  '[PromoCode/API] Load PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatSetPromoCodes = createAction(
  '[PromoCode/API] Set PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatClearPromoCodes = createAction(
  '[PromoCode/API] Clear PromoCodes'
);

export const ngPatSelectPromoCodeID = createAction(
  '[PromoCode/API] Select PromoCode',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialPromoCode = createAction(
  '[PromoCode/API] Save Partial PromoCode',
  props<{ changes: Partial<PromoCode>; promoCode: PromoCode }>()
);
