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
  on(InscriptionsActions.loadInscriptions, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      inscriptions: action.data,
      error: null,
    };
  }),

  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),

  
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

  // Create Inscription
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
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

export { createReducer };