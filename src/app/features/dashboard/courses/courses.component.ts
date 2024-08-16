import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';
import { courses } from '../../../shared/models/courses';
import { CoursesService } from '../../../core/services/courses.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../../shared/models/users';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {
  
  coursesDataSource: courses[] = [];
  loadingInProcess = false;
  displayedColumns: string[] = ['id', 'nombreCurso', 'fechaInicioCurso', 'fechaFinCurso', 'actions'];
  autenticatedUser: Observable<User | null>;

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
    const dialogRef = this.matDialog.open(DialogsCoursesComponent, {});

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.loadingInProcess = true;
          this.coursesService.addCourses(value).subscribe({
            next: (course: courses) => {
              this.coursesDataSource.push(course);
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
          this.coursesService.editCoursesById(editingCourse.id, value)
          .subscribe({
            next: (course) => {
              this.coursesDataSource = this.coursesDataSource.map(c => c.id === course.id ? course : c);
            },
            error: (err) => {
              console.error('Error al editar el curso', err);
            }
          });
        }
      }
    });
  }

  deleteCourse(id: string) {
    this.loadingInProcess = true;
    if (confirm('Confirma borrado de curso?')) {
      this.coursesService.deleteCourseById(id)
      .pipe(
        tap(() => this.loadingCourses())
      )
      .subscribe({
        error: (err) => {
          console.error('Error al borrar el curso', err);
        },
        complete: () => {
          alert('curso borrado correctamente');
          this.loadingInProcess = false;
        }
      });
    }
  }
}
