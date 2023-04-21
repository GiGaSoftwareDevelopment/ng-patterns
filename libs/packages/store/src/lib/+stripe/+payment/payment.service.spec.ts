import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PaymentService } from './payment.getService';

describe('PaymentService', () => {
  let getService: PaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    getService = TestBed.inject(PaymentService);
  });

  it('should be created', () => {
    expect(getService).toBeTruthy();
  });
});
