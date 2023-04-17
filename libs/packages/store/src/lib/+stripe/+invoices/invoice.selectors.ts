import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as InvoiceReducer from './invoice.reducer';
import {Dictionary} from '@ngrx/entity/src/models';
import {Coupon, Invoice} from './invoice.model';

export const selectInvoiceState =
  createFeatureSelector<InvoiceReducer.InvoiceState>(
    InvoiceReducer.invoiceFeatureKey
  );

const {selectIds, selectEntities, selectAll, selectTotal} =
  InvoiceReducer.invoiceAdapter.getSelectors();

export const selectAllInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectAll(state)
);
export const selectInvoiceEntities = createSelector(
  selectInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectEntities(state)
);
export const selectInvoiceIds = createSelector(
  selectInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectIds(state)
);
export const selectInvoiceTotal = createSelector(
  selectInvoiceState,
  (state: InvoiceReducer.InvoiceState) => selectTotal(state)
);

export const selectedInvoiceID = createSelector(
  selectInvoiceState,
  (state: InvoiceReducer.InvoiceState) => state.selectedInvoiceID
);

export const getInvoiceByID = (id: string) =>
  createSelector(selectInvoiceEntities, (entities: Dictionary<Invoice>) => {
    return entities[id];
  });
