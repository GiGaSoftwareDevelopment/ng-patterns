import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';
import { ProductPrice } from '../+product';

export const initPrice = createAction('[Price/API] Init');

export const addPrice = createAction(
  '[Price/API] Add Price',
  props<{ price: ProductPrice }>()
);

export const setPrice = createAction(
  '[Price/API] Set Price',
  props<{ price: ProductPrice }>()
);

export const upsertPrice = createAction(
  '[Price/API] Upsert Price',
  props<{ price: ProductPrice }>()
);

export const addPrices = createAction(
  '[Price/API] Add Prices',
  props<{ prices: ProductPrice[] }>()
);

export const upsertPrices = createAction(
  '[Price/API] Upsert Prices',
  props<{ prices: ProductPrice[] }>()
);

export const updatePrice = createAction(
  '[Price/API] Update Price',
  props<{ price: Update<ProductPrice> }>()
);

export const updatePrices = createAction(
  '[Price/API] Update Prices',
  props<{ prices: Update<ProductPrice>[] }>()
);

export const mapPrice = createAction(
  '[Price/API] Map Price',
  props<{ entityMap: EntityMapOne<ProductPrice> }>()
);

export const mapPrices = createAction(
  '[Price/API] Map Prices',
  props<{ entityMap: EntityMap<ProductPrice> }>()
);

export const deletePrice = createAction(
  '[Price/API] Delete Price',
  props<{ id: string }>()
);

export const deletePriceFromfirestore = createAction(
  '[ePrice/API] Delete ePrice From Firestore',
  props<{ id: string }>()
);

export const deletePrices = createAction(
  '[Price/API] Delete Prices',
  props<{ ids: string[] }>()
);

export const loadPrices = createAction(
  '[Price/API] Load Prices',
  props<{ prices: ProductPrice[] }>()
);

export const setPrices = createAction(
  '[Price/API] Set Prices',
  props<{ prices: ProductPrice[] }>()
);

export const clearPrices = createAction('[Price/API] Clear Prices');

export const selectPriceID = createAction(
  '[Price/API] Select Price',
  props<{ id: string }>()
);

export const updateFirestorePartialPrice = createAction(
  '[Price/API] Save Partial Price',
  props<{ changes: Partial<ProductPrice>; price: ProductPrice }>()
);
