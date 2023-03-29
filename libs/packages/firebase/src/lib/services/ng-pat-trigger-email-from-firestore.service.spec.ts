import { TestBed } from '@angular/core/testing';

import { NgPatTriggerEmailFromFirestoreService } from './ng-pat-trigger-email-from-firestore.service';

describe('TriggerEmailFromFirestoreService', () => {
  let service: NgPatTriggerEmailFromFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPatTriggerEmailFromFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
