import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';
import { courses } from '../../../shared/models/courses';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'] 
})

export class CoursesComponent {

  displayedColumns: string[] = ['idCurso','nombreCurso', 'fechaInicioCurso', 'fechaFinCurso',  'actions'];

  nextId: number = 6;

  coursesDataSource: courses[] = []

  constructor(private matDialog: MatDialog, private coursesService: CoursesService ) {}

  ngOnInit(): void {
    this.loadingCourses();
  }

  loadingCourses() {
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.coursesDataSource = courses;
      },
      error: (err) => {
        console.error('Error al cargar los cursos', err);
      }
    });
  }

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