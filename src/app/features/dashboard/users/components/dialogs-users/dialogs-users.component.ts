import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../../../../core/services/notifications.service';
import { User } from '../../../../../shared/models/users';

@Component({
  selector: 'app-dialogs-users',
  templateUrl: './dialogs-users.component.html',
  styleUrl: './dialogs-users.component.scss'
})
export class DialogsUsersComponent {
  hidePassword = true;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private matDialogRef: MatDialogRef<DialogsUsersComponent>,
    private notifier: NotificationService,
    @Inject(MAT_DIALOG_DATA) private editingUser: User
  ) {
    this.userForm = this.fb.group({
      id: [{ value: (editingUser && editingUser.id) || null, disabled: true }, Validators.required],
      firstName: [editingUser?.firstName || '', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: [editingUser?.lastName || '', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: [editingUser?.email || '', [Validators.required, Validators.minLength(10)]],
      password: [editingUser?.password || '', [Validators.required, Validators.minLength(5)]],
      role: [editingUser?.role || '', [Validators.required]],
    });

    if (this.editingUser) {
      this.userForm.patchValue(this.editingUser);
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue(); 
      this.matDialogRef.close(formValue);
    } else {
      this.markFormGroupTouched(this.userForm);
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
