import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs-students',
  templateUrl: './dialogs-students.component.html',
  styleUrl: './dialogs-students.component.scss'
})
export class DialogsStudentsComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef <DialogsStudentsComponent>
  ) {
    this.studentForm = this.fb.group({
      studentName:[null, Validators.required],
      inDate: [null, Validators.required],
    });
  }

  onSave(): void {
    if(this.studentForm.value){
      console.log(this.studentForm.value);
      this.matDialogRef.close(this.studentForm.value);
    }
  }
}