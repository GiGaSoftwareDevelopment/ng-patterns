import { Update } from '@ngrx/entity/src/models';
import { Invoice } from './invoice.model';
import { reducer, initialInvoiceState, InvoiceState } from './invoice.reducer';
import * as InvoiceActions from './invoice.actions';

describe('Invoice Reducer', () => {
  it('should ngPatAddInvoice', () => {
    const invoice: Invoice = {
      id: 'foo',
      aProp: 'bar'
    };

    const state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddInvoice({ invoice })
    );

    expect(state.entities[invoice.id]).toEqual(invoice);
    expect(state.ids[0]).toEqual(invoice.id);
  });

  it('should ngPatUpsertInvoice', () => {
    const invoice: Invoice = {
      id: 'foo',
      aProp: 'bar'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddInvoice({ invoice })
    );

    // InvoiceActions.ngPatUpsertInvoice
    //

    const upsert: Invoice = {
      ...invoice,
      aProp: 'baz'
    };

    state = reducer(
      state,
      InvoiceActions.ngPatUpsertInvoice({ invoice: upsert })
    );

    expect(state.entities[invoice.id]).toEqual(upsert);
    expect(state.ids[0]).toEqual(invoice.id);
    expect(state.ids.length).toEqual(1);
  });

  it('should ngPatAddInvoices', () => {
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
      InvoiceActions.ngPatAddInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);
  });

  it('should ngPatUpsertInvoices', () => {
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
      InvoiceActions.ngPatAddInvoices({ invoices: [invoice1, invoice2] })
    );

    // InvoiceActions.ngPatUpsertInvoices
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
      InvoiceActions.ngPatUpsertInvoices({ invoices: [upsert1, upsert2] })
    );

    expect(state.entities[invoice1.id]).toEqual(upsert1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(upsert2);
    expect((<string[]>state.ids).includes(upsert2.id)).toBe(true);
  });

  it('should ngPatUpdateInvoice', () => {
    const invoice: Invoice = {
      id: 'foo1',
      aProp: 'bar1'
    };

    let state: InvoiceState = reducer(
      initialInvoiceState,
      InvoiceActions.ngPatAddInvoice({ invoice })
    );

    // ngPatUpdateInvoice
    //
    const update: Invoice = {
      id: 'foo1',
      aProp: 'baz1'
    };

    state = reducer(
      state,
      InvoiceActions.ngPatUpdateInvoice({
        invoice: {
          id: update.id,
          changes: update
        }
      })
    );

    expect(state.entities[invoice.id]).toEqual(update);
  });

  it('should ngPatUpdateInvoices', () => {
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
      InvoiceActions.ngPatAddInvoices({ invoices: [invoice1, invoice2] })
    );

    // InvoiceActions.ngPatUpsertInvoices
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
      InvoiceActions.ngPatUpdateInvoices({ invoices: updatesPayload })
    );

    expect(state.entities[invoice1.id]).toEqual(update1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(update2);
    expect((<string[]>state.ids).includes(update2.id)).toBe(true);
  });

  it('should ngPatDeleteInvoice', () => {
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
      InvoiceActions.ngPatAddInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);

    state = reducer(
      state,
      InvoiceActions.ngPatDeleteInvoice({ id: invoice1.id })
    );

    expect(state.entities[invoice1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(false);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);
  });

  it('should ngPatDeleteInvoices', () => {
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
      InvoiceActions.ngPatAddInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);

    state = reducer(
      state,
      InvoiceActions.ngPatDeleteInvoices({ ids: [invoice1.id, invoice2.id] })
    );

    expect(state.entities[invoice1.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(false);

    expect(state.entities[invoice2.id]).toBeUndefined();
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(false);
  });

  it('should ngPatLoadInvoices', () => {
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
      InvoiceActions.ngPatLoadInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);
  });

  it('should ngPatClearInvoices', () => {
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
      InvoiceActions.ngPatLoadInvoices({ invoices: [invoice1, invoice2] })
    );

    expect(state.entities[invoice1.id]).toEqual(invoice1);
    expect((<string[]>state.ids).includes(invoice1.id)).toBe(true);

    expect(state.entities[invoice2.id]).toEqual(invoice2);
    expect((<string[]>state.ids).includes(invoice2.id)).toBe(true);

    // ngPatClearInvoices
    //
    state = reducer(state, InvoiceActions.ngPatClearInvoices());

    expect((<string[]>state.ids).length).toEqual(0);
    expect(Object.keys(state.entities).length).toEqual(0);
  });
});
