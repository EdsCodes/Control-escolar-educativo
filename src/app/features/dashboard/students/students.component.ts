import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { students } from '../../../shared/models/students';
import { StudentsService } from '../../../core/services/students.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/models/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fechaNacimiento', 'celular', 'direccion', 'curso', 'actions'];
  nextId: number = 11;
  studentsDataSource: students[] = [];
  loadingInProcess = false;

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
    const dialogRef = this.matDialog.open(DialogsStudentsComponent, {
      data: { id: this.nextId.toString() }
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          value.id = this.nextId.toString();
          this.loadingInProcess = true
          this.StudentsService.addStudents(value).subscribe({
            next: (students) => {
              this.studentsDataSource = [...students];
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

  editStudent(editingStudent: students) {
    this.matDialog
    .open(DialogsStudentsComponent, { data: editingStudent })
    .afterClosed()
    .subscribe({
      next: (value) => {
        if (!!value) {
          this.StudentsService.editStudentsById(editingStudent.id, value).subscribe({
            next: (students) => {
              this.studentsDataSource = [...students];
            }
          });
        }
      }
    });
  }

    deleteStudentById(id: string) {
      if(confirm('Confirma borrado de estudiante?')){
        this.loadingInProcess = true;
        this.StudentsService.deleteStudentsById(id).subscribe({
          next: (students) => {
            this.studentsDataSource = [...students]
          },
          complete: () => {
            this.loadingInProcess = false;
          },
        });
      }
    }
}