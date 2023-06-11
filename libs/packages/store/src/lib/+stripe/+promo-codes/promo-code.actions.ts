import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { NgPatStripePromoCode } from './promo-code.model';

export const ngPatAddStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Add NgPatStripePromoCode',
  props<{ promoCode: NgPatStripePromoCode }>()
);

export const ngPatSetStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Set NgPatStripePromoCode',
  props<{ promoCode: NgPatStripePromoCode }>()
);

export const ngPatUpsertStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Upsert NgPatStripePromoCode',
  props<{ promoCode: NgPatStripePromoCode }>()
);

export const ngPatAddStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Add PromoCodes',
  props<{ promoCodes: NgPatStripePromoCode[] }>()
);

export const ngPatUpsertStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Upsert PromoCodes',
  props<{ promoCodes: NgPatStripePromoCode[] }>()
);

export const ngPatUpdateStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Update NgPatStripePromoCode',
  props<{ promoCode: Update<NgPatStripePromoCode> }>()
);

export const ngPatUpdateStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Update PromoCodes',
  props<{ promoCodes: Update<NgPatStripePromoCode>[] }>()
);

export const ngPatMapStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Map NgPatStripePromoCode',
  props<{ entityMap: EntityMapOne<NgPatStripePromoCode> }>()
);

export const ngPatMapStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Map PromoCodes',
  props<{ entityMap: EntityMap<NgPatStripePromoCode> }>()
);

export const ngPatDeleteStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Delete NgPatStripePromoCode',
  props<{ id: string }>()
);

export const ngPatDeleteStripePromoCodeFromfirestore = createAction(
  '[ePromoCode/API] Delete ePromoCode From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Delete PromoCodes',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Load PromoCodes',
  props<{ promoCodes: NgPatStripePromoCode[] }>()
);

export const ngPatSetStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Set PromoCodes',
  props<{ promoCodes: NgPatStripePromoCode[] }>()
);

export const ngPatClearStripePromoCodes = createAction(
  '[NgPatStripePromoCode/API] Clear PromoCodes'
);

export const ngPatSelectStripePromoCodeID = createAction(
  '[NgPatStripePromoCode/API] Select NgPatStripePromoCode',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripePromoCode = createAction(
  '[NgPatStripePromoCode/API] Save Partial NgPatStripePromoCode',
  props<{ changes: Partial<NgPatStripePromoCode>; promoCode: NgPatStripePromoCode }>()
);
