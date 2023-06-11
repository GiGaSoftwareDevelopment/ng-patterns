import { NgPatStripeInvoice } from './invoice.model';
import { InvoiceState } from './invoice.reducer';
import * as fromInvoiceReducer from './invoice.reducer';
import * as fromInvoiceSelectors from './invoice.selectors';

describe('NgPatStripeInvoice Selectors', () => {
  let rootState: { [fromInvoiceReducer.invoiceFeatureKey]: InvoiceState };

  const invoice1: NgPatStripeInvoice = {
    id: 'foo1',
    aProp: 'bar1'
  };

  const invoice2: NgPatStripeInvoice = {
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

  it('should selectNgPatAllStripeInvoices', () => {
    expect(
      fromInvoiceSelectors.selectNgPatAllStripeInvoices(rootState).length
    ).toEqual(2);
  });

  it('should selectNgPatStripeInvoiceEntities', () => {
    expect(
      fromInvoiceSelectors.selectNgPatStripeInvoiceEntities(rootState)
    ).toEqual(rootState[fromInvoiceReducer.invoicesFeatureKey].entities);
  });

  it('should selectNgPatInvoiceIds', () => {
    expect(fromInvoiceSelectors.selectNgPatInvoiceIds(rootState)).toEqual(
      rootState[fromInvoiceReducer.invoicesFeatureKey].ids
    );
  });

  it('should selectNgPatStripeInvoiceTotal', () => {
    expect(
      fromInvoiceSelectors.selectNgPatStripeInvoiceTotal(rootState)
    ).toEqual(2);
  });
});
