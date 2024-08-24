import { createAction, props } from '@ngrx/store';
import { inscriptions } from '../../../../shared/models/inscriptions';

export const loadInscriptionss = createAction('[Inscriptions] Load Inscriptions');

export const loadInscriptionssSuccess = createAction(
  '[Inscriptions] Load Inscriptions Success',
  props<{ inscriptions: inscriptions[] }>()
);

export const loadInscriptionssFailure = createAction(
  '[Inscriptions] Load Inscriptions Failure',
  props<{ error: any }>()
);

export const addInscription = createAction(
  '[Inscriptions] Add Inscription',
  props<{ inscription: inscriptions }>()
);

export const addInscriptionSuccess = createAction(
  '[Inscriptions] Add Inscription Success',
  props<{ inscription: inscriptions }>()
);

export const addInscriptionFailure = createAction(
  '[Inscriptions] Add Inscription Failure',
  props<{ error: any }>()
);

export const editInscription = createAction(
  '[Inscriptions] Edit Inscription',
  props<{ id: string; update: Partial<inscriptions> }>()
);

export const editInscriptionSuccess = createAction(
  '[Inscriptions] Edit Inscription Success',
  props<{ inscription: inscriptions }>()
);

export const editInscriptionFailure = createAction(
  '[Inscriptions] Edit Inscription Failure',
  props<{ error: any }>()
);

export const deleteInscription = createAction(
  '[Inscriptions] Delete Inscription',
  props<{ id: string }>()
);

export const deleteInscriptionSuccess = createAction(
  '[Inscriptions] Delete Inscription Success',
  props<{ id: string }>()
);

export const deleteInscriptionFailure = createAction(
  '[Inscriptions] Delete Inscription Failure',
  props<{ error: any }>()
);
