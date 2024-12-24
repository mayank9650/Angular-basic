import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

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

  userSubject =  new Subject<User>();

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
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap(this.authHandler)
      );
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
      .pipe(
        catchError((errorRes) => this.handleError(errorRes)),
        tap((res) => this.authHandler(res))
      );
  }

  private authHandler(responseData: SignUpResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +responseData.expiresIn * 1000
    );
    const user = new User(
      responseData.email,
      responseData.localId,
      responseData.idToken,
      expirationDate
    );
    this.userSubject.next(user);
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