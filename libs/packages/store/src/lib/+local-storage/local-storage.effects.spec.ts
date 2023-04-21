import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { NgPatLocalStorageEffects } from './local-storage.effects';
import { NgPatLocalStorageService } from '../services/ng-pat-local-storage.service';
import { ngPatIInitialLocalStorageState } from './local-storage.reducer';
import { selectAllLocalStorages } from './local-storage.selectors';

jest.mock('./local-storage.getService');

describe('LocalStorageEffects', () => {
  let actions$: Observable<any>;
  let effects: NgPatLocalStorageEffects;
  let service: NgPatLocalStorageService;

  const storeConfig = {
    initialState: ngPatIInitialLocalStorageState,
    selectors: [
      {
        selector: selectAllLocalStorages,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgPatLocalStorageEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(NgPatLocalStorageEffects);
    service = TestBed.inject(NgPatLocalStorageService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
