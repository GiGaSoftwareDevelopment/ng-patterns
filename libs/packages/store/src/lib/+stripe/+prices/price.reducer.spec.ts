import { Update } from '@ngrx/entity/src/models';
import { Price } from './price.model';
import { reducer, initialPriceState, PriceState } from './price.reducer';
import * as PriceActions from './price.actions';

describe('Price Reducer', () => {
  it('should ngPatAddPrice', () => {
    const price: Price = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddPrice({ price })
    );

    expect(state.entities[price.id]).toEqual(price);
    expect(state.ids[0]).toEqual(price.id);
  });

  it('should ngPatUpsertPrice', () => {
    const price: Price = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddPrice({ price })
    );

    // PriceActions.ngPatUpsertPrice
    //

    const upsert: Price = {
      ...price,
      aProp: 'baz'
    };

    state = reducer(state, PriceActions.ngPatUpsertPrice({ price: upsert }));

    expect(state.entities[price.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(price.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddPrices', () => {
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
      PriceActions.ngPatAddPrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);
  });

  it('should ngPatUpsertPrices', () => {
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
      PriceActions.ngPatAddPrices({ prices: [price1, price2] })
    );

    // PriceActions.ngPatUpsertPrices
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
      PriceActions.ngPatUpsertPrices({ prices: [upsert1, upsert2] })
    );

    expect(state.entities[price1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdatePrice', () => {
    const price: Price = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: PriceState = reducer(
      initialPriceState,
      PriceActions.ngPatAddPrice({ price })
    );

    // ngPatUpdatePrice
    //
    const update: Price = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      PriceActions.ngPatUpdatePrice({
        price: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[price.id]).toEqual(update);
  });

  it('should ngPatUpdatePrices', () => {
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
      PriceActions.ngPatAddPrices({ prices: [price1, price2] })
    );

    // PriceActions.ngPatUpsertPrices
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
      PriceActions.ngPatUpdatePrices({ prices: updatesPayload })
    );

    expect(state.entities[price1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeletePrice', () => {
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
      PriceActions.ngPatAddPrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);

    state = reducer(state, PriceActions.ngPatDeletePrice({ id: price1.id }));

    expect(state.entities[price1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(price1.id)).toBe(false);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);
  });

  it('should ngPatDeletePrices', () => {
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
      PriceActions.ngPatAddPrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);

    state = reducer(
      state,
      PriceActions.ngPatDeletePrices({ ids: [price1.id, price2.id] })
    );

    expect(state.entities[price1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(price1.id)).toBe(false);

    expect(state.entities[price2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(price2.id)).toBe(false);
  });

  it('should ngPatLoadPrices', () => {
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
      PriceActions.ngPatLoadPrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);
  });

  it('should ngPatClearPrices', () => {
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
      PriceActions.ngPatLoadPrices({ prices: [price1, price2] })
    );

    expect(state.entities[price1.id]).toEqual(price1);
    expect((<string[]>state.ids).includes(price1.id)).toBe(true);

    expect(state.entities[price2.id]).toEqual(price2);
    expect((<string[]>state.ids).includes(price2.id)).toBe(true);

    // ngPatClearPrices
    //
    state = reducer(state, PriceActions.ngPatClearPrices());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
