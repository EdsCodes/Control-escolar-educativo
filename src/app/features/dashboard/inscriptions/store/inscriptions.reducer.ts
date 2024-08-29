import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { inscriptions, Student } from '../../../../shared/models/inscriptions';
import { Course } from '../../../../shared/models/inscriptions';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  isLoading: boolean;
  isLoadingStudentsAndCourses: boolean;
  inscriptions: inscriptions[];
  students: Student[];
  courses: Course[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingStudentsAndCourses: false,
  inscriptions: [],
  students: [],
  courses: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: action.data,
    error: null,
  })),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(InscriptionsActions.loadStudentsAndCourses, (state) => ({
    ...state,
    isLoadingStudentsAndCourses: true,
  })),
  on(InscriptionsActions.loadStudentsAndCoursesSuccess, (state, action) => ({
    ...state,
    isLoadingStudentsAndCourses: false,
    courses: action.data.courses,
    students: action.data.students,
    error: null,
  })),
  on(InscriptionsActions.createInscription, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionsActions.createInscriptionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    inscriptions: [...state.inscriptions, action.data],
    error: null,
  })),
  on(InscriptionsActions.createInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(InscriptionsActions.deleteInscription, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionsActions.deleteInscriptionSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    inscriptions: state.inscriptions.filter((inscription) => inscription.id !== id),
    error: null,
  })),
  on(InscriptionsActions.deleteInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(InscriptionsActions.editInscription, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionsActions.editInscriptionSuccess, (state, { inscription }) => ({
    ...state,
    isLoading: false,
    inscriptions: state.inscriptions.map((ins) =>
      ins.id === inscription.id ? { ...ins, ...inscription } : ins
    ),
    error: null,
  })),
  on(InscriptionsActions.editInscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

export { createReducer };