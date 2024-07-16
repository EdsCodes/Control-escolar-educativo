import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { studentsInterface } from '../studentsInterface';

@Component({
  selector: 'app-dialogs-students',
  templateUrl: './dialogs-students.component.html',
  styleUrl: './dialogs-students.component.scss'
})
export class DialogsStudentsComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef <DialogsStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) private editingStudent?: studentsInterface
  ) {
    this.studentForm = this.fb.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      fechaNacimiento: [null, Validators.required],
      celular: [null, Validators.required],
      direccion: [null, Validators.required],
      curso: [null, Validators.required]
    });
  }

  // if (this.editingStudent) {
  //   this.studentForm.patchValue(this.editingStudent)
  // }

  onSave(): void {
    if(this.studentForm.value){
      console.log(this.studentForm.value);
      this.matDialogRef.close(this.studentForm.value);
    }
  }
}