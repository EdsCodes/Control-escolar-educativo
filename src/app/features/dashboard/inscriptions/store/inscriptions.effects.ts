import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InscriptionsService } from '../../../../core/services/inscriptions.service';
import * as InscriptionsActions from './inscriptions.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { inscriptions } from '../../../../shared/models/inscriptions';

@Injectable()
export class InscriptionsEffects {

  loadInscriptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptionss),
      mergeMap(() =>
        this.inscriptionService.getAllInscriptions().pipe(
          map((inscriptions: inscriptions[]) =>
            InscriptionsActions.loadInscriptionssSuccess({ inscriptions })
          ),
          catchError((error) =>
            of(InscriptionsActions.loadInscriptionssFailure({ error }))
          )
        )
      )
    )
  );

  addInscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscriptionsActions.addInscription),
      mergeMap(({ inscription }) =>
        this.inscriptionService.addInscription(inscription).pipe(
          map((newInscription: inscriptions) =>
            InscriptionsActions.addInscriptionSuccess({ inscription: newInscription })
          ),
          catchError((error) =>
            of(InscriptionsActions.addInscriptionFailure({ error }))
          )
        )
      )
    )
  );

  // editInscription$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(InscriptionsActions.editInscription),
  //     mergeMap(({ id, update }) =>
  //       this.inscriptionService.editInscriptionById(id, update).pipe(
  //         map((updatedInscription: inscriptions) =>
  //           InscriptionsActions.editInscriptionSuccess({ inscription: updatedInscription })
  //         ),
  //         catchError((error) =>
  //           of(InscriptionsActions.editInscriptionFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  deleteInscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      mergeMap(({ id }) =>
        this.inscriptionService.deleteInscriptionById(id).pipe(
          map(() =>
            InscriptionsActions.deleteInscriptionSuccess({ id })
          ),
          catchError((error) =>
            of(InscriptionsActions.deleteInscriptionFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private inscriptionService: InscriptionsService
  ) {}
}
