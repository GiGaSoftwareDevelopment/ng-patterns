import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Invoice } from './invoice.model';
import * as InvoiceActions from './invoice.actions';
import { ngPatLogout } from '../../+account/account.actions';

export const invoiceFeatureKey = 'stripe_invoices';

export interface InvoiceState extends EntityState<Invoice> {
  // additional entities state properties
  selectedInvoiceID: string | null;
}

export interface PartialInvoiceState {
  readonly [invoiceFeatureKey]: InvoiceState;
}

export const invoiceAdapter: EntityAdapter<Invoice> =
  createEntityAdapter<Invoice>();

export const initialInvoiceState: InvoiceState = invoiceAdapter.getInitialState(
  {
    // additional entity state properties
    selectedInvoiceID: null
  }
);

export const reducer = createReducer(
  initialInvoiceState,
  on(InvoiceActions.addInvoice, (state, action) =>
    invoiceAdapter.addOne(action.invoice, state)
  ),
  on(InvoiceActions.setInvoice, (state, action) =>
    invoiceAdapter.setOne(action.invoice, state)
  ),
  on(InvoiceActions.addInvoices, (state, action) =>
    invoiceAdapter.addMany(action.invoices, state)
  ),
  on(InvoiceActions.updateInvoice, (state, action) =>
    invoiceAdapter.updateOne(action.invoice, state)
  ),
  on(InvoiceActions.updateInvoices, (state, action) =>
    invoiceAdapter.updateMany(action.invoices, state)
  ),
  on(InvoiceActions.upsertInvoice, (state, action) =>
    invoiceAdapter.upsertOne(action.invoice, state)
  ),
  on(InvoiceActions.upsertInvoices, (state, action) =>
    invoiceAdapter.upsertMany(action.invoices, state)
  ),
  on(InvoiceActions.mapInvoice, (state, { entityMap }) => {
    return invoiceAdapter.mapOne(entityMap, state);
  }),
  on(InvoiceActions.mapInvoices, (state, { entityMap }) => {
    return invoiceAdapter.map(entityMap, state);
  }),
  on(InvoiceActions.deleteInvoice, (state, action) =>
    invoiceAdapter.removeOne(action.id, state)
  ),
  on(InvoiceActions.deleteInvoices, (state, action) =>
    invoiceAdapter.removeMany(action.ids, state)
  ),
  on(InvoiceActions.loadInvoices, (state, action) =>
    invoiceAdapter.setAll(action.invoices, state)
  ),
  on(InvoiceActions.setInvoices, (state, action) =>
    invoiceAdapter.setMany(action.invoices, state)
  ),
  on(InvoiceActions.clearInvoices, state => invoiceAdapter.removeAll(state)),
  on(ngPatLogout, state => ({
    ...initialInvoiceState,
    ...invoiceAdapter.removeAll(state)
  })),
  on(InvoiceActions.selectInvoiceID, (state, action) => {
    return {
      ...state,
      selectedInvoiceID: action.id
    };
  })
);
