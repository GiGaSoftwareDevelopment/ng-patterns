import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';

import { Product } from './product.model';

export const initProduct = createAction('[Product/API] Init');

export const addProduct = createAction(
  '[Product/API] Add Product',
  props<{ product: Product }>()
);

export const setProduct = createAction(
  '[Product/API] Set Product',
  props<{ product: Product }>()
);

export const upsertProduct = createAction(
  '[Product/API] Upsert Product',
  props<{ product: Product }>()
);

export const addProducts = createAction(
  '[Product/API] Add Products',
  props<{ products: Product[] }>()
);

export const upsertProducts = createAction(
  '[Product/API] Upsert Products',
  props<{ products: Product[] }>()
);

export const updateProduct = createAction(
  '[Product/API] Update Product',
  props<{ product: Update<Product> }>()
);

export const updateProducts = createAction(
  '[Product/API] Update Products',
  props<{ products: Update<Product>[] }>()
);

export const mapProduct = createAction(
  '[Product/API] Map Product',
  props<{ entityMap: EntityMapOne<Product> }>()
);

export const mapProducts = createAction(
  '[Product/API] Map Products',
  props<{ entityMap: EntityMap<Product> }>()
);

export const deleteProduct = createAction(
  '[Product/API] Delete Product',
  props<{ id: string }>()
);

export const deleteProductFromfirestore = createAction(
  '[eProduct/API] Delete eProduct From Firestore',
  props<{ id: string }>()
);

export const deleteProducts = createAction(
  '[Product/API] Delete Products',
  props<{ ids: string[] }>()
);

export const loadProducts = createAction(
  '[Product/API] Load Products',
  props<{ products: Product[] }>()
);

export const setProducts = createAction(
  '[Product/API] Set Products',
  props<{ products: Product[] }>()
);

export const clearProducts = createAction('[Product/API] Clear Products');

export const selectProductID = createAction(
  '[Product/API] Select Product',
  props<{ id: string }>()
);

export const updateFirestorePartialProduct = createAction(
  '[Product/API] Save Partial Product',
  props<{ changes: Partial<Product>; product: Product }>()
);
