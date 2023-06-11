import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { PromoCode } from './promo-code.model';

export const ngPatAddStripePromoCode = createAction(
  '[PromoCode/API] Add PromoCode',
  props<{ promoCode: PromoCode }>()
);

export const ngPatSetStripePromoCode = createAction(
  '[PromoCode/API] Set PromoCode',
  props<{ promoCode: PromoCode }>()
);

export const ngPatUpsertStripePromoCode = createAction(
  '[PromoCode/API] Upsert PromoCode',
  props<{ promoCode: PromoCode }>()
);

export const ngPatAddStripePromoCodes = createAction(
  '[PromoCode/API] Add PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatUpsertStripePromoCodes = createAction(
  '[PromoCode/API] Upsert PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatUpdateStripePromoCode = createAction(
  '[PromoCode/API] Update PromoCode',
  props<{ promoCode: Update<PromoCode> }>()
);

export const ngPatUpdateStripePromoCodes = createAction(
  '[PromoCode/API] Update PromoCodes',
  props<{ promoCodes: Update<PromoCode>[] }>()
);

export const ngPatMapStripePromoCode = createAction(
  '[PromoCode/API] Map PromoCode',
  props<{ entityMap: EntityMapOne<PromoCode> }>()
);

export const ngPatMapStripePromoCodes = createAction(
  '[PromoCode/API] Map PromoCodes',
  props<{ entityMap: EntityMap<PromoCode> }>()
);

export const ngPatDeleteStripePromoCode = createAction(
  '[PromoCode/API] Delete PromoCode',
  props<{ id: string }>()
);

export const ngPatDeleteStripePromoCodeFromfirestore = createAction(
  '[ePromoCode/API] Delete ePromoCode From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripePromoCodes = createAction(
  '[PromoCode/API] Delete PromoCodes',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripePromoCodes = createAction(
  '[PromoCode/API] Load PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatSetStripePromoCodes = createAction(
  '[PromoCode/API] Set PromoCodes',
  props<{ promoCodes: PromoCode[] }>()
);

export const ngPatClearStripePromoCodes = createAction(
  '[PromoCode/API] Clear PromoCodes'
);

export const ngPatSelectStripePromoCodeID = createAction(
  '[PromoCode/API] Select PromoCode',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripePromoCode = createAction(
  '[PromoCode/API] Save Partial PromoCode',
  props<{ changes: Partial<PromoCode>; promoCode: PromoCode }>()
);
