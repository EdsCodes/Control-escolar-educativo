import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  dataSource: MatTableDataSource<inscriptions>;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;
  error$: Observable<unknown>;
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'startDate', 'endDate', 'actions'];

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
    this.dataSource = new MatTableDataSource<inscriptions>();
    this.inscriptionsForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
    this.store.dispatch(InscriptionsActions.loadStudentsAndCourses());
    this.store.select(selectInscriptions).subscribe((data) => {
      if (data) {
        this.dataSource.data = data;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogsInscriptionsComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(InscriptionsActions.createInscription({ payload: result }));
      }
    });
  }

  editInscription(inscription: inscriptions): void {
    // Pendiente Implementar lógica de edición
  }

  deleteInscriptionById(id: number): void {
    // Pendiente Implementar lógica de eliminación
  }
}