import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { Product } from './product.model';

export const ngPatInitStripeProduct = createAction('[Product/API] Init');

export const ngPatAddStripeProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: Product }>()
);

export const ngPatSetStripeProduct = createAction(
  '[Product/API] Set Product',
  props<{ product: Product }>()
);

export const ngPatUpsertStripeProduct = createAction(
  '[Product/API] Upsert Product',
  props<{ product: Product }>()
);

export const ngPatAddStripeProducts = createAction(
  '[Product/API] Add Products',
  props<{ products: Product[] }>()
);

export const ngPatUpsertStripeProducts = createAction(
  '[Product/API] Upsert Products',
  props<{ products: Product[] }>()
);

export const ngPatUpdateStripeProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<Product> }>()
);

export const ngPatUpdateStripeProducts = createAction(
  '[Product/API] Update Products',
  props<{ products: Update<Product>[] }>()
);

export const ngPatMapStripeProduct = createAction(
  '[Product/API] Map Product',
  props<{ entityMap: EntityMapOne<Product> }>()
);

export const ngPatMapStripeProducts = createAction(
  '[Product/API] Map Products',
  props<{ entityMap: EntityMap<Product> }>()
);

export const ngPatDeleteStripeProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: string }>()
);

export const ngPatDeleteStripeProductFromfirestore = createAction(
  '[eProduct/API] Delete eProduct From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteStripeProducts = createAction(
  '[Product/API] Delete Products',
  props<{ ids: string[] }>()
);

export const ngPatLoadStripeProducts = createAction(
  '[Product/API] Load Products',
  props<{ products: Product[] }>()
);

export const ngPatSetStripeProducts = createAction(
  '[Product/API] Set Products',
  props<{ products: Product[] }>()
);

export const ngPatClearStripeProducts = createAction(
  '[Product/API] Clear Products'
);

export const ngPatSelectStripeProductID = createAction(
  '[Product/API] Select Product',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialStripeProduct = createAction(
  '[Product/API] Save Partial Product',
  props<{ changes: Partial<Product>; product: Product }>()
);
