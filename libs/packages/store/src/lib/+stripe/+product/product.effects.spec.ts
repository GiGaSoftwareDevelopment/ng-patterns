import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { ProductEffects } from './product.effects';
import { ProductService } from './product.service';
import { initialProductState } from './product.reducer';
import { selectNgPatStripeAllProducts } from './product.selectors';

jest.mock('./product.service');

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let service: ProductService;

  let storeConfig = {
    initialState: initialProductState,
    selectors: [
      {
        selector: selectNgPatStripeAllProducts,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(ProductEffects);
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
