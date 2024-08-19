import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { courses } from '../../../../../shared/models/courses';
import { NotificationService } from '../../../../../core/services/notifications.service';

@Component({
  selector: 'app-dialogs-courses',
  templateUrl: './dialogs-courses.component.html',
  styleUrl: './dialogs-courses.component.scss'
})
export class DialogsCoursesComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<DialogsCoursesComponent>,
    private notifier: NotificationService,
    @Inject(MAT_DIALOG_DATA) private editingCourse: courses
  ) {
    this.courseForm = this.fb.group({
      id: [{ value: (editingCourse && editingCourse.id) || null, disabled: true }, Validators.required],
      nombreCurso: [editingCourse?.nombreCurso || '', [Validators.required, Validators.minLength(2)]],
      dateRange: this.fb.group({
        fechaInicioCurso: [editingCourse?.fechaInicioCurso || '', Validators.required],
        fechaFinCurso: [editingCourse?.fechaFinCurso || '', Validators.required]
      })
    });
  

    if (this.editingCourse) {
      this.courseForm.patchValue({
        id: this.editingCourse.id,
        nombreCurso: this.editingCourse.nombreCurso,
        dateRange: {
          fechaInicioCurso: new Date(this.editingCourse.fechaInicioCurso),
          fechaFinCurso: new Date(this.editingCourse.fechaFinCurso)
        }
      });
    }
  }

  onSave(): void {
    if (this.courseForm.valid) {
      const formValue = {
        ...this.courseForm.value,
        fechaInicioCurso: this.courseForm.get('dateRange')?.get('fechaInicioCurso')?.value,
        fechaFinCurso: this.courseForm.get('dateRange')?.get('fechaFinCurso')?.value
      };
      this.matDialogRef.close(formValue);
    } else {
      this.markFormGroupTouched(this.courseForm);
      this.notifier.showNotification('Por favor, introduzca datos válidos.');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    this.matDialogRef.close(null);
  }
}