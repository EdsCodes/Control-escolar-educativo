import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { students } from '../../../../../shared/models/students';
import { NotificationService } from '../../../../../core/services/notifications.service';

@Component({
  selector: 'app-dialogs-students',
  templateUrl: './dialogs-students.component.html',
  styleUrls: ['./dialogs-students.component.scss']
})
export class DialogsStudentsComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<DialogsStudentsComponent>,
    private notifier: NotificationService,
    @Inject(MAT_DIALOG_DATA) private editingStudent: students
  ) {
    this.studentForm = this.fb.group({
      Id: [{ value: (editingStudent && editingStudent.id) || null, disabled: true }, Validators.required],
      nombre: [editingStudent?.nombre || '', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      apellidos: [editingStudent?.apellidos || '', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]], 
      fechaNacimiento: [editingStudent?.fechaNacimiento || '', Validators.required],
      celular: [editingStudent?.celular || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: [editingStudent?.direccion || '', [Validators.required, Validators.maxLength(50)]],
    });

    if (this.editingStudent) {
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  onSave(): void {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.getRawValue(); 
      this.matDialogRef.close(formValue);
    } else {
      this.markFormGroupTouched(this.studentForm);
      this.notifier.showWarningNotification('Por favor, introduzca datos válidos.');
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
