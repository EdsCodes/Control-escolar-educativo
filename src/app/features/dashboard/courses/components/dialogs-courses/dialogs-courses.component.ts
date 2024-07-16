import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs-courses',
  templateUrl: './dialogs-courses.component.html',
  styleUrl: './dialogs-courses.component.scss'
})
export class DialogsCoursesComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef <DialogsCoursesComponent>
  ) {
    this.courseForm = this.fb.group({
      courseName:[null, Validators.required],
      startDate: [],
      endDate: [],
    });
  }

  onSave(): void {
    
    if(this.courseForm.value){
      console.log(this.courseForm.value);
      this.matDialogRef.close(this.courseForm.value);
    }
  }
}



