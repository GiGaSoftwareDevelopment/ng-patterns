import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BrowserStorageItem } from './browser-storage.model';
import * as BrowserStorageActions from './browser-storage.actions';

export const browserStoragesFeatureKey = 'browserStorageItems';

export function selectBrowserStorageId(a: BrowserStorageItem): string {
  //In this case this would be optional since primary key is id
  return a.key;
}

export interface BrowserStorageState extends EntityState<BrowserStorageItem> {
  // additional entities state properties
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface PartialBrowserStorageState {
  readonly [browserStoragesFeatureKey]: BrowserStorageState;
}

export const browserStorageAdapter: EntityAdapter<BrowserStorageItem> =
  createEntityAdapter<BrowserStorageItem>({
    selectId: selectBrowserStorageId
  });

export const initialBrowserStorageState: BrowserStorageState =
  browserStorageAdapter.getInitialState({
    // additional entity state properties
    isLoaded: false,
    isLoading: true,
    error: null
  });

const reducer = createReducer(
  initialBrowserStorageState,
  on(BrowserStorageActions.addBrowserStorageItem, (state, { browserStorageItem }) =>
    browserStorageAdapter.addOne(browserStorageItem, state)
  ),
  on(BrowserStorageActions.setBrowserStorageItem, (state, { browserStorageItem }) => {
    return browserStorageAdapter.setOne(browserStorageItem, state);
  }),
  on(BrowserStorageActions.addBrowserStorageItems, (state, { browserStorageItems }) =>
    browserStorageAdapter.addMany(browserStorageItems, state)
  ),
  on(BrowserStorageActions.doDisconnectAndRemoveBrowserStorageItem, (state, { id }) =>
    browserStorageAdapter.removeOne(id, { ...state, error: null })
  ),
  on(BrowserStorageActions.removeBrowserStorageItems, (state, { ids }) =>
    browserStorageAdapter.removeMany(ids, state)
  ),
  on(BrowserStorageActions.loadBrowserStorageItems, (state, { browserStorageItems }) =>
    browserStorageAdapter.setAll(browserStorageItems, {
      ...state,
      isLoaded: true,
      isLoading: false
    })
  ),
  on(BrowserStorageActions.setBrowserStorageItems, (state, { browserStorageItems }) => {
    return browserStorageAdapter.setMany(browserStorageItems, state);
  }),
  on(BrowserStorageActions.clearBrowserStorageItems, state =>
    browserStorageAdapter.removeAll({ ...state, isLoaded: false })
  ),
  on(BrowserStorageActions.browserStorageError, (state, { message }) => ({
    ...state,
    error: message
  }))
  // on(loadApis, (state) => ({ ...state, isLoading: true }))
);

export const browserStorageReducer = (
  state: BrowserStorageState | undefined,
  action: Action
) => reducer(state, action);
