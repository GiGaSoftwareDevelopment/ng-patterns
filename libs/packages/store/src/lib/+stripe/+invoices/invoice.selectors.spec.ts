import {Invoice} from './invoice.model';
import {InvoiceState} from './invoice.reducer';
import * as fromInvoiceReducer from './invoice.reducer';
import * as fromInvoiceSelectors from './invoice.selectors';

describe('Invoice Selectors', () => {
  let rootState: {[fromInvoiceReducer.invoiceFeatureKey]: InvoiceState};

  const invoice1: Invoice = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const invoice2: Invoice = {
    id: 'foo2',
    aProp: 'bar2'
  };

  beforeEach(() => {
    rootState = {
      [fromInvoiceReducer.invoiceFeatureKey]: {
        ids: [invoice1.id, invoice2.id],
        entities: {
          [invoice1.id]: invoice1,
          [invoice2.id]: invoice2
        }
      }
    };
  });

  it('should selectAllInvoices', () => {
    expect(fromInvoiceSelectors.selectAllInvoices(rootState).length).toEqual(2);
  });

  it('should selectInvoiceEntities', () => {
    expect(fromInvoiceSelectors.selectInvoiceEntities(rootState)).toEqual(
      rootState[fromInvoiceReducer.invoicesFeatureKey].entities
    );
  });

  it('should selectInvoiceIds', () => {
    expect(fromInvoiceSelectors.selectInvoiceIds(rootState)).toEqual(
      rootState[fromInvoiceReducer.invoicesFeatureKey].ids
    );
  });

  it('should selectInvoiceTotal', () => {
    expect(fromInvoiceSelectors.selectInvoiceTotal(rootState)).toEqual(2);
  });
});
