import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = false;
  @ViewChild('authForm') authForm: NgForm;
  isLoading = false;
  error = null;

  constructor(private authServie: AuthServiceService) {}

  onModeSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    console.log('auth', this.authForm);
    const formValues = this.authForm.value;
    this.isLoading = true;
    this.authServie
      .signUp({
        email: formValues.email,
        password: formValues.password,
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.error = error;
        },
      });
    this.authForm.reset();
  }
}
