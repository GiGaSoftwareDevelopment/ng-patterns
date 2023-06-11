import { Update } from '@ngrx/entity/src/models';
import { Subscription } from './subscription.model';
import {
  reducer,
  initialSubscriptionState,
  SubscriptionState
} from './subscription.reducer';
import * as SubscriptionActions from './subscription.actions';

describe('Subscription Reducer', () => {
  it('should ngPatAddStripeSubscription', () => {
    const subscription: Subscription = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscription({ subscription })
    );

    expect(state.entities[subscription.id]).toEqual(subscription);
    expect(state.ids[0]).toEqual(subscription.id);
  });

  it('should ngPatUpsertStripeSubscription', () => {
    const subscription: Subscription = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscription({ subscription })
    );

    // SubscriptionActions.ngPatUpsertStripeSubscription
    //

    const upsert: Subscription = {
      ...subscription,
      aProp: 'baz'
    };

    state = reducer(
      state,
      SubscriptionActions.ngPatUpsertStripeSubscription({
        subscription: upsert
      })
    );

    expect(state.entities[subscription.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(subscription.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripeSubscriptions', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    expect(state.entities[subscription1.id]).toEqual(subscription1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(subscription2);
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(true);
  });

  it('should ngPatUpsertStripeSubscriptions', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    // SubscriptionActions.ngPatUpsertStripeSubscriptions
    //

    const upsert1: Subscription = {
      ...subscription1,
      aProp: 'baz1'
    };

    const upsert2: Subscription = {
      ...subscription2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      SubscriptionActions.ngPatUpsertStripeSubscriptions({
        subscriptions: [upsert1, upsert2]
      })
    );

    expect(state.entities[subscription1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripeSubscription', () => {
    const subscription: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscription({ subscription })
    );

    // ngPatUpdateStripeSubscription
    //
    const update: Subscription = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      SubscriptionActions.ngPatUpdateStripeSubscription({
        subscription: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[subscription.id]).toEqual(update);
  });

  it('should ngPatUpdateStripeSubscriptions', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    // SubscriptionActions.ngPatUpsertStripeSubscriptions
    //

    const update1: Subscription = {
      ...subscription1,
      aProp: 'baz1'
    };

    const update2: Subscription = {
      ...subscription2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<Subscription>[] = [
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
      SubscriptionActions.ngPatUpdateStripeSubscriptions({
        subscriptions: updatesPayload
      })
    );

    expect(state.entities[subscription1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeSubscription', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    expect(state.entities[subscription1.id]).toEqual(subscription1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(subscription2);
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(true);

    state = reducer(
      state,
      SubscriptionActions.ngPatDeleteStripeSubscription({
        id: subscription1.id
      })
    );

    expect(state.entities[subscription1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(false);

    expect(state.entities[subscription2.id]).toEqual(subscription2);
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeSubscriptions', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatAddStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    expect(state.entities[subscription1.id]).toEqual(subscription1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(subscription2);
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(true);

    state = reducer(
      state,
      SubscriptionActions.ngPatDeleteStripeSubscriptions({
        ids: [subscription1.id, subscription2.id]
      })
    );

    expect(state.entities[subscription1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(false);

    expect(state.entities[subscription2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(false);
  });

  it('should ngPatLoadStripeSubscriptions', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatLoadStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    expect(state.entities[subscription1.id]).toEqual(subscription1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(subscription2);
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(true);
  });

  it('should ngPatClearStripeSubscriptions', () => {
    const subscription1: Subscription = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const subscription2: Subscription = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: SubscriptionState = reducer(
      initialSubscriptionState,
      SubscriptionActions.ngPatLoadStripeSubscriptions({
        subscriptions: [subscription1, subscription2]
      })
    );

    expect(state.entities[subscription1.id]).toEqual(subscription1);
    expect((<string[]>state.ids).includes(subscription1.id)).toBe(true);

    expect(state.entities[subscription2.id]).toEqual(subscription2);
    expect((<string[]>state.ids).includes(subscription2.id)).toBe(true);

    // ngPatClearStripeSubscriptions
    //
    state = reducer(state, SubscriptionActions.ngPatClearStripeSubscriptions());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
