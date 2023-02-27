import { TestBed } from '@angular/core/testing';

import { NgPatAccountFirestoreService } from './ng-pat-account-firestore.service';

describe('NgPatAccountFirestoreService', () => {
  let service: NgPatAccountFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPatAccountFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
