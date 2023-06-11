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
  on(InvoiceActions.ngPatAddInvoice, (state, action) =>
    invoiceAdapter.addOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatSetInvoice, (state, action) =>
    invoiceAdapter.setOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatAddInvoices, (state, action) =>
    invoiceAdapter.addMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatUpdateInvoice, (state, action) =>
    invoiceAdapter.updateOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatUpdateInvoices, (state, action) =>
    invoiceAdapter.updateMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatUpsertInvoice, (state, action) =>
    invoiceAdapter.upsertOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatUpsertInvoices, (state, action) =>
    invoiceAdapter.upsertMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatMapInvoice, (state, { entityMap }) => {
    return invoiceAdapter.mapOne(entityMap, state);
  }),
  on(InvoiceActions.ngPatMapInvoices, (state, { entityMap }) => {
    return invoiceAdapter.map(entityMap, state);
  }),
  on(InvoiceActions.ngPatDeleteInvoice, (state, action) =>
    invoiceAdapter.removeOne(action.id, state)
  ),
  on(InvoiceActions.ngPatDeleteInvoices, (state, action) =>
    invoiceAdapter.removeMany(action.ids, state)
  ),
  on(InvoiceActions.ngPatLoadInvoices, (state, action) =>
    invoiceAdapter.setAll(action.invoices, state)
  ),
  on(InvoiceActions.setInvoices, (state, action) =>
    invoiceAdapter.setMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatClearInvoices, state =>
    invoiceAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialInvoiceState,
    ...invoiceAdapter.removeAll(state)
  })),
  on(InvoiceActions.ngPatSelectInvoiceID, (state, action) => {
    return {
      ...state,
      selectedInvoiceID: action.id
    };
  })
);
