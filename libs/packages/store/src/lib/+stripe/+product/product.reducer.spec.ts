import { Update } from '@ngrx/entity/src/models';
import { Product } from './product.model';
import { reducer, initialProductState, ProductState } from './product.reducer';
import * as ProductActions from './product.actions';

describe('Product Reducer', () => {
  it('should ngPatAddStripeProduct', () => {
    const product: Product = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProduct({ product })
    );

    expect(state.entities[product.id]).toEqual(product);
    expect(state.ids[0]).toEqual(product.id);
  });

  it('should ngPatUpsertStripeProduct', () => {
    const product: Product = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProduct({ product })
    );

    // ProductActions.ngPatUpsertStripeProduct
    //

    const upsert: Product = {
      ...product,
      aProp: 'baz'
    };

    state = reducer(
      state,
      ProductActions.ngPatUpsertStripeProduct({ product: upsert })
    );

    expect(state.entities[product.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(product.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripeProducts', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);
  });

  it('should ngPatUpsertStripeProducts', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProducts({ products: [product1, product2] })
    );

    // ProductActions.ngPatUpsertStripeProducts
    //

    const upsert1: Product = {
      ...product1,
      aProp: 'baz1'
    };

    const upsert2: Product = {
      ...product2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      ProductActions.ngPatUpsertStripeProducts({ products: [upsert1, upsert2] })
    );

    expect(state.entities[product1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripeProduct', () => {
    const product: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProduct({ product })
    );

    // ngPatUpdateStripeProduct
    //
    const update: Product = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      ProductActions.ngPatUpdateStripeProduct({
        product: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[product.id]).toEqual(update);
  });

  it('should ngPatUpdateStripeProducts', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProducts({ products: [product1, product2] })
    );

    // ProductActions.ngPatUpsertStripeProducts
    //

    const update1: Product = {
      ...product1,
      aProp: 'baz1'
    };

    const update2: Product = {
      ...product2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<Product>[] = [
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
      ProductActions.ngPatUpdateStripeProducts({ products: updatesPayload })
    );

    expect(state.entities[product1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeProduct', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);

    state = reducer(
      state,
      ProductActions.ngPatDeleteStripeProduct({ id: product1.id })
    );

    expect(state.entities[product1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(product1.id)).toBe(false);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeProducts', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddStripeProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);

    state = reducer(
      state,
      ProductActions.ngPatDeleteStripeProducts({
        ids: [product1.id, product2.id]
      })
    );

    expect(state.entities[product1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(product1.id)).toBe(false);

    expect(state.entities[product2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(product2.id)).toBe(false);
  });

  it('should ngPatLoadStripeProducts', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatLoadStripeProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);
  });

  it('should ngPatClearStripeProducts', () => {
    const product1: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const product2: Product = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatLoadStripeProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);

    // ngPatClearStripeProducts
    //
    state = reducer(state, ProductActions.ngPatClearStripeProducts());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
