import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { students } from '../../../shared/models/students';
import { StudentsService } from '../../../core/services/students.service';

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

  constructor(private matDialog: MatDialog, private StudentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadingStudents();
  }

  loadingStudents() {
    this.loadingInProcess = true;
    this.StudentsService.getStudents().subscribe({
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
          this.nextId++;
          console.log('Recibimos este  valor: ', value);
          
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
          if (value) {
            const index = this.studentsDataSource.findIndex(student => student.id === editingStudent.id);
            if (index !== -1) {
              this.studentsDataSource[index] = value;
              this.studentsDataSource = [...this.studentsDataSource]; 
            }
          }
        }
      });
    }
  

  deleteStudentById(id: string) {
    if (confirm('Confirma borrado de registro?')) {
      this.studentsDataSource = this.studentsDataSource.filter((el) => el.id !== id);
    }
  }
}