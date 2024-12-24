import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient) {}

  signUp({ email, password }) {
    return this.httpClient
      .post<SignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAs3Zgr7ywOjnXf2h9A1Nw8DgEiiT1e8xM

`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  logIn({ email, password }) {
    return this.httpClient
      .post<SignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAs3Zgr7ywOjnXf2h9A1Nw8DgEiiT1e8xM

`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError((errorRes) => this.handleError(errorRes)));
  }

  private handleError(errorRes) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists!';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Please check email id or password.';
        break;
    }
    return throwError(errorMessage);
  }
}
