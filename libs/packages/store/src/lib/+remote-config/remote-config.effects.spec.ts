import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { NgPatRemoteConfigEffects } from './remote-config.effects';

describe('RemoteConfigEffects', () => {
  let actions$: Observable<any>;
  let effects: NgPatRemoteConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgPatRemoteConfigEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(NgPatRemoteConfigEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
