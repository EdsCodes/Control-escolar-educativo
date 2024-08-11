import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { students } from '../../../shared/models/students';
import { StudentsService } from '../../../core/services/students.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/users';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {
  
  studentsDataSource: students[] = [];
  loadingInProcess = false;
  displayedColumns: string[] = ['id', 'nombreCompleto', 'fechaNacimiento', 'celular', 'direccion', 'curso', 'actions'];
  autenticatedUser: Observable<User | null>
  
  constructor(private matDialog: MatDialog, private StudentsService: StudentsService, private authService: AuthService) {
    this.autenticatedUser = this.authService.autenticatedUser;
  }

  ngOnInit(): void {
    this.loadingStudents();
  }

  loadingStudents() {
    this.loadingInProcess = true;
    this.StudentsService.getAllStudents().subscribe({
      next: (students) => {
        this.studentsDataSource = students;
      },
      error: (err) => {
        console.error('Error al cargar los estudiantes', err);
      },
      complete: () => {
        this.loadingInProcess = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsStudentsComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadingInProcess = true
          this.StudentsService.addStudents(value).subscribe({
            next: (students: students) => {
              this.studentsDataSource.push(students);
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

  editStudent(editingStudent: students) {
    this.matDialog
    .open(DialogsStudentsComponent, { data: editingStudent })
    .afterClosed()
    .subscribe({
      next: (value) => {
        if (!!value) {
          this.StudentsService.editStudentsById(editingStudent.id, value).subscribe({
            next: (students) => {
              this.studentsDataSource = this.studentsDataSource.map(c => c.id === students.id ? students : c);
            },
            error: (err) => {
              console.error('Error al editar el estudiante', err)
            }
          });
        }
      }
    });
  }

  deleteStudentById(id: string) {
    this.loadingInProcess = true;
    if(confirm('Confirma borrado de estudiante?')) {
      this.StudentsService.deleteStudentsById(id)
      .pipe(
        tap(() => this.loadingStudents())
      )
      .subscribe({
        error: (err) => {
          console.error('Error al borrar el estudiante', err);
        },
        complete: () => {
          this.loadingInProcess = false;
          alert('curso borrado correctamente');
        },
      });
    }
  }
}