import { createAction, props } from '@ngrx/store';
import { Update, EntityMap, EntityMapOne } from '@ngrx/entity';
import { ProductPrice } from '../+product';

export const ngPatInitPrice = createAction('[Price/API] Init');

export const ngPatAddPrice = createAction(
  '[Price/API] Add Price',
  props<{ price: ProductPrice }>()
);

export const ngPatSetPrice = createAction(
  '[Price/API] Set Price',
  props<{ price: ProductPrice }>()
);

export const ngPatUpsertPrice = createAction(
  '[Price/API] Upsert Price',
  props<{ price: ProductPrice }>()
);

export const ngPatAddPrices = createAction(
  '[Price/API] Add Prices',
  props<{ prices: ProductPrice[] }>()
);

export const ngPatUpsertPrices = createAction(
  '[Price/API] Upsert Prices',
  props<{ prices: ProductPrice[] }>()
);

export const ngPatUpdatePrice = createAction(
  '[Price/API] Update Price',
  props<{ price: Update<ProductPrice> }>()
);

export const ngPatUpdatePrices = createAction(
  '[Price/API] Update Prices',
  props<{ prices: Update<ProductPrice>[] }>()
);

export const ngPatMapPrice = createAction(
  '[Price/API] Map Price',
  props<{ entityMap: EntityMapOne<ProductPrice> }>()
);

export const ngPatMapPrices = createAction(
  '[Price/API] Map Prices',
  props<{ entityMap: EntityMap<ProductPrice> }>()
);

export const ngPatDeletePrice = createAction(
  '[Price/API] Delete Price',
  props<{ id: string }>()
);

export const ngPatDeletePriceFromfirestore = createAction(
  '[ePrice/API] Delete ePrice From Firestore',
  props<{ id: string }>()
);

export const ngPatDeletePrices = createAction(
  '[Price/API] Delete Prices',
  props<{ ids: string[] }>()
);

export const ngPatLoadPrices = createAction(
  '[Price/API] Load Prices',
  props<{ prices: ProductPrice[] }>()
);

export const ngPatSetPrices = createAction(
  '[Price/API] Set Prices',
  props<{ prices: ProductPrice[] }>()
);

export const ngPatClearPrices = createAction('[Price/API] Clear Prices');

export const ngPatSelectPriceID = createAction(
  '[Price/API] Select Price',
  props<{ id: string }>()
);

export const ngPatUpdateFirestorePartialPrice = createAction(
  '[Price/API] Save Partial Price',
  props<{ changes: Partial<ProductPrice>; price: ProductPrice }>()
);
