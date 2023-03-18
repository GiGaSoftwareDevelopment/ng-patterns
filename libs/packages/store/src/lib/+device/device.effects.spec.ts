import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';

import {NgPatDeviceEffects} from './device.effects';

describe('DeviceEffects', () => {
  let actions$: Observable<any>;
  let effects: NgPatDeviceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgPatDeviceEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(NgPatDeviceEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
