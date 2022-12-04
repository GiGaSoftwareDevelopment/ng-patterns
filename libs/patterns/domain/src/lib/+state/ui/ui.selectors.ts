import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './ui.reducer';

export const selectUiState = createFeatureSelector<fromUi.PatternsUiState>(
  fromUi.uiFeatureKey
);
