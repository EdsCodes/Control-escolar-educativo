import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {
  courseName = ''

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog
    .open(DialogsCoursesComponent)
    .afterClosed()
    .subscribe({
      next: (value) => {
        if(value && value.courseName){
          this.courseName = value.courseName;
          console.log('Nombre de curso recibido: ', value);
        }
      }
    });
  }
}
