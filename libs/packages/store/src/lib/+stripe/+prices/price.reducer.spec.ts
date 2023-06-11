import { Update } from '@ngrx/entity/src/models';
import { Price } from './price.model';
import { reducer, initialPriceState, PriceState } from './price.reducer';
import * as PriceActions from './price.actions';

describe('Price Reducer', () => {
  it('should ngPatAddStripePrice', () => {
    const price: Price = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrice({ price })
    );

    expect(state.entities[price.id]).toEqual(price);
    expect(state.ids[0]).toEqual(price.id);
  });

  it('should ngPatUpsertStripePrice', () => {
    const price: Price = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrice({ price })
    );

    // PriceActions.ngPatUpsertStripePrice
    //

    const upsert: Price = {
      ...price,
      aProp: 'baz'
    };

    state = reducer(
      state,
      PriceActions.ngPatUpsertStripePrice({ price: upsert })
    );

    expect(state.entities[price.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(price.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripePrices', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);
  });

  it('should ngPatUpsertStripePrices', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrices({ prices: [price1, price2] })
    );

    // PriceActions.ngPatUpsertStripePrices
    //

    const upsert1: Price = {
      ...price1,
      aProp: 'baz1'
    };

    const upsert2: Price = {
      ...price2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      PriceActions.ngPatUpsertStripePrices({ prices: [upsert1, upsert2] })
    );

    expect(state.entities[price1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripePrice', () => {
    const price: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrice({ price })
    );

    // ngPatUpdateStripePrice
    //
    const update: Price = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      PriceActions.ngPatUpdateStripePrice({
        price: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[price.id]).toEqual(update);
  });

  it('should ngPatUpdateStripePrices', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrices({ prices: [price1, price2] })
    );

    // PriceActions.ngPatUpsertStripePrices
    //

    const update1: Price = {
      ...price1,
      aProp: 'baz1'
    };

    const update2: Price = {
      ...price2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<Price>[] = [
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
      PriceActions.ngPatUpdateStripePrices({ prices: updatesPayload })
    );

    expect(state.entities[price1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripePrice', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);

    state = reducer(
      state,
      PriceActions.ngPatDeleteStripePrice({ id: price1.id })
    );

    expect(state.entities[price1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(price1.id)).toBe(false);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);
  });

  it('should ngPatDeleteStripePrices', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddStripePrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);

    state = reducer(
      state,
      PriceActions.ngPatDeleteStripePrices({ ids: [price1.id, price2.id] })
    );

    expect(state.entities[price1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(price1.id)).toBe(false);

    expect(state.entities[price2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(price2.id)).toBe(false);
  });

  it('should ngPatLoadStripePrices', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatLoadStripePrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);
  });

  it('should ngPatClearStripePrices', () => {
    const price1: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const price2: Price = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatLoadStripePrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);

    // ngPatClearStripePrices
    //
    state = reducer(state, PriceActions.ngPatClearStripePrices());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
