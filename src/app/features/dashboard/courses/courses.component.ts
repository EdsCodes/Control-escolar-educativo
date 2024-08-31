import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogsCoursesComponent } from './components/dialogs-courses/dialogs-courses.component';
import { courses } from '../../../shared/models/courses';
import { CoursesService } from '../../../core/services/courses.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../../shared/models/users';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notifications.service';

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

  constructor(private matDialog: MatDialog, private coursesService: CoursesService, private authService: AuthService, private notifier: NotificationService) {
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
      error: () => {
        this.notifier.showErrorNotification('Error al cargar los cursos');
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
            error: () => {
              this.notifier.showErrorNotification('Error al agregar el curso');
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
            error: () => {
              this.notifier.showErrorNotification('Error al editar el curso');
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
        error: () => {
          this.notifier.showErrorNotification('Error al borrar el curso');
        },
        complete: () => {
          this.notifier.showSuccessNotification('Curso borrado correctamente')
          this.loadingInProcess = false;
        }
      });
    } else {
      this.loadingInProcess = false;
    }
  }
}
