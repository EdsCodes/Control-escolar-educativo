import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private notifier: NotificationService) {
    this.loginForm = this.fb.group({
      email: ['edleemhuis@gmail.com', [Validators.required, Validators.email]],
      password: ['Edleemhuis123**', [Validators.required, Validators.minLength(5)]],
      token: [Validators.required]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      this.notifier.showWarningNotification('Por favor ingrese datos válidos en el formulario');
    } else {
      const data = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.authService.login(data);
    }
  }
}