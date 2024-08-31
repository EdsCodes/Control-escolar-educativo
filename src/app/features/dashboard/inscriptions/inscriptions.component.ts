import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { inscriptions, Student, Course } from '../../../shared/models/inscriptions';
import { NotificationService } from '../../../core/services/notifications.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store';
import { InscriptionsActions } from '../../dashboard/inscriptions/store/inscriptions.actions';
import {
  selectInscriptions,
  selectInscriptionsError,
  selectInscriptionsIsLoading,
  selectInscriptionsCourses,
  selectInscriptionsStudents,
} from '../../../features/dashboard/inscriptions/store/inscriptions.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogsInscriptionsComponent } from '../inscriptions/components/dialogs-inscriptions/dialogs-inscriptions.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent implements OnInit {
  inscriptionsForm: FormGroup;
  isLoading$: Observable<boolean>;
  loadingInProcess = false;
  inscriptions$: Observable<inscriptions[]>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;
  error$: Observable<unknown>;
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'startDate', 'endDate', 'actions'];
  dataSource = new MatTableDataSource<inscriptions>();

  constructor(
    private notificationService: NotificationService,
    private store: Store<RootState>,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.isLoading$ = this.store.select(selectInscriptionsIsLoading);
    this.error$ = this.store.select(selectInscriptionsError);
    this.students$ = this.store.select(selectInscriptionsStudents);
    this.courses$ = this.store.select(selectInscriptionsCourses);
    this.inscriptions$ = this.store.select(selectInscriptions);
    this.inscriptionsForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
    this.store.dispatch(InscriptionsActions.loadStudentsAndCourses());
    this.inscriptions$
      .pipe(
        tap((data) => {
          if (data) {
            this.dataSource.data = data;
          }
        })
      )
      .subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogsInscriptionsComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(InscriptionsActions.createInscription({ payload: result }));
        this.notificationService.showSuccessNotification('Inscripción agregada correctamente.');
        this.store.dispatch(InscriptionsActions.loadInscriptions());
      }
    });
  }

  editInscription(inscription: inscriptions): void {
    const dialogRef = this.dialog.open(DialogsInscriptionsComponent, {
      width: '400px',
      data: inscription,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(InscriptionsActions.editInscription({ id: inscription.id, changes: result }));
        this.notificationService.showSuccessNotification('Inscripción editada correctamente.');
        this.store.dispatch(InscriptionsActions.loadInscriptions());
      }
    });
  }

  deleteInscriptionById(id: number) {
    this.loadingInProcess = true;
    if(confirm('Confirma borrado de inscripción?')) {
      this.store.dispatch(InscriptionsActions.deleteInscription({ id: id.toString() }));
      this.notificationService.showSuccessNotification('Inscripción eliminada correctamente.');
    }
  }
}