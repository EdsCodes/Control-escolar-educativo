import { createReducer, on, Action, createFeature } from '@ngrx/store';
import * as InscriptionsActions from './inscriptions.actions';
import { inscriptions } from '../../../../shared/models/inscriptions';

export interface State {
  inscriptions: inscriptions[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  inscriptions: [],
  loading: false,
  error: null,
};

export const inscriptionsReducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptionss, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InscriptionsActions.loadInscriptionssSuccess, (state, { inscriptions }) => ({
    ...state,
    inscriptions,
    loading: false,
  })),
  on(InscriptionsActions.loadInscriptionssFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Añadir inscription
  on(InscriptionsActions.addInscriptionSuccess, (state, { inscription }) => ({
    ...state,
    inscriptions: [...state.inscriptions, inscription],
  })),

  on(InscriptionsActions.addInscriptionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Editar inscription
  on(InscriptionsActions.editInscriptionSuccess, (state, { inscription }) => ({
    ...state,
    inscriptions: state.inscriptions.map((i) =>
      i.id === inscription.id ? inscription : i
    ),
  })),
  on(InscriptionsActions.editInscriptionFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // Borrar inscription
  on(InscriptionsActions.deleteInscriptionSuccess, (state, { id }) => ({
    ...state,
    inscriptions: state.inscriptions.filter((i) => i.id !== id),
  })),
  on(InscriptionsActions.deleteInscriptionFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const inscriptionsFeatureKey = 'inscriptions';

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer: inscriptionsReducer,
});