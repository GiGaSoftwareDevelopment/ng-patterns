import { Action, createReducer, on } from '@ngrx/store';
import * as UiActions from './ui.actions';
import { PatternsUiState } from './ui.models';




export const initialPatternsUIState: PatternsUiState = {
  sidenavOpen: false
};

export const reducer = createReducer(
  initialPatternsUIState,

  on(UiActions.loadUis, (state: PatternsUiState) => ({
    ...state
  })),

);
