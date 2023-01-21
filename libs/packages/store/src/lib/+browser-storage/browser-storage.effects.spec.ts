import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable} from 'rxjs';

import {BrowserStorageEffects} from './browser-storage.effects';
import {BrowserStorageService} from './browser-storage.service';
import {initialBrowserStorageState} from './browser-storage.reducer';
import {selectAllBrowserStorages} from './browser-storage.selectors';

jest.mock('./browser-storage.service');

describe('BrowserStorageEffects', () => {
  let actions$: Observable<any>;
  let effects: BrowserStorageEffects;
  let service: BrowserStorageService;

  let storeConfig = {
    initialState: initialBrowserStorageState,
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
        BrowserStorageEffects,
        provideMockActions(() => actions$),
        provideMockStore(storeConfig)
      ]
    });

    effects = TestBed.inject(BrowserStorageEffects);
    service = TestBed.inject(BrowserStorageService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
