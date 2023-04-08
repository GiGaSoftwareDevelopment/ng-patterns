import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { NgPatBrowserStorageEffects } from './browser-storage.effects';
import { NgPatBrowserStorageService } from '../services/ng-pat-browser-storage.service';
import { ngPatIInitialBrowserStorageState } from './browser-storage.reducer';
import { selectAllBrowserStorages } from './browser-storage.selectors';

jest.mock('./browser-storage.getService');

describe('BrowserStorageEffects', () => {
  let actions$: Observable<any>;
  let effects: NgPatBrowserStorageEffects;
  let service: NgPatBrowserStorageService;

  const storeConfig = {
    initialState: ngPatIInitialBrowserStorageState,
    selectors: [
      {
        selector: selectAllBrowserStorages,
        value: [
          // Add mock store entities here
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgPatBrowserStorageEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(NgPatBrowserStorageEffects);
    service = TestBed.inject(NgPatBrowserStorageService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
