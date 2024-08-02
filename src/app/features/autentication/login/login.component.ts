import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['test@user.com', [Validators.required, Validators.email]],
      password: ['1234567', [Validators.required, Validators.minLength(5)]],
      role: ['ADMIN', [Validators.required]],
    });
  }

  onSubmit() {
    if(this.loginForm.invalid){
      alert('Por favor verifique el formulario, no es válido')
    } else {
      this.authService.login();
    }
  }
}