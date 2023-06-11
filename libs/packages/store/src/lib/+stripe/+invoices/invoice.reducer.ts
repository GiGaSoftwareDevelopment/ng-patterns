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
  on(InvoiceActions.ngPatAddStripeInvoice, (state, action) =>
    invoiceAdapter.addOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatSetStripeInvoice, (state, action) =>
    invoiceAdapter.setOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatAddStripeInvoices, (state, action) =>
    invoiceAdapter.addMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatUpdateStripeInvoice, (state, action) =>
    invoiceAdapter.updateOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatUpdateStripeInvoices, (state, action) =>
    invoiceAdapter.updateMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatUpsertStripeInvoice, (state, action) =>
    invoiceAdapter.upsertOne(action.invoice, state)
  ),
  on(InvoiceActions.ngPatUpsertStripeInvoices, (state, action) =>
    invoiceAdapter.upsertMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatMapStripeInvoice, (state, { entityMap }) => {
    return invoiceAdapter.mapOne(entityMap, state);
  }),
  on(InvoiceActions.ngPatMapStripeInvoices, (state, { entityMap }) => {
    return invoiceAdapter.map(entityMap, state);
  }),
  on(InvoiceActions.ngPatDeleteStripeInvoice, (state, action) =>
    invoiceAdapter.removeOne(action.id, state)
  ),
  on(InvoiceActions.ngPatDeleteStripeInvoices, (state, action) =>
    invoiceAdapter.removeMany(action.ids, state)
  ),
  on(InvoiceActions.ngPatLoadStripeInvoices, (state, action) =>
    invoiceAdapter.setAll(action.invoices, state)
  ),
  on(InvoiceActions.setStripeInvoices, (state, action) =>
    invoiceAdapter.setMany(action.invoices, state)
  ),
  on(InvoiceActions.ngPatClearStripeInvoices, state =>
    invoiceAdapter.removeAll(state)
  ),
  on(ngPatLogout, state => ({
    ...initialInvoiceState,
    ...invoiceAdapter.removeAll(state)
  })),
  on(InvoiceActions.ngPatSelectStripeInvoiceID, (state, action) => {
    return {
      ...state,
      selectedInvoiceID: action.id
    };
  })
);
