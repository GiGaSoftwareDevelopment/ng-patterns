import {TestBed} from '@angular/core/testing';

import {NgPatSidenavMenuFactoryService} from './ng-pat-sidenav-menu-factory.service';

describe('SidenavMenuService', () => {
  let service: NgPatSidenavMenuFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPatSidenavMenuFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
