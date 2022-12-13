import { TestBed } from '@angular/core/testing';

import { RouterFacadeService } from './router-facade.service';

describe('RouterFacadeService', () => {
  let service: RouterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
