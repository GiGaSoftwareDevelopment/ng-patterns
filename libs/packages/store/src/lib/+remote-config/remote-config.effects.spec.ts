import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UiuxRemoteConfigEffects } from './remote-config.effects';

describe('RemoteConfigEffects', () => {
  let actions$: Observable<any>;
  let effects: UiuxRemoteConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UiuxRemoteConfigEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UiuxRemoteConfigEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
