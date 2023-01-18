import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RemoteConfigEffects } from './remote-config.effects';

describe('RemoteConfigEffects', () => {
  let actions$: Observable<any>;
  let effects: RemoteConfigEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RemoteConfigEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(RemoteConfigEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
