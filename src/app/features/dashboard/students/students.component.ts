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

  displayedColumns: string[] = ['id', 'nombreCompleto', 'fechaNacimiento', 'celular', 'direccion', 'curso', 'actions'];
  nextId: number = 11;

  dataSource: studentsInterface[] = [
    { id: '1', nombre: 'Josefa', apellidos: 'Poblado', fechaNacimiento: '2000-12-31', celular: '555-010110', direccion: 'Calle 1 Nº 10', curso: 'Curso 1' },
    { id: '2', nombre: 'Juan', apellidos:'Cañas', fechaNacimiento: '2001-12-31', celular: '555-010259', direccion: 'Calle 2 Nº 20', curso: 'Curso 2' },
    { id: '3', nombre: 'John', apellidos: ' Hernandez', fechaNacimiento: '2002-12-31', celular: '555-010397', direccion: 'Calle 3 Nº 30', curso: 'Curso 3' },
    { id: '4', nombre: 'Fernando', apellidos: ' Casas', fechaNacimiento: '2003-12-31', celular: '555-0104456', direccion: 'Calle 4 Nº 40', curso: 'Curso 4' },
    { id: '5', nombre: 'Andrea', apellidos: ' Castaño', fechaNacimiento: '2004-12-31', celular: '555-010545', direccion: 'Calle 5 Nº 50', curso: 'Curso 5' },
    { id: '6', nombre: 'Johanna', apellidos: 'Messi',fechaNacimiento: '2005-12-31', celular: '555-010669', direccion: 'Calle 6 Nº 60', curso: 'Curso 6' },
    { id: '7', nombre: 'Cristiano', apellidos: ' Paredes', fechaNacimiento: '2006-12-31', celular: '555-010747', direccion: 'Calle 7 Nº 70', curso: 'Curso 7' },
    { id: '8', nombre: 'Robin', apellidos: 'Del Aguila', fechaNacimiento: '2007-12-31', celular: '555-010819', direccion: 'Calle 8 Nº 80', curso: 'Curso 8' },
    { id: '9', nombre: 'Lucy', apellidos: 'Martinez', fechaNacimiento: '2008-12-31', celular: '555-010973', direccion: 'Calle 9 Nº 90', curso: 'Curso 9' },
    { id: '10', nombre: 'Lautaro', apellidos: 'Ramirez', fechaNacimiento: '2009-12-31', celular: '555-0101021', direccion: 'Calle 10 Nº 100', curso: 'Curso 10' },
  ];

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsStudentsComponent, {
      data: { id: this.nextId.toString() }
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.dataSource = [...this.dataSource, value];
          this.nextId++;
        }
      } 
    });
  }

  editStudent(editingStudent: studentsInterface) {
    this.matDialog.open(DialogsStudentsComponent, { data: editingStudent })
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

  deleteStudentById(id: string) {
    if (confirm('Confirma borrado de registro?')) {
      this.dataSource = this.dataSource.filter((el) => el.id !== id);
    }
  }
}