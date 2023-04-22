import { Update } from '@ngrx/entity/src/models';
import { CheckoutSession } from './checkout-session.model';
import {
  reducer,
  initialCheckoutSessionState,
  CheckoutSessionState
} from './checkout-session.reducer';
import * as CheckoutSessionActions from './checkout-session.actions';

describe('CheckoutSession Reducer', () => {
  it('should addCheckoutSession', () => {
    const checkoutSession: CheckoutSession = {
      id: 'foo'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSession({ checkoutSession })
    );

    expect(state.entities[checkoutSession.id]).toEqual(checkoutSession);
    expect(state.ids[0]).toEqual(checkoutSession.id);
  });

  it('should upsertCheckoutSession', () => {
    const checkoutSession: CheckoutSession = {
      id: 'foo'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSession({ checkoutSession })
    );

    // CheckoutSessionActions.upsertCheckoutSession
    //

    const upsert: CheckoutSession = {
      ...checkoutSession
    };

    state = reducer(
      state,
      CheckoutSessionActions.upsertCheckoutSession({ checkoutSession: upsert })
    );

    expect(state.entities[checkoutSession.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(checkoutSession.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should addCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should upsertCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    // CheckoutSessionActions.upsertCheckoutSessions
    //

    const upsert1: CheckoutSession = {
      ...checkoutSession1
    };

    const upsert2: CheckoutSession = {
      ...checkoutSession2
    };

    state = reducer(
      state,
      CheckoutSessionActions.upsertCheckoutSessions({
        checkoutSessions: [upsert1, upsert2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should updateCheckoutSession', () => {
    const checkoutSession: CheckoutSession = {
      id: 'foo1'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSession({ checkoutSession })
    );

    // updateCheckoutSession
    //
    const update: CheckoutSession = {
      id: 'foo1'
    };

    state = reducer(
      state,
      CheckoutSessionActions.updateCheckoutSession({
        checkoutSession: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[checkoutSession.id]).toEqual(update);
  });

  it('should updateCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    // CheckoutSessionActions.upsertCheckoutSessions
    //

    const update1: CheckoutSession = {
      ...checkoutSession1
    };

    const update2: CheckoutSession = {
      ...checkoutSession2
    };

    const updatesPayload: Update<CheckoutSession>[] = [
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
      CheckoutSessionActions.updateCheckoutSessions({
        checkoutSessions: updatesPayload
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should deleteCheckoutSession', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    state = reducer(
      state,
      CheckoutSessionActions.deleteCheckoutSession({ id: checkoutSession1.id })
    );

    expect(state.entities[checkoutSession1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(false);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should deleteCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.addCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    state = reducer(
      state,
      CheckoutSessionActions.deleteCheckoutSessions({
        ids: [checkoutSession1.id, checkoutSession2.id]
      })
    );

    expect(state.entities[checkoutSession1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(false);

    expect(state.entities[checkoutSession2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(false);
  });

  it('should loadCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.loadCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should clearCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.loadCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    // clearCheckoutSessions
    //
    state = reducer(state, CheckoutSessionActions.clearCheckoutSessions());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
