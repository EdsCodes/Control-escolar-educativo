import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';

@Injectable()
export class InscriptionsEffects {
  constructor(
    private actions$: Actions,
    private inscriptionsService: InscriptionsService
  ) {}

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.inscriptionsService.addInscription(action.payload).pipe(
          map((data) => InscriptionsActions.createInscriptionSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getAllInscriptions().pipe(
          map((data) => InscriptionsActions.loadInscriptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionsActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadStudentsAndCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadStudentsAndCourses),
      concatMap(() =>
        this.inscriptionsService.getStudentsAndCourses().pipe(
          map((data) =>
            InscriptionsActions.loadStudentsAndCoursesSuccess({ data })
          ),
          catchError((error) =>
            of(InscriptionsActions.loadStudentsAndCoursesFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) =>
        this.inscriptionsService.deleteInscriptionById(action.id).pipe(
          map(() => InscriptionsActions.deleteInscriptionSuccess({ id: action.id })),
          catchError((error) =>
            of(InscriptionsActions.deleteInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  editInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.editInscription),
      concatMap((action) =>
        this.inscriptionsService.editInscriptionById(action.id, action.changes).pipe(
          map((inscription) => InscriptionsActions.editInscriptionSuccess({ inscription })),
          catchError((error) =>
            of(InscriptionsActions.editInscriptionFailure({ error }))
          )
        )
      )
    );
  });
}