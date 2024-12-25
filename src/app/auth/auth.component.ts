import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService, SignUpResponse } from './auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';

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

  constructor(private authServie: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authServie.userSubject.subscribe({
      next: (user) => {
        console.log('user', user);
      },
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onModeSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit() {
    console.log('auth', this.authForm);
    const formValues = this.authForm.value;
    this.isLoading = true;
    let authObs: Observable<SignUpResponse>;
    if (this.isLoginMode) {
      authObs = this.authServie.logIn({
        email: formValues.email,
        password: formValues.password,
      });
    } else {
      authObs = this.authServie.signUp({
        email: formValues.email,
        password: formValues.password,
      });
    }
    authObs.subscribe({
      next: (response) => {
        console.log('response', response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
    });
    this.authForm.reset();
  }
}
