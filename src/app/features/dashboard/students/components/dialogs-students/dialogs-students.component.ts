import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { studentsInterface } from '../../../../../shared/studentsInterface';

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
    @Inject(MAT_DIALOG_DATA) private editingStudent: studentsInterface
  ) {
    this.studentForm = this.fb.group({
      nombre: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      celular: [null, Validators.required],
      direccion: [null, Validators.required],
      curso: [null, Validators.required]
    });

    if (this.editingStudent) {
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  emptySpaceValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const isEmptySpace = (control.value || '').trim().length === 0;
    return isEmptySpace ? { 'emptySpace': true } : null;
  }

    onSave(): void {
    if(this.studentForm.valid){
      console.log(this.studentForm.value);
      this.matDialogRef.close(this.studentForm.value);
    } else {
      this.markFormGroupTouched(this.studentForm);
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
    this.matDialogRef.close(null); // Close with null data
  }
}