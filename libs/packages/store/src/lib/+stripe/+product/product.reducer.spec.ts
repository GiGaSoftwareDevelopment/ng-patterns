import { Update } from '@ngrx/entity/src/models';
import { Product } from './product.model';
import { reducer, initialProductState, ProductState } from './product.reducer';
import * as ProductActions from './product.actions';

describe('Product Reducer', () => {
  it('should ngPatAddProduct', () => {
    const product: Product = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddProduct({ product })
    );

    expect(state.entities[product.id]).toEqual(product);
    expect(state.ids[0]).toEqual(product.id);
  });

  it('should ngPatUpsertProduct', () => {
    const product: Product = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddProduct({ product })
    );

    // ProductActions.ngPatUpsertProduct
    //

    const upsert: Product = {
      ...product,
      aProp: 'baz'
    };

    state = reducer(
      state,
      ProductActions.ngPatUpsertProduct({ product: upsert })
    );

    expect(state.entities[product.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(product.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddProducts', () => {
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
      ProductActions.ngPatAddProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);
  });

  it('should ngPatUpsertProducts', () => {
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
      ProductActions.ngPatAddProducts({ products: [product1, product2] })
    );

    // ProductActions.ngPatUpsertProducts
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
      ProductActions.ngPatUpsertProducts({ products: [upsert1, upsert2] })
    );

    expect(state.entities[product1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateProduct', () => {
    const product: Product = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: ProductState = reducer(
      initialProductState,
      ProductActions.ngPatAddProduct({ product })
    );

    // ngPatUpdateProduct
    //
    const update: Product = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      ProductActions.ngPatUpdateProduct({
        product: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[product.id]).toEqual(update);
  });

  it('should ngPatUpdateProducts', () => {
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
      ProductActions.ngPatAddProducts({ products: [product1, product2] })
    );

    // ProductActions.ngPatUpsertProducts
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
      ProductActions.ngPatUpdateProducts({ products: updatesPayload })
    );

    expect(state.entities[product1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteProduct', () => {
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
      ProductActions.ngPatAddProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);

    state = reducer(
      state,
      ProductActions.ngPatDeleteProduct({ id: product1.id })
    );

    expect(state.entities[product1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(product1.id)).toBe(false);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);
  });

  it('should ngPatDeleteProducts', () => {
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
      ProductActions.ngPatAddProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);

    state = reducer(
      state,
      ProductActions.ngPatDeleteProducts({ ids: [product1.id, product2.id] })
    );

    expect(state.entities[product1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(product1.id)).toBe(false);

    expect(state.entities[product2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(product2.id)).toBe(false);
  });

  it('should ngPatLoadProducts', () => {
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
      ProductActions.ngPatLoadProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);
  });

  it('should ngPatClearProducts', () => {
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
      ProductActions.ngPatLoadProducts({ products: [product1, product2] })
    );

    expect(state.entities[product1.id]).toEqual(product1);
    expect((<string[]>state.ids).includes(product1.id)).toBe(true);

    expect(state.entities[product2.id]).toEqual(product2);
    expect((<string[]>state.ids).includes(product2.id)).toBe(true);

    // ngPatClearProducts
    //
    state = reducer(state, ProductActions.ngPatClearProducts());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
