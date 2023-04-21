import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NgPatLocalStorageService } from './ng-pat-local-storage.service';

describe('BrowserStorageService', () => {
  let service: NgPatLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NgPatLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
