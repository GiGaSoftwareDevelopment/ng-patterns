import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {PromoCodeService} from './promo-code.service';

describe('PromoCodeService', () => {
  let service: PromoCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PromoCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
