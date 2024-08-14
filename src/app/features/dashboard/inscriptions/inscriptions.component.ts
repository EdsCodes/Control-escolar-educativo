import { Component, OnInit } from '@angular/core';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { inscriptions } from '../../../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogsInscriptionsComponent } from './components/dialogs-inscriptions/dialogs-inscriptions.component';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/users';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnInit {
  
  inscriptionsDataSource: inscriptions[] = [];
  loadingInProcess = false;
  displayedColumns: string[] = ['id', 'studentId', 'studentName', 'courseId', 'courseName', 'actions'];
  autenticatedUser: Observable<User | null>

  constructor(
    private matDialog: MatDialog,
    private inscriptionsService: InscriptionsService,
    private authService: AuthService
  ) {
    this.autenticatedUser = this.authService.autenticatedUser;
  }

  ngOnInit(): void {
    this.loadingInscriptions();
  }

  loadingInscriptions() {
    this.loadingInProcess = true;
    this.inscriptionsService.getAllInscriptions().subscribe({
      next: (inscriptions) => {
        this.inscriptionsDataSource = inscriptions;
      },
      error: (err) => {
        console.error('Error al cargar las inscripciones', err);
      },
      complete: () => {
        this.loadingInProcess = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsInscriptionsComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadingInProcess = true;
          this.inscriptionsService.addInscription(value).subscribe({
            next: (inscription) => {
              this.inscriptionsDataSource.push(inscription);
            },
            error: (err) => {
              console.error('Error al agregar la inscripción', err);
            },
            complete: () => {
              this.loadingInProcess = false;
            }
          });
        }
      }
    });
  }

  editInscription(editingInscription: inscriptions) {
    this.matDialog
    .open(DialogsInscriptionsComponent, { data: editingInscription })
    .afterClosed()
    .subscribe({
      next: (value) => {
        if (!!value) {
          this.inscriptionsService.editInscriptonById(editingInscription.studentId, value).subscribe({
            next: (inscriptions) => {
              this.inscriptionsDataSource = this.inscriptionsDataSource.map(c => c.id === inscriptions.id ? inscriptions : c);            }
          });
        }
      }
    });
  }

  deleteInscriptionById(id: string) {
    this.loadingInProcess = true;
    if (confirm('Confirma borrado de inscripción?')) {
      this.inscriptionsService.deleteInscriptionById(id)
        .pipe(
          tap(() => this.loadingInscriptions())
        )
        .subscribe({
          error: (err) => {
            console.error('Error al borrar la inscripción', err);
          },
          complete: () => {
            alert('Inscripción borrada correctamente');
            this.loadingInProcess = false;
          }
        });
    }
  }
}
