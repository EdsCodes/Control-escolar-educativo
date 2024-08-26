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

  loadInscriptiopns$ = createEffect(() => {
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
}