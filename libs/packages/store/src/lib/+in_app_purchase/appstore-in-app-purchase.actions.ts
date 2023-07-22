import { createAction, props } from '@ngrx/store';
import { EntityMap, EntityMapOne, Update } from '@ngrx/entity';

import { AppstoreInAppPurchase } from './appstore-in-app-purchase.model';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';

export const addAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Add AppstoreInAppPurchase',
  props<{ appstoreInAppPurchase: AppstoreInAppPurchase }>()
);

export const setAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Set AppstoreInAppPurchase',
  props<{ appstoreInAppPurchase: AppstoreInAppPurchase }>()
);

export const upsertAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Upsert AppstoreInAppPurchase',
  props<{ appstoreInAppPurchase: AppstoreInAppPurchase }>()
);

export const addAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Add AppstoreInAppPurchases',
  props<{ appstoreInAppPurchases: AppstoreInAppPurchase[] }>()
);

export const upsertAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Upsert AppstoreInAppPurchases',
  props<{ appstoreInAppPurchases: AppstoreInAppPurchase[] }>()
);

export const updateAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Update AppstoreInAppPurchase',
  props<{ appstoreInAppPurchase: Update<AppstoreInAppPurchase> }>()
);

export const updateAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Update AppstoreInAppPurchases',
  props<{ appstoreInAppPurchases: Update<AppstoreInAppPurchase>[] }>()
);

export const mapAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Map AppstoreInAppPurchase',
  props<{ entityMap: EntityMapOne<AppstoreInAppPurchase> }>()
);

export const mapAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Map AppstoreInAppPurchases',
  props<{ entityMap: EntityMap<AppstoreInAppPurchase> }>()
);

export const deleteAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Delete AppstoreInAppPurchase',
  props<{ id: string }>()
);

export const deleteAppstoreInAppPurchaseFromfirestore = createAction(
  '[eAppstoreInAppPurchase/API] Delete eAppstoreInAppPurchase From Firestore',
  props<{ id: string }>()
);

export const deleteAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Delete AppstoreInAppPurchases',
  props<{ ids: string[] }>()
);

export const loadAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Load AppstoreInAppPurchases',
  props<{ appstoreInAppPurchases: AppstoreInAppPurchase[] }>()
);

export const setAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Set AppstoreInAppPurchases',
  props<{ appstoreInAppPurchases: AppstoreInAppPurchase[] }>()
);

export const clearAppstoreInAppPurchases = createAction(
  '[AppstoreInAppPurchase/API] Clear AppstoreInAppPurchases'
);

export const appstoreInAppPurchaseID = createAction(
  '[AppstoreInAppPurchase/API] Select AppstoreInAppPurchase',
  props<{ id: string }>()
);

export const updateFirestorePartialAppstoreInAppPurchase = createAction(
  '[AppstoreInAppPurchase/API] Save Partial AppstoreInAppPurchase',
  props<{
    changes: Partial<AppstoreInAppPurchase>;
    appstoreInAppPurchase: AppstoreInAppPurchase;
  }>()
);

export const upsertAppStoreProducts = createAction(
  '[AppstoreInAppPurchase/API] Add App Store Product',
  props<{ products: IAPProduct[] }>()
);

export const appStoreCheckoutInProgress = createAction(
  '[AppstoreInAppPurchase/API] Checkout In Progress',
  props<{ checkoutInProgress: boolean }>()
);

export const appStorePurchaseError = createAction(
  '[AppstoreInAppPurchase/API] Purchase Error',
  props<{ purchaseError: any | null }>()
);
