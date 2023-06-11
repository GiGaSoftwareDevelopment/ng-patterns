import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { PriceEffects } from './price.effects';
import { PriceService } from './price.service';
import { initialPriceState } from './price.reducer';
import { selectNgPatAllStripePrices } from './price.selectors';

jest.mock('./price.service');

describe('PriceEffects', () => {
  let actions$: Observable<any>;
  let effects: PriceEffects;
  let service: PriceService;

  let storeConfig = {
    initialState: initialPriceState,
    selectors: [
      {
        selector: selectNgPatAllStripePrices,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PriceEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(PriceEffects);
    service = TestBed.inject(PriceService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
