import { createFeatureSelector, createSelector } from "@ngrx/store";
import { autenticatedFeatureName, AutenticatedState } from "./autentication.reducer";

export const selectAutenticationState =
    createFeatureSelector<AutenticatedState>(autenticatedFeatureName);

export const selectAutenticatedUser = createSelector(
    selectAutenticationState,
    (state) => state.autenticatedUser
);