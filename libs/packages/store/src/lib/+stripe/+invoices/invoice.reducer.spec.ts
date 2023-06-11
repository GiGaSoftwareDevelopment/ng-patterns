import { Update } from '@ngrx/entity/src/models';
import { Invoice } from './invoice.model';
import { reducer, initialInvoiceState, InvoiceState } from './invoice.reducer';
import * as InvoiceActions from './invoice.actions';

describe('Invoice Reducer', () => {
  it('should ngPatAddStripeInvoice', () => {
    const invoice: Invoice = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoice({ invoice })
    );

    expect(state.entities[invoice.id]).toEqual(invoice);
    expect(state.ids[0]).toEqual(invoice.id);
  });

  it('should ngPatUpsertStripeInvoice', () => {
    const invoice: Invoice = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoice({ invoice })
    );

    // InvoiceActions.ngPatUpsertStripeInvoice
    //

    const upsert: Invoice = {
      ...invoice,
      aProp: 'baz'
    };

    state = reducer(
      state,
      InvoiceActions.ngPatUpsertStripeInvoice({ invoice: upsert })
    );

    expect(state.entities[invoice.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(invoice.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddStripeInvoices', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);
  });

  it('should ngPatUpsertStripeInvoices', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    // InvoiceActions.ngPatUpsertStripeInvoices
    //

    const upsert1: Invoice = {
      ...invoice1,
      aProp: 'baz1'
    };

    const upsert2: Invoice = {
      ...invoice2,
      aProp: 'baz2'
    };

    state = reducer(
      state,
      InvoiceActions.ngPatUpsertStripeInvoices({ invoices: [upsert1, upsert2] })
    );

    expect(state.entities[invoice1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateStripeInvoice', () => {
    const invoice: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoice({ invoice })
    );

    // ngPatUpdateStripeInvoice
    //
    const update: Invoice = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      InvoiceActions.ngPatUpdateStripeInvoice({
        invoice: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[invoice.id]).toEqual(update);
  });

  it('should ngPatUpdateStripeInvoices', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    // InvoiceActions.ngPatUpsertStripeInvoices
    //

    const update1: Invoice = {
      ...invoice1,
      aProp: 'baz1'
    };

    const update2: Invoice = {
      ...invoice2,
      aProp: 'baz2'
    };

    const updatesPayload: Update<Invoice>[] = [
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
      InvoiceActions.ngPatUpdateStripeInvoices({ invoices: updatesPayload })
    );

    expect(state.entities[invoice1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeInvoice', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);

    state = reducer(
      state,
      InvoiceActions.ngPatDeleteStripeInvoice({ id: invoice1.id })
    );

    expect(state.entities[invoice1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(false);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);
  });

  it('should ngPatDeleteStripeInvoices', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);

    state = reducer(
      state,
      InvoiceActions.ngPatDeleteStripeInvoices({
        ids: [invoice1.id, invoice2.id]
      })
    );

    expect(state.entities[invoice1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(false);

    expect(state.entities[invoice2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(false);
  });

  it('should ngPatLoadStripeInvoices', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    const state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatLoadStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);
  });

  it('should ngPatClearStripeInvoices', () => {
    const invoice1: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    const invoice2: Invoice = {
      id: 'foo2',
      aProp: 'bar2'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatLoadStripeInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);

    // ngPatClearStripeInvoices
    //
    state = reducer(state, InvoiceActions.ngPatClearStripeInvoices());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
