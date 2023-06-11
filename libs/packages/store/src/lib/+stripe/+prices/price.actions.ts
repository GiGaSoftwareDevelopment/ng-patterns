import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';
import { NgPatStripeProductPrice } from '../+product';

export const ngPatInitStripePrice = createAction('[Price/API] Init');

export const ngPatAddStripePrice = createAction(
  '[Price/API] Add Price',
  props<{ price: NgPatStripeProductPrice }>()
);

export const ngPatSetStripePrice = createAction(
  '[Price/API] Set Price',
  props<{ price: NgPatStripeProductPrice }>()
);

export const ngPatUpsertStripePrice = createAction(
  '[Price/API] Upsert Price',
  props<{ price: NgPatStripeProductPrice }>()
);

export const ngPatAddStripePrices = createAction(
  '[Price/API] Add Prices',
  props<{ prices: NgPatStripeProductPrice[] }>()
);

export const ngPatUpsertStripePrices = createAction(
  '[Price/API] Upsert Prices',
  props<{ prices: NgPatStripeProductPrice[] }>()
);

export const ngPatUpdateStripePrice = createAction(
  '[Price/API] Update Price',
  props<{ price: Update<NgPatStripeProductPrice> }>()
);

export const ngPatUpdateStripePrices = createAction(
  '[Price/API] Update Prices',
  props<{ prices: Update<NgPatStripeProductPrice>[] }>()
);

export const ngPatMapStripePrice = createAction(
  '[Price/API] Map Price',
  props<{ entityMap: EntityMapOne<NgPatStripeProductPrice> }>()
);

export const ngPatMapStripePrices = createAction(
  '[Price/API] Map Prices',
  props<{ entityMap: EntityMap<NgPatStripeProductPrice> }>()
);

export const ngPatDeleteStripePrice = createAction(
  '[Price/API] Delete Price',
  props<{ id: string }>()
);

export const ngPatDeleteStripePriceFromfirestore = createAction(
  '[ePrice/API] Delete ePrice From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripePrices = createAction(
  '[Price/API] Delete Prices',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripePrices = createAction(
  '[Price/API] Load Prices',
  props<{ prices: NgPatStripeProductPrice[] }>()
);

export const ngPatSetStripePrices = createAction(
  '[Price/API] Set Prices',
  props<{ prices: NgPatStripeProductPrice[] }>()
);

export const ngPatClearStripePrices = createAction('[Price/API] Clear Prices');

export const ngPatSelectStripePriceID = createAction(
  '[Price/API] Select Price',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripePrice = createAction(
  '[Price/API] Save Partial Price',
  props<{ changes: Partial<NgPatStripeProductPrice>; price: NgPatStripeProductPrice }>()
);
