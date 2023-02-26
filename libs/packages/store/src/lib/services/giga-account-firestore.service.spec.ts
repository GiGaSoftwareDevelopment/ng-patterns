import { TestBed } from '@angular/core/testing';

import { GigaAccountFirestoreService } from './giga-account-firestore.service';

describe('GigaAccountFirestoreService', () => {
  let service: GigaAccountFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigaAccountFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
