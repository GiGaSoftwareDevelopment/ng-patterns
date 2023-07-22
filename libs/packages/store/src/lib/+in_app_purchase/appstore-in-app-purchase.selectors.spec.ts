import {AppstoreInAppPurchase} from './appstore-in-app-purchase.model';
import {AppstoreInAppPurchaseState} from './appstore-in-app-purchase.reducer';
import * as fromAppstoreInAppPurchaseReducer from './appstore-in-app-purchase.reducer';
import * as fromAppstoreInAppPurchaseSelectors from './appstore-in-app-purchase.selectors';

describe('AppstoreInAppPurchase Selectors', () => {
  let rootState: {
    [fromAppstoreInAppPurchaseReducer.appstoreInAppPurchaseFeatureKey]: AppstoreInAppPurchaseState;
  };

  const appstoreInAppPurchase1: AppstoreInAppPurchase = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const appstoreInAppPurchase2: AppstoreInAppPurchase = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromAppstoreInAppPurchaseReducer.appstoreInAppPurchaseFeatureKey]: {
        ids: [appstoreInAppPurchase1.id, appstoreInAppPurchase2.id],
        entities: {
          [appstoreInAppPurchase1.id]: appstoreInAppPurchase1,
          [appstoreInAppPurchase2.id]: appstoreInAppPurchase2
        }
      }
    };
  });

  it('should selectAllAppstoreInAppPurchases', () => {
    expect(
      fromAppstoreInAppPurchaseSelectors.selectAllAppstoreInAppPurchases(
        rootState
      ).length
    ).toEqual(2);
  });

  it('should selectAppstoreInAppPurchaseEntities', () => {
    expect(
      fromAppstoreInAppPurchaseSelectors.selectAppstoreInAppPurchaseEntities(
        rootState
      )
    ).toEqual(
      rootState[
        fromAppstoreInAppPurchaseReducer.appstoreInAppPurchasesFeatureKey
      ].entities
    );
  });

  it('should selectAppstoreInAppPurchaseIds', () => {
    expect(
      fromAppstoreInAppPurchaseSelectors.selectAppstoreInAppPurchaseIds(
        rootState
      )
    ).toEqual(
      rootState[
        fromAppstoreInAppPurchaseReducer.appstoreInAppPurchasesFeatureKey
      ].ids
    );
  });

  it('should selectAppstoreInAppPurchaseTotal', () => {
    expect(
      fromAppstoreInAppPurchaseSelectors.selectAppstoreInAppPurchaseTotal(
        rootState
      )
    ).toEqual(2);
  });
});
