import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AppstoreInAppPurchase } from './appstore-in-app-purchase.model';
import * as AppstoreInAppPurchaseActions from './appstore-in-app-purchase.actions';
import {
  appStoreCheckoutInProgress,
  appStorePurchaseError,
  upsertAppStoreProducts
} from './appstore-in-app-purchase.actions';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { ngPatLogout } from '@ngpat/store';

export const appstoreInAppPurchaseFeatureKey = 'ngPat_in_app_Purchase_app_store';

export interface AppstoreInAppPurchaseState
  extends EntityState<AppstoreInAppPurchase> {
  // additional entities state properties
  selectedAppstoreInAppPurchaseID: string | null;
  products: { [id: string]: IAPProduct };
  checkoutInProgress: boolean;
  purchaseError: any | null;
}

export interface PartialAppstoreInAppPurchaseState {
  readonly [appstoreInAppPurchaseFeatureKey]: AppstoreInAppPurchaseState;
}

export const appstoreInAppPurchaseAdapter: EntityAdapter<AppstoreInAppPurchase> =
  createEntityAdapter<AppstoreInAppPurchase>();

export const initialAppstoreInAppPurchaseState: AppstoreInAppPurchaseState =
  appstoreInAppPurchaseAdapter.getInitialState({
    // additional entity state properties
    selectedAppstoreInAppPurchaseID: null,
    products: {},
    checkoutInProgress: false,
    purchaseError: null
  });

export const reducer = createReducer(
  initialAppstoreInAppPurchaseState,
  on(AppstoreInAppPurchaseActions.addAppstoreInAppPurchase, (state, action) =>
    appstoreInAppPurchaseAdapter.addOne(action.appstoreInAppPurchase, state)
  ),
  on(AppstoreInAppPurchaseActions.setAppstoreInAppPurchase, (state, action) =>
    appstoreInAppPurchaseAdapter.setOne(action.appstoreInAppPurchase, state)
  ),
  on(AppstoreInAppPurchaseActions.addAppstoreInAppPurchases, (state, action) =>
    appstoreInAppPurchaseAdapter.addMany(action.appstoreInAppPurchases, state)
  ),
  on(
    AppstoreInAppPurchaseActions.updateAppstoreInAppPurchase,
    (state, action) =>
      appstoreInAppPurchaseAdapter.updateOne(
        action.appstoreInAppPurchase,
        state
      )
  ),
  on(
    AppstoreInAppPurchaseActions.updateAppstoreInAppPurchases,
    (state, action) =>
      appstoreInAppPurchaseAdapter.updateMany(
        action.appstoreInAppPurchases,
        state
      )
  ),
  on(
    AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchase,
    (state, action) =>
      appstoreInAppPurchaseAdapter.upsertOne(
        action.appstoreInAppPurchase,
        state
      )
  ),
  on(
    AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchases,
    (state, action) =>
      appstoreInAppPurchaseAdapter.upsertMany(
        action.appstoreInAppPurchases,
        state
      )
  ),
  on(
    AppstoreInAppPurchaseActions.mapAppstoreInAppPurchase,
    (state, { entityMap }) => {
      return appstoreInAppPurchaseAdapter.mapOne(entityMap, state);
    }
  ),
  on(
    AppstoreInAppPurchaseActions.mapAppstoreInAppPurchases,
    (state, { entityMap }) => {
      return appstoreInAppPurchaseAdapter.map(entityMap, state);
    }
  ),
  on(
    AppstoreInAppPurchaseActions.deleteAppstoreInAppPurchase,
    (state, action) => appstoreInAppPurchaseAdapter.removeOne(action.id, state)
  ),
  on(
    AppstoreInAppPurchaseActions.deleteAppstoreInAppPurchases,
    (state, action) =>
      appstoreInAppPurchaseAdapter.removeMany(action.ids, state)
  ),
  on(AppstoreInAppPurchaseActions.loadAppstoreInAppPurchases, (state, action) =>
    appstoreInAppPurchaseAdapter.setAll(action.appstoreInAppPurchases, state)
  ),
  on(AppstoreInAppPurchaseActions.setAppstoreInAppPurchases, (state, action) =>
    appstoreInAppPurchaseAdapter.setMany(action.appstoreInAppPurchases, state)
  ),
  on(AppstoreInAppPurchaseActions.clearAppstoreInAppPurchases, state =>
    appstoreInAppPurchaseAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialAppstoreInAppPurchaseState,
    ...appstoreInAppPurchaseAdapter.removeAll(state)
  })),
  on(
    AppstoreInAppPurchaseActions.selectAppstoreInAppPurchaseID,
    (state, action) => {
      return {
        ...state,
        selectedAppstoreInAppPurchaseID: action.id
      };
    }
  ),
  on(upsertAppStoreProducts, (state, action) => {
    // console.log(state);
    // console.log(action);

    const productsDict: { [id: string]: IAPProduct } = action.products.reduce(
      (a: { [id: string]: IAPProduct }, p: IAPProduct) => {
        a[p.id] = p;

        return a;
      },
      {}
    );

    return {
      ...state,
      products: {
        ...state.products,
        ...productsDict
      }
    };
  }),
  on(appStoreCheckoutInProgress, (state, action) => {
    return {
      ...state,
      checkoutInProgress: action.checkoutInProgress
    };
  }),
  on(appStorePurchaseError, (state, action) => {
    return {
      ...state,
      purchaseError: action.purchaseError
    };
  })
);
