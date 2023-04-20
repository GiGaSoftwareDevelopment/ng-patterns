import { TestBed } from '@angular/core/testing';

import { StripeFirestorePathsService } from './stripe-firestore-paths.service';

describe('FirestorePathsService', () => {
  let service: StripeFirestorePathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StripeFirestorePathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
