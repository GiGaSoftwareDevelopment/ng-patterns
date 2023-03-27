import { TestBed } from '@angular/core/testing';

import { GigaRouterFacadeService } from './giga-router-facade.service';

describe('RouterFacadeService', () => {
  let service: GigaRouterFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigaRouterFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
