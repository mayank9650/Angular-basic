import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  @ViewChild('authForm') authForm: NgForm;
  isLoading = false;
  error = null;
  userSub: Subscription;

  constructor(private authServie: AuthServiceService) {}

  ngOnInit(): void {
    this.userSub = this.authServie.userSubject.subscribe({next: (user) => {
      console.log('user', user)
    }})
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onModeSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    console.log('auth', this.authForm);
    const formValues = this.authForm.value;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authServie
        .logIn({
          email: formValues.email,
          password: formValues.password,
        })
        .subscribe({
          next: (response) => {
            console.log('response', response)
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
            this.error = error;
          },
        });
    } else {
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
    }
    this.authForm.reset();
  }
}
