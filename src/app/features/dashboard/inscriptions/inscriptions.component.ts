import { Component } from '@angular/core';
import { InscriptionsService } from '../../../core/services/inscriptions.service';
import { inscriptions } from '../../../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogsInscriptionsComponent } from './components/dialogs-inscriptions/dialogs-inscriptions.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {

  displayedColumns: string[] = ['inscriptionId','studentId', 'courseId', 'actions'];
  nextId: number = 6;
  inscriptionsDataSource: inscriptions[] = [];
  loadingInProcess = false;

  mySubject$ = new Subject();

  constructor(private matDialog: MatDialog, private inscriptionsService: InscriptionsService) {

    this.mySubject$.next(1);

    this.inscriptionsService.getAllInscriptions().subscribe({
      next: (val) => (this.inscriptionsDataSource = val),
      complete: () => (this.loadingInProcess = false),
    });
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
    const dialogRef = this.matDialog.open(DialogsInscriptionsComponent, {
      data: { id: this.nextId.toString() }
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          value.id = this.nextId.toString();
          this.loadingInProcess = true
          this.inscriptionsService.addInscription(value).subscribe({
            next: (inscriptions) => {
              this.inscriptionsDataSource = [...inscriptions];
              this.nextId++;
            },
            error: (err) => {
              console.error('Error al agregar el estudiante', err);
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
              this.inscriptionsDataSource = [...inscriptions];
            }
          });
        }
      }
    });
  }

  deleteInscriptionById(inscriptionId: string) {
    if(confirm('Confirma borrado de Inscripcion?')){
      this.loadingInProcess = true;
      this.inscriptionsService.deleteInscriptionById(inscriptionId).subscribe({
        next: (inscriptions) => {
          this.inscriptionsDataSource = [...inscriptions]
        },
        complete: () => {
          this.loadingInProcess = false;
        },
      });
    }
  }

  // addInscription(): void {
  //   this.inscriptionsService.addInscription().subscribe({
  //     next: (val) => (this.incriptions = val)
  //   })
  // }
  
}
