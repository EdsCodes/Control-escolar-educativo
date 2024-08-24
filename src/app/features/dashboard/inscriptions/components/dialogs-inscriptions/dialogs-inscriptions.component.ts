import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inscriptions } from '../../../../../shared/models/inscriptions';
import { NotificationService } from '../../../../../core/services/notifications.service';

@Component({
  selector: 'app-dialogs-inscriptions',
  templateUrl: './dialogs-inscriptions.component.html',
  styleUrl: './dialogs-inscriptions.component.scss'
})
export class DialogsInscriptionsComponent {
  inscriptionsForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<DialogsInscriptionsComponent>,
    private notifier: NotificationService,
    @Inject(MAT_DIALOG_DATA) private editingInscriptions: inscriptions | null
  ) {
    this.inscriptionsForm = this.fb.group({
      Id: [{ value: editingInscriptions?.id || null, disabled: true }, Validators.required],
      studentId: [editingInscriptions?.studentId || '', Validators.required],
      courseId: [editingInscriptions?.courseId || '', Validators.required],
    });
  
    if (editingInscriptions) {
      this.inscriptionsForm.patchValue(editingInscriptions);
    }
  }
  
  onSave(): void {
    if (this.inscriptionsForm.valid) {
      const formValue = this.inscriptionsForm.getRawValue();
      this.matDialogRef.close(formValue);
    } else {
      this.markFormGroupTouched(this.inscriptionsForm);
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
