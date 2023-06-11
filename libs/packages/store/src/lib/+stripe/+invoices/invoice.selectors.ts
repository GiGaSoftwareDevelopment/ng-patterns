import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as InvoiceReducer from './invoice.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { Coupon, Invoice } from './invoice.model';

export const selectNgPatStripeInvoiceState =
  createFeatureSelector<InvoiceReducer.InvoiceState>(
    InvoiceReducer.invoiceFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  InvoiceReducer.invoiceAdapter.getSelectors();

export const selectNgPatAllStripeInvoices = createSelector(
  selectNgPatStripeInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectAll(state)
);
export const selectNgPatStripeInvoiceEntities = createSelector(
  selectNgPatStripeInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectEntities(state)
);
export const selectNgPatInvoiceIds = createSelector(
  selectNgPatStripeInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectIds(state)
);
export const selectNgPatStripeInvoiceTotal = createSelector(
  selectNgPatStripeInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectTotal(state)
);

export const selectNgPatStripeInvoiceID = createSelector(
  selectNgPatStripeInvoiceState,
  (state: InvoiceReducer.InvoiceState) => state.selectedInvoiceID
);

export const selectNgPatStripeGetInvoiceByID = (id: string) =>
  createSelector(
    selectNgPatStripeInvoiceEntities,
    (entities: Dictionary<Invoice>) => {
      return entities[id];
    }
  );
