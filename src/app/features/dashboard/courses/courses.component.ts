import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';
import { courses } from '../../../shared/models/courses';
import { CoursesService } from '../../../core/services/courses.service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/users';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['idCurso','nombreCurso', 'fechaInicioCurso', 'fechaFinCurso',  'actions'];
  nextId: number = 6;
  coursesDataSource: courses[] = [];
  loadingInProcess = false;
  autenticatedUser: Observable<User | null>


  constructor(private matDialog: MatDialog, private coursesService: CoursesService, private authService: AuthService) {
    this.autenticatedUser = this.authService.autenticatedUser;
  }

  ngOnInit(): void {
    this.loadingCourses();
  }

  loadingCourses() {
    this.loadingInProcess = true;
    this.coursesService.getAllCourses().subscribe({
      next: (courses) => {
        this.coursesDataSource = courses;
      },
      error: (err) => {
        console.error('Error al cargar los cursos', err);
      },
      complete: () => {
        this.loadingInProcess = false;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.matDialog.open(DialogsCoursesComponent, {
      data: { idCurso: this.nextId.toString() }
    });

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          value.idCurso = this.nextId.toString();
          this.loadingInProcess = true
          this.coursesService.addCourses(value).subscribe({
            next: (courses) => {
              this.coursesDataSource = [...courses];
              this.nextId++;
            },
            error: (err) => {
              console.error('Error al agregar el curso', err);
            },
            complete: () => {
              this.loadingInProcess = false;
            }
          });
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
        if (!!value) {
          this.coursesService.editCoursesById(editingCourse.idCurso, value).subscribe({
            next: (courses) => {
              this.coursesDataSource = [...courses];
            }
          });
        }
      }
    });
  }

  deleteCourseById(idCurso: string) {
    if(confirm('Confirma borrado de curso?')){
      this.loadingInProcess = true;
      this.coursesService.deleteCourseById(idCurso).subscribe({
        next: (courses) => {
          this.coursesDataSource = [...courses]
        },
        complete: () => {
          this.loadingInProcess = false;
        },
      });
    }
  }
}