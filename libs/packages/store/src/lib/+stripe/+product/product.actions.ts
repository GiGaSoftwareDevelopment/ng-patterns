import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { Product } from './product.model';

export const ngPatInitProduct = createAction('[Product/API] Init');

export const ngPatAddProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: Product }>()
);

export const ngPatSetProduct = createAction(
  '[Product/API] Set Product',
  props<{ product: Product }>()
);

export const ngPatUpsertProduct = createAction(
  '[Product/API] Upsert Product',
  props<{ product: Product }>()
);

export const ngPatAddProducts = createAction(
  '[Product/API] Add Products',
  props<{ products: Product[] }>()
);

export const ngPatUpsertProducts = createAction(
  '[Product/API] Upsert Products',
  props<{ products: Product[] }>()
);

export const ngPatUpdateProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<Product> }>()
);

export const ngPatUpdateProducts = createAction(
  '[Product/API] Update Products',
  props<{ products: Update<Product>[] }>()
);

export const ngPatMapProduct = createAction(
  '[Product/API] Map Product',
  props<{ entityMap: EntityMapOne<Product> }>()
);

export const ngPatMapProducts = createAction(
  '[Product/API] Map Products',
  props<{ entityMap: EntityMap<Product> }>()
);

export const ngPatDeleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: string }>()
);

export const ngPatDeleteProductFromfirestore = createAction(
  '[eProduct/API] Delete eProduct From Firestore',
  props<{ id: string }>()
);

export const ngPatDeleteProducts = createAction(
  '[Product/API] Delete Products',
  props<{ ids: string[] }>()
);

export const ngPatLoadProducts = createAction(
  '[Product/API] Load Products',
  props<{ products: Product[] }>()
);

export const ngPatSetProducts = createAction(
  '[Product/API] Set Products',
  props<{ products: Product[] }>()
);

export const ngPatClearProducts = createAction('[Product/API] Clear Products');

export const ngPatSelectProductID = createAction(
  '[Product/API] Select Product',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialProduct = createAction(
  '[Product/API] Save Partial Product',
  props<{ changes: Partial<Product>; product: Product }>()
);
