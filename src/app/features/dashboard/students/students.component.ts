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
  studentName = '';
  inDate: Date | null = null;

  displayedColumns: string[] = ['id', 'nombre', 'fechaNacimiento', 'celular', 'direccion', 'curso'];

  dataSource: studentsInterface[] = [
    {id: 1, nombre: 'John Castro', fechaNacimiento: '07-01-1993', celular: 3205652541, direccion: 'Calle siempre viva 123', curso: 'ui/ux'},
    {id: 2, nombre: 'Jorge Cao', fechaNacimiento: '18-02-1982', celular: 3205652541, direccion: 'Calle siempre viva 456', curso: 'Angular'},
    {id: 3, nombre: 'John Travolta', fechaNacimiento: '31-03-1992', celular: 3205652541, direccion: 'Calle siempre viva 789', curso: 'JS'},
    {id: 4, nombre: 'John Lenon', fechaNacimiento: '11-03-1982', celular: 3205652541, direccion: 'Calle esperanza 123', curso: 'Angular'},
    {id: 5, nombre: 'Lenny Kravitz', fechaNacimiento: '15-07-1987', celular: 3205652541, direccion: 'Calle esperanza 456', curso: 'React'}
  ];

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog
      .open(DialogsStudentsComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            if (value.studentName) {
              this.studentName = value.studentName;
              console.log('Nombre de estudiante recibido: ', value.studentName);
            }
            if (value.inDate) {
              this.inDate = value.inDate;
              console.log('Fecha de matricula recibida: ', value.inDate);
            }
          }
        }
      });
  }
}

