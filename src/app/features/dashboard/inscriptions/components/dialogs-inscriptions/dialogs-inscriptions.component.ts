import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inscriptions, Student, Course } from '../../../../../shared/models/inscriptions';
import { NotificationService } from '../../../../../core/services/notifications.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../../core/store';
import { selectInscriptionsStudents, selectInscriptionsCourses } from '../../../../../features/dashboard/inscriptions/store/inscriptions.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialogs-inscriptions',
  templateUrl: './dialogs-inscriptions.component.html',
  styleUrls: ['./dialogs-inscriptions.component.scss']
})
export class DialogsInscriptionsComponent implements OnInit {
  inscriptionsForm: FormGroup;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<DialogsInscriptionsComponent>,
    private notifier: NotificationService,
    private store: Store<RootState>,
    @Inject(MAT_DIALOG_DATA) private editingInscriptions: inscriptions | null
  ) {
    this.inscriptionsForm = this.fb.group({
      studentId: [editingInscriptions?.studentId || '', Validators.required],
      courseId: [editingInscriptions?.courseId || '', Validators.required],
    });

    if (editingInscriptions) {
      this.inscriptionsForm.patchValue(editingInscriptions);
    }

    this.students$ = this.store.select(selectInscriptionsStudents);
    this.courses$ = this.store.select(selectInscriptionsCourses);
  }

  ngOnInit(): void {}
  
  onSave(): void {
    if (this.inscriptionsForm.valid) {
      const formValue = this.inscriptionsForm.getRawValue();
      this.matDialogRef.close(formValue);
    } else {
      this.markFormGroupTouched(this.inscriptionsForm);
      this.notifier.showErrorNotification('Por favor, introduzca datos válidos.');
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
