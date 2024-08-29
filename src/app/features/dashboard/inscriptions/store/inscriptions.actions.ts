import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  CreateInscriptionPayload,
  inscriptions,
  LoadStudentsAndCoursesResp,
} from '../../../../shared/models/inscriptions';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: inscriptions[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Load Students And Courses': emptyProps(),
    'Load Students And Courses Success': props<{
      data: LoadStudentsAndCoursesResp;
    }>(),
    'Load Students And Courses Failure': props<{ error: unknown }>(),

    'Create Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Create Inscription Success': props<{ data: inscriptions }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),

    'Delete Inscription': props<{ id: string }>(),
    'Delete Inscription Success': props<{ id: string }>(),
    'Delete Inscription Failure': props<{ error: unknown }>(),

    'Edit Inscription': props<{ id: string, changes: Partial<inscriptions> }>(),
    'Edit Inscription Success': props<{ inscription: inscriptions }>(),
    'Edit Inscription Failure': props<{ error: unknown }>(), 
  },
});
