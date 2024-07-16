import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { studentsInterface } from './components/studentsInterface';

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
          this.dataSource = [...this.dataSource, value]
        }
      });
    }

  editStudent (editingStudent: studentsInterface) {
    this.matDialog.open(DialogsStudentsComponent, {data: editingStudent});
  }

  deleteStudentById (id: string){
    if(confirm('confirma borrado de registro?')){
      this.dataSource = this.dataSource.filter((el) => el.id != id);
    }
  }
}