import { TestBed } from '@angular/core/testing';

import { SidenavMenuFactoryService } from './sidenav-menu-factory.service';

describe('SidenavMenuService', () => {
  let service: SidenavMenuFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavMenuFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
