import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';

import {PromoCodeEffects} from './promo-code.effects';
import {PromoCodeService} from './promo-code.service';
import {initialPromoCodeState} from './promo-code.reducer';
import {selectAllPromoCodes} from './promo-code.selectors';

jest.mock('./promo-code.service');

describe('PromoCodeEffects', () => {
  let actions$: Observable<any>;
  let effects: PromoCodeEffects;
  let service: PromoCodeService;

  let storeConfig = {
    initialState: initialPromoCodeState,
    selectors: [
      {
        selector: selectAllPromoCodes,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PromoCodeEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(PromoCodeEffects);
    service = TestBed.inject(PromoCodeService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
