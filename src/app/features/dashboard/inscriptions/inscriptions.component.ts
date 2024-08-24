import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/users';
import { NotificationService } from '../../../core/services/notifications.service';
import { Store, select } from '@ngrx/store';
import { RootState } from './store/rootstate';
import { loadInscriptionss, addInscription, editInscription, deleteInscription } from './store/inscriptions.actions';
import { selectAllInscriptions, selectInscriptionsLoading } from '../inscriptions/store/inscriptions.selectors';
import { inscriptions } from '../../../shared/models/inscriptions';
import { DialogsInscriptionsComponent } from './components/dialogs-inscriptions/dialogs-inscriptions.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {

  inscriptionsDataSource = new MatTableDataSource<inscriptions>(); 
  loadingInProcess$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'studentName', 'courseName', 'startDate', 'endDate', 'actions'];
  autenticatedUser: Observable<User | null>;

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private store: Store<RootState>
  ) {
    this.autenticatedUser = this.authService.autenticatedUser;
    this.loadingInProcess$ = this.store.pipe(select(selectInscriptionsLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(loadInscriptionss());
    
    this.store.pipe(
      select(selectAllInscriptions),
      map(inscriptions => inscriptions || [])
    ).subscribe(inscriptions => {
      this.inscriptionsDataSource.data = inscriptions;
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsInscriptionsComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.store.dispatch(addInscription({ inscription: value }));
        }
      }
    });
  }

  editInscription(editingInscription: inscriptions): void {
    const dialogRef = this.matDialog.open(DialogsInscriptionsComponent, { data: editingInscription });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.store.dispatch(editInscription({ id: editingInscription.id, update: value }));
        }
      }
    });
  }

  deleteInscriptionById(id: string): void {
    if (confirm('¿Confirma el borrado de la inscripción?')) {
      this.store.dispatch(deleteInscription({ id }));
    }
  }
}