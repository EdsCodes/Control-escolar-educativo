import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { courses } from '../../../../../shared/models/courses';

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
    @Inject(MAT_DIALOG_DATA) private editingCourse: courses
  ) {
    this.courseForm = this.fb.group({
      idCurso: [{ value: editingCourse.idCurso || null, disabled: true }, Validators.required],
      nombreCurso: [editingCourse.nombreCurso || '', [Validators.required, Validators.minLength(3)]],
      fechaInicioCurso: [editingCourse.fechaInicioCurso || '', Validators.required],
      fechaFinCurso: [editingCourse.fechaFinCurso || '', Validators.required]
    });

    if (this.editingCourse) {
      this.courseForm.patchValue(this.editingCourse);
    }
   }

  onSave(): void {
    if(this.courseForm.valid){
      console.log(this.courseForm.value);
      this.matDialogRef.close(this.courseForm.value);
      const formValue = this.courseForm.getRawValue();
      this.matDialogRef.close(formValue);
    } else {
      this.markFormGroupTouched(this.courseForm);
      alert("Por favor, introduzca datos válidos.");
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