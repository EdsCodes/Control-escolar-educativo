import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsStudentsComponent } from './components/dialogs-students/dialogs-students.component';
import { studentsInterface } from '../../../shared/models/students';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})

export class StudentsComponent {

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fechaNacimiento', 'celular', 'direccion', 'curso', 'actions'];
  nextId: number = 11;

  studentsDataSource: studentsInterface[] = [
    { id: '1', nombre: 'Josefa', apellidos: 'Poblado', fechaNacimiento: '1990-07-19', celular: '3205904878', direccion: 'Calle 1 Nº 10', curso: 'React' },
    { id: '2', nombre: 'Juan', apellidos:'Cañas', fechaNacimiento: '1983-12-31', celular: '3508998877', direccion: 'Calle 2 Nº 20', curso: 'Angular' },
    { id: '3', nombre: 'John', apellidos: ' Hernandez', fechaNacimiento: '2002-05-31', celular: '3152615678', direccion: 'Calle 3 Nº 30', curso: 'Js' },
    { id: '4', nombre: 'Fernando', apellidos: ' Casas', fechaNacimiento: '1997-09-14', celular: '3232104456', direccion: 'Calle 4 Nº 40', curso: 'React' },
    { id: '5', nombre: 'Andrea', apellidos: ' Castaño', fechaNacimiento: '1994-09-27', celular: '3155810545', direccion: 'Calle 5 Nº 50', curso: 'Js' },
    { id: '6', nombre: 'Johanna', apellidos: 'Messi',fechaNacimiento: '2002-01-08', celular: '3108010669', direccion: 'Calle 6 Nº 60', curso: 'Angular' },
    { id: '7', nombre: 'Cristiano', apellidos: ' Paredes', fechaNacimiento: '2001-10-10', celular: '3193010747', direccion: 'Calle 7 Nº 70', curso: 'Angular' },
    { id: '8', nombre: 'Robin', apellidos: 'Del Aguila', fechaNacimiento: '2003-03-31', celular: '3155010819', direccion: 'Calle 8 Nº 80', curso: 'React' },
    { id: '9', nombre: 'Lucy', apellidos: 'Martinez', fechaNacimiento: '1993-02-22', celular: '3169010973', direccion: 'Calle 9 Nº 90', curso: 'Js' },
    { id: '10', nombre: 'Lautaro', apellidos: 'Ramirez', fechaNacimiento: '2001-12-31', celular: '3225971011', direccion: 'Calle 10 Nº 100', curso: 'Angular' },
  ];

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsStudentsComponent, {
      data: { id: this.nextId.toString() }
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.studentsDataSource = [...this.studentsDataSource, value];
          this.nextId++;
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