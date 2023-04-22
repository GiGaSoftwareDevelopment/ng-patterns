import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CheckoutSessionService } from './checkout-session.getService';

describe('CheckoutSessionService', () => {
  let getService: CheckoutSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    getService = TestBed.inject(CheckoutSessionService);
  });

  it('should be created', () => {
    expect(getService).toBeTruthy();
  });
});
