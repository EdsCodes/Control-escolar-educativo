import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<State>('inscriptions');

export const selectAllInscriptions = createSelector(
  selectInscriptionsState,
  (state: State) => state.inscriptions
);

export const selectInscriptionsLoading = createSelector(
  selectInscriptionsState,
  (state: State) => state.loading
);

export const selectInscriptionsError = createSelector(
  selectInscriptionsState,
  (state: State) => state.error
);
