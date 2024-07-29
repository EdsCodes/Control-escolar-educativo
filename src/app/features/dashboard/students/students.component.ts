import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { studentsInterface } from '../../../shared/studentsInterface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {

  displayedColumns: string[] = ['id', 'nombre', 'fechaNacimiento', 'celular', 'direccion', 'curso', 'actions'];

  dataSource: studentsInterface[] = [];

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog
      .open(DialogsStudentsComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            this.dataSource = [...this.dataSource, value]
          }
        } 
      });
    }

    editStudent(editingStudent: studentsInterface) {
      this.matDialog
      .open(DialogsStudentsComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            const index = this.dataSource.findIndex(student => student.id === editingStudent.id);
            if (index !== -1) {
              this.dataSource[index] = value;
              this.dataSource = [...this.dataSource]; 
            }
          }
        }
      });
    }

  deleteStudentById (id: string){
    if(confirm('confirma borrado de registro?')){
      this.dataSource = this.dataSource.filter((el) => el.id != id);
    }
  }
}