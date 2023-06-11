import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as InvoiceReducer from './invoice.reducer';
import { Dictionary } from '@ngrx/entity/src/models';
import { Coupon, Invoice } from './invoice.model';

export const selectNgPatInvoiceState =
  createFeatureSelector<InvoiceReducer.InvoiceState>(
    InvoiceReducer.invoiceFeatureKey
  );

const { selectIds, selectEntities, selectAll, selectTotal } =
  InvoiceReducer.invoiceAdapter.getSelectors();

export const selectNgPatAllInvoices = createSelector(
  selectNgPatInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectAll(state)
);
export const selectNgPatInvoiceEntities = createSelector(
  selectNgPatInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectEntities(state)
);
export const selectNgPatInvoiceIds = createSelector(
  selectNgPatInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectIds(state)
);
export const selectNgPatInvoiceTotal = createSelector(
  selectNgPatInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectTotal(state)
);

export const selectNgPatInvoiceID = createSelector(
  selectNgPatInvoiceState,
  (state: InvoiceReducer.InvoiceState) => state.selectedInvoiceID
);

export const selectNgPatGetInvoiceByID = (id: string) =>
  createSelector(
    selectNgPatInvoiceEntities,
    (entities: Dictionary<Invoice>) => {
      return entities[id];
    }
  );
