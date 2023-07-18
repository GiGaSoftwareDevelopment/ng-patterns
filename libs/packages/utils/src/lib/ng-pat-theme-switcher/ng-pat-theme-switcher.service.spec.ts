import { TestBed } from '@angular/core/testing';

import { NgPatThemeSwitcherService } from './ng-pat-theme-switcher.service';

describe('NgPatThemeSwitcherService', () => {
  let service: NgPatThemeSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPatThemeSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
