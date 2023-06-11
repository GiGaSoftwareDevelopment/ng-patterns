import { Update } from '@ngrx/entity/src/models';
import { NgPatStripeCheckoutSession } from './checkout-session.model';
import {
  reducer,
  initialCheckoutSessionState,
  CheckoutSessionState
} from './checkout-session.reducer';
import * as CheckoutSessionActions from './checkout-session.actions';

describe('NgPatStripeCheckoutSession Reducer', () => {
  it('should ngPatAddStripeCheckoutSession', () => {
    const checkoutSession: NgPatStripeCheckoutSession = {
      id: 'foo'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSession({ checkoutSession })
    );

    expect(state.entities[checkoutSession.id]).toEqual(checkoutSession);
    expect(state.ids[0]).toEqual(checkoutSession.id);
  });

  it('should ngPatUpsertStripeCheckoutSession', () => {
    const checkoutSession: NgPatStripeCheckoutSession = {
      id: 'foo'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSession({ checkoutSession })
    );

    // CheckoutSessionActions.ngPatUpsertStripeCheckoutSession
    //

    const upsert: NgPatStripeCheckoutSession = {
      ...checkoutSession
    };

    state = reducer(
      state,
      CheckoutSessionActions.ngPatUpsertStripeCheckoutSession({
        checkoutSession: upsert
      })
    );

    expect(state.entities[checkoutSession.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(checkoutSession.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripeCheckoutSessions', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should ngPatUpsertStripeCheckoutSessions', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    // CheckoutSessionActions.ngPatUpsertStripeCheckoutSessions
    //

    const upsert1: NgPatStripeCheckoutSession = {
      ...checkoutSession1
    };

    const upsert2: NgPatStripeCheckoutSession = {
      ...checkoutSession2
    };

    state = reducer(
      state,
      CheckoutSessionActions.ngPatUpsertStripeCheckoutSessions({
        checkoutSessions: [upsert1, upsert2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripeCheckoutSession', () => {
    const checkoutSession: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSession({ checkoutSession })
    );

    // ngPatUpdateStripeCheckoutSession
    //
    const update: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    state = reducer(
      state,
      CheckoutSessionActions.ngPatUpdateStripeCheckoutSession({
        checkoutSession: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[checkoutSession.id]).toEqual(update);
  });

  it('should ngPatUpdateStripeCheckoutSessions', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    // CheckoutSessionActions.ngPatUpsertStripeCheckoutSessions
    //

    const update1: NgPatStripeCheckoutSession = {
      ...checkoutSession1
    };

    const update2: NgPatStripeCheckoutSession = {
      ...checkoutSession2
    };

    const updatesPayload: Update<NgPatStripeCheckoutSession>[] = [
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
      CheckoutSessionActions.ngPatUpdateStripeCheckoutSessions({
        checkoutSessions: updatesPayload
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeCheckoutSession', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    state = reducer(
      state,
      CheckoutSessionActions.ngPatDeleteStripeCheckoutSession({
        id: checkoutSession1.id
      })
    );

    expect(state.entities[checkoutSession1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(false);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeCheckoutSessions', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatAddStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    state = reducer(
      state,
      CheckoutSessionActions.ngPatDeleteStripeCheckoutSessions({
        ids: [checkoutSession1.id, checkoutSession2.id]
      })
    );

    expect(state.entities[checkoutSession1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(false);

    expect(state.entities[checkoutSession2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(false);
  });

  it('should ngPatLoadStripeCheckoutSessions', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    const state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatLoadStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);
  });

  it('should ngPatClearStripeCheckoutSessions', () => {
    const checkoutSession1: NgPatStripeCheckoutSession = {
      id: 'foo1'
    };

    const checkoutSession2: NgPatStripeCheckoutSession = {
      id: 'foo2'
    };

    let state: CheckoutSessionState = reducer(
      initialCheckoutSessionState,
      CheckoutSessionActions.ngPatLoadStripeCheckoutSessions({
        checkoutSessions: [checkoutSession1, checkoutSession2]
      })
    );

    expect(state.entities[checkoutSession1.id]).toEqual(checkoutSession1);
    expect((<string[]>state.ids).includes(checkoutSession1.id)).toBe(true);

    expect(state.entities[checkoutSession2.id]).toEqual(checkoutSession2);
    expect((<string[]>state.ids).includes(checkoutSession2.id)).toBe(true);

    // ngPatClearStripeCheckoutSessions
    //
    state = reducer(state, CheckoutSessionActions.ngPatClearStripeCheckoutSessions());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
