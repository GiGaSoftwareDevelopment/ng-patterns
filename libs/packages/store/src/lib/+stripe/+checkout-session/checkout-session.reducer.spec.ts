import { Update } from '@ngrx/entity/src/models';
import { CheckoutSession } from './checkout-session.model';
import {
  reducer,
  initialCheckoutSessionState,
  CheckoutSessionState
} from './checkout-session.reducer';
import * as CheckoutSessionActions from './checkout-session.actions';

describe('CheckoutSession Reducer', () => {
  it('should ngPatAddCheckoutSession', () => {
    const checkoutSession: CheckoutSession = {
      id: 'foo'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSession({ checkoutSession })
    );

    expect(state.entities[checkoutSession.id]).toEqual(checkoutSession);
    expect(state.ids[0]).toEqual(checkoutSession.id);
  });

  it('should ngPatUpsertCheckoutSession', () => {
    const checkoutSession: CheckoutSession = {
      id: 'foo'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSession({ checkoutSession })
    );

    // CheckoutSessionActions.ngPatUpsertCheckoutSession
    //

    const upsert: CheckoutSession = {
      ...checkoutSession
    };

    state = reducer(
      state,
      CheckoutSessionActions.ngPatUpsertCheckoutSession({
        checkoutSession: upsert
      })
    );

    expect(state.entities[checkoutSession.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(checkoutSession.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should ngPatUpsertCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    // CheckoutSessionActions.ngPatUpsertCheckoutSessions
    //

    const upsert1: CheckoutSession = {
      ...checkoutSession1
    };

    const upsert2: CheckoutSession = {
      ...checkoutSession2
    };

    state = reducer(
      state,
      CheckoutSessionActions.ngPatUpsertCheckoutSessions({
        checkoutSessions: [upsert1, upsert2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateCheckoutSession', () => {
    const checkoutSession: CheckoutSession = {
      id: 'foo1'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSession({ checkoutSession })
    );

    // ngPatUpdateCheckoutSession
    //
    const update: CheckoutSession = {
      id: 'foo1'
    };

    state = reducer(
      state,
      CheckoutSessionActions.ngPatUpdateCheckoutSession({
        checkoutSession: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[checkoutSession.id]).toEqual(update);
  });

  it('should ngPatUpdateCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    // CheckoutSessionActions.ngPatUpsertCheckoutSessions
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
      CheckoutSessionActions.ngPatUpdateCheckoutSessions({
        checkoutSessions: updatesPayload
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteCheckoutSession', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    state = reducer(
      state,
      CheckoutSessionActions.ngPatDeleteCheckoutSession({
        id: checkoutSession1.id
      })
    );

    expect(state.entities[checkoutSession1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(false);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should ngPatDeleteCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    state = reducer(
      state,
      CheckoutSessionActions.ngPatDeleteCheckoutSessions({
        ids: [checkoutSession1.id, checkoutSession2.id]
      })
    );

    expect(state.entities[checkoutSession1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(false);

    expect(state.entities[checkoutSession2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(false);
  });

  it('should ngPatLoadCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatLoadCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should ngPatClearCheckoutSessions', () => {
    const checkoutSession1: CheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: CheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatLoadCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    // ngPatClearCheckoutSessions
    //
    state = reducer(state, CheckoutSessionActions.ngPatClearCheckoutSessions());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
