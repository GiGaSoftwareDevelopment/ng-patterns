import { TestBed } from '@angular/core/testing';

import { NgPatRouterFacadeService } from './ng-pat-router-facade.service';

describe('RouterFacadeService', () => {
  let service: NgPatRouterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPatRouterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
