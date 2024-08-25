import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as frominscriptions from './inscriptions.reducer';

export const selectinscriptionsState =
  createFeatureSelector<frominscriptions.State>(
    frominscriptions.inscriptionsFeatureKey
  );

export const selectInscriptions = createSelector(
  selectinscriptionsState,
  (state) => state.inscriptions
);

export const selectInscriptionsIsLoading = createSelector(
  selectinscriptionsState,
  (state) => state.isLoading
);

export const selectInscriptionsError = createSelector(
  selectinscriptionsState,
  (state) => state.error
);

export const selectInscriptionsStudents = createSelector(
  selectinscriptionsState,
  (state) => state.students
);

export const selectInscriptionsCourses = createSelector(
  selectinscriptionsState,
  (state) => state.courses
);