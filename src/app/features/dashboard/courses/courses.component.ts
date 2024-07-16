import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'] 
})
export class CoursesComponent {
  courseName = '';
  startDate: Date | null = null;
  endDate: Date | null = null;  

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog
      .open(DialogsCoursesComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            if (value.courseName) {
              this.courseName = value.courseName;
              console.log('Nombre de curso recibido: ', value.courseName);
            }
            if (value.startDate) {
              this.startDate = value.startDate;
              console.log('Fecha de inicio recibida: ', value.startDate);
            }
            if (value.endDate) {
              this.endDate = value.endDate;
              console.log('Fecha de fin recibida: ', value.endDate);
            }
          }
        }
      });
  }
}