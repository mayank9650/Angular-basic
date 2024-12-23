import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = false;
  @ViewChild('authForm') authForm: NgForm;

  onModeSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmit(){
    console.log('auth', this.authForm)
  }
}
