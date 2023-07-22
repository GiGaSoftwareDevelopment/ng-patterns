import {Update} from '@ngrx/entity/src/models';
import {AppstoreInAppPurchase} from './appstore-in-app-purchase.model';
import {
  reducer,
  initialAppstoreInAppPurchaseState,
  AppstoreInAppPurchaseState
} from './appstore-in-app-purchase.reducer';
import * as AppstoreInAppPurchaseActions from './appstore-in-app-purchase.actions';

describe('AppstoreInAppPurchase Reducer', () => {
  it('should addAppstoreInAppPurchase', () => {
    const appstoreInAppPurchase: AppstoreInAppPurchase = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchase({
        appstoreInAppPurchase
      })
    );

    expect(state.entities[appstoreInAppPurchase.id]).toEqual(
      appstoreInAppPurchase
    );
    expect(state.ids[0]).toEqual(appstoreInAppPurchase.id);
  });

  it('should upsertAppstoreInAppPurchase', () => {
    const appstoreInAppPurchase: AppstoreInAppPurchase = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchase({
        appstoreInAppPurchase
      })
    );

    // AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchase
    //

    const upsert: AppstoreInAppPurchase = {
      ...appstoreInAppPurchase,
      aProp: 'baz'
    };

    state = reducer(
      state,
      AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchase({
        appstoreInAppPurchase: upsert
      })
    );

    expect(state.entities[appstoreInAppPurchase.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(appstoreInAppPurchase.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should addAppstoreInAppPurchases', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(
      appstoreInAppPurchase1
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(
      appstoreInAppPurchase2
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      true
    );
  });

  it('should upsertAppstoreInAppPurchases', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    // AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchases
    //

    const upsert1: AppstoreInAppPurchase = {
      ...appstoreInAppPurchase1,
      aProp: 'baz1'
    };

    const upsert2: AppstoreInAppPurchase = {
      ...appstoreInAppPurchase2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchases({
        appstoreInAppPurchases: [upsert1, upsert2]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should updateAppstoreInAppPurchase', () => {
    const appstoreInAppPurchase: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchase({
        appstoreInAppPurchase
      })
    );

    // updateAppstoreInAppPurchase
    //
    const update: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      AppstoreInAppPurchaseActions.updateAppstoreInAppPurchase({
        appstoreInAppPurchase: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[appstoreInAppPurchase.id]).toEqual(update);
  });

  it('should updateAppstoreInAppPurchases', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    // AppstoreInAppPurchaseActions.upsertAppstoreInAppPurchases
    //

    const update1: AppstoreInAppPurchase = {
      ...appstoreInAppPurchase1,
      aProp: 'baz1'
    };

    const update2: AppstoreInAppPurchase = {
      ...appstoreInAppPurchase2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<AppstoreInAppPurchase>[] = [
      {
        id: update1.id,
        changes: update1
      },
      {
        id: update2.id,
        changes: update2
      }
    ];

    state = reducer(
      state,
      AppstoreInAppPurchaseActions.updateAppstoreInAppPurchases({
        appstoreInAppPurchases: updatesPayload
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should deleteAppstoreInAppPurchase', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(
      appstoreInAppPurchase1
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(
      appstoreInAppPurchase2
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      true
    );

    state = reducer(
      state,
      AppstoreInAppPurchaseActions.deleteAppstoreInAppPurchase({
        id: appstoreInAppPurchase1.id
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      false
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(
      appstoreInAppPurchase2
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      true
    );
  });

  it('should deleteAppstoreInAppPurchases', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.addAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(
      appstoreInAppPurchase1
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(
      appstoreInAppPurchase2
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      true
    );

    state = reducer(
      state,
      AppstoreInAppPurchaseActions.deleteAppstoreInAppPurchases({
        ids: [appstoreInAppPurchase1.id, appstoreInAppPurchase2.id]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      false
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      false
    );
  });

  it('should loadAppstoreInAppPurchases', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.loadAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(
      appstoreInAppPurchase1
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(
      appstoreInAppPurchase2
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      true
    );
  });

  it('should clearAppstoreInAppPurchases', () => {
    const appstoreInAppPurchase1: AppstoreInAppPurchase = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const appstoreInAppPurchase2: AppstoreInAppPurchase = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: AppstoreInAppPurchaseState = reducer(
      initialAppstoreInAppPurchaseState,
      AppstoreInAppPurchaseActions.loadAppstoreInAppPurchases({
        appstoreInAppPurchases: [appstoreInAppPurchase1, appstoreInAppPurchase2]
      })
    );

    expect(state.entities[appstoreInAppPurchase1.id]).toEqual(
      appstoreInAppPurchase1
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase1.id)).toBe(
      true
    );

    expect(state.entities[appstoreInAppPurchase2.id]).toEqual(
      appstoreInAppPurchase2
    );
    expect((<string[]>state.ids).includes(appstoreInAppPurchase2.id)).toBe(
      true
    );

    // clearAppstoreInAppPurchases
    //
    state = reducer(
      state,
      AppstoreInAppPurchaseActions.clearAppstoreInAppPurchases()
    );

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
