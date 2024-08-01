import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';
import { courses } from '../../../shared/models/courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'] 
})

export class CoursesComponent {

  displayedColumns: string[] = ['idCurso','nombreCurso', 'fechaInicioCurso', 'fechaFinCurso',  'actions'];

  nextId: number = 6;

  coursesDataSource: courses[] = [
    { idCurso: '1', nombreCurso: 'React', fechaInicioCurso: '08-15-2024', fechaFinCurso: '01-20-2026'},
    { idCurso: '2', nombreCurso: 'Angular', fechaInicioCurso: '09-15-2024', fechaFinCurso: '02-20-2026'},
    { idCurso: '3', nombreCurso: 'Js', fechaInicioCurso: '10-15-2024', fechaFinCurso: '03-20-2026'},
    { idCurso: '4', nombreCurso: 'CSS', fechaInicioCurso: '11-15-2024', fechaFinCurso: '04-20-2026'},
    { idCurso: '5', nombreCurso: 'HTML5', fechaInicioCurso: '12-15-2024', fechaFinCurso: '05-20-2026'},
  ]

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    const dialogRef =this.matDialog.open
    (DialogsCoursesComponent, {
      data: {idCurso: this.nextId.toString() }
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if(value) {
          this.coursesDataSource = [...this.coursesDataSource, value];
          this.nextId++;
        }
      }
    });
  }

  editCourse(editingCourse: courses) {
    this.matDialog
      .open(DialogsCoursesComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (value) {
            const index = this.coursesDataSource.findIndex(course => course.idCurso === editingCourse.idCurso);
            if (index !== -1) {
              this.coursesDataSource[index] = value;
              this.coursesDataSource = [...this.coursesDataSource]; 
            }
          }
        }
      });
    }

  deleteCourseById(idCUrso: string) {
    if(confirm('Confirma borrado de curso?')){
      this.coursesDataSource = this.coursesDataSource.filter((el) => el.idCurso !== idCUrso);
    }
  }
}