import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';

import {NgPatBrowserStorageService} from './ng-pat-browser-storage.service';

describe('BrowserStorageService', () => {
  let service: NgPatBrowserStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NgPatBrowserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
