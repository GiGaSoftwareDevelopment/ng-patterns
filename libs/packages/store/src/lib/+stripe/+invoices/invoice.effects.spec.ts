import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';

import {InvoiceEffects} from './invoice.effects';
import {InvoiceService} from './invoice.service';
import {initialInvoiceState} from './invoice.reducer';
import {selectAllInvoices} from './invoice.selectors';

jest.mock('./invoice.service');

describe('InvoiceEffects', () => {
  let actions$: Observable<any>;
  let effects: InvoiceEffects;
  let service: InvoiceService;

  let storeConfig = {
    initialState: initialInvoiceState,
    selectors: [
      {
        selector: selectAllInvoices,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InvoiceEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(InvoiceEffects);
    service = TestBed.inject(InvoiceService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
