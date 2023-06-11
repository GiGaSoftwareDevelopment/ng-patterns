import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { NgPatStripeProduct } from './product.model';

export const ngPatInitStripeProduct = createAction('[NgPatStripeProduct/API] Init');

export const ngPatAddStripeProduct = createAction(
  '[NgPatStripeProduct/API] Add NgPatStripeProduct',
  props<{ product: NgPatStripeProduct }>()
);

export const ngPatSetStripeProduct = createAction(
  '[NgPatStripeProduct/API] Set NgPatStripeProduct',
  props<{ product: NgPatStripeProduct }>()
);

export const ngPatUpsertStripeProduct = createAction(
  '[NgPatStripeProduct/API] Upsert NgPatStripeProduct',
  props<{ product: NgPatStripeProduct }>()
);

export const ngPatAddStripeProducts = createAction(
  '[NgPatStripeProduct/API] Add Products',
  props<{ products: NgPatStripeProduct[] }>()
);

export const ngPatUpsertStripeProducts = createAction(
  '[NgPatStripeProduct/API] Upsert Products',
  props<{ products: NgPatStripeProduct[] }>()
);

export const ngPatUpdateStripeProduct = createAction(
  '[NgPatStripeProduct/API] Update NgPatStripeProduct',
  props<{ product: Update<NgPatStripeProduct> }>()
);

export const ngPatUpdateStripeProducts = createAction(
  '[NgPatStripeProduct/API] Update Products',
  props<{ products: Update<NgPatStripeProduct>[] }>()
);

export const ngPatMapStripeProduct = createAction(
  '[NgPatStripeProduct/API] Map NgPatStripeProduct',
  props<{ entityMap: EntityMapOne<NgPatStripeProduct> }>()
);

export const ngPatMapStripeProducts = createAction(
  '[NgPatStripeProduct/API] Map Products',
  props<{ entityMap: EntityMap<NgPatStripeProduct> }>()
);

export const ngPatDeleteStripeProduct = createAction(
  '[NgPatStripeProduct/API] Delete NgPatStripeProduct',
  props<{ id: string }>()
);

export const ngPatDeleteStripeProductFromfirestore = createAction(
  '[eProduct/API] Delete eProduct From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripeProducts = createAction(
  '[NgPatStripeProduct/API] Delete Products',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripeProducts = createAction(
  '[NgPatStripeProduct/API] Load Products',
  props<{ products: NgPatStripeProduct[] }>()
);

export const ngPatSetStripeProducts = createAction(
  '[NgPatStripeProduct/API] Set Products',
  props<{ products: NgPatStripeProduct[] }>()
);

export const ngPatClearStripeProducts = createAction(
  '[NgPatStripeProduct/API] Clear Products'
);

export const ngPatSelectStripeProductID = createAction(
  '[NgPatStripeProduct/API] Select NgPatStripeProduct',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripeProduct = createAction(
  '[NgPatStripeProduct/API] Save Partial NgPatStripeProduct',
  props<{ changes: Partial<NgPatStripeProduct>; product: NgPatStripeProduct }>()
);
