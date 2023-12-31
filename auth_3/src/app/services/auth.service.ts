import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../appInterface/auth-response.interface';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { PasswordChange } from '../models/password-change.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  profileInfoData = new BehaviorSubject({
    displayName: '',
    email: '',
    photoUrl: '',
  });

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res: any) => {
          this.authenticatedUser(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    console.log('User', this.user);
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res: any) => {
          this.authenticatedUser(
            res.email,
            res.localId,
            res.idToken,
            +res.expiresIn
          );
        })
      );
  }

  autoSignIn() {
    const userData = localStorage.getItem('UserData');
    console.log('UserDATA==> ', userData);

    if (userData !== null) {
      const parsedData = JSON.parse(userData);
      const loadedUser = new User(
        parsedData.email,
        parsedData.id,
        parsedData._token,
        new Date(parsedData._tokenExpirationDate)
      );

      this.user.next(loadedUser);

      const expirationDuration =
        new Date(parsedData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoSignOut(expirationDuration);
      // this.getUserProfileData(loadedUser._token)
    }
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    localStorage.removeItem('UserData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  private handleError(errRes: HttpErrorResponse) {
    let errMessage = 'An unknown error occured';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errMessage);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'Email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'Invalid Password';
        break;
    }
    return throwError(errMessage);
  }

  private authenticatedUser(
    email: string,
    userId: string,
    _token: string,
    expiresIn: any
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, _token, expirationDate);
    console.log(user);

    this.user.next(user);
    this.autoSignOut(expiresIn * 1000);
    localStorage.setItem('UserData', JSON.stringify(user));

    this.getUserProfileData(_token);
  }

  updateProfile(data: any) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
        {
          idToken: data.token,
          displayName: data.name,
          photoUrl: data.profileImg,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  getUserProfileData(token: any) {
    this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
        {
          idToken: token,
        }
      )
      .subscribe((res) => {
        this.profileInfoData.next({
          displayName: res.users[0].displayName,
          email: res.users[0].email,
          photoUrl: res.users[0].photoUrl,
        });
      });
  }

  changePassword(data: PasswordChange) {
    return this.http
      .post<PasswordChange>(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
        {
          idToken: data.idToken,
          password: data.password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  forgotPasswordResetWithEmail(data: any) {
    return this.http
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
        {
          requestType: 'PASSWORD_RESET',
          email: data.email,
        }
      )
      .pipe(catchError(this.handleError));
  }

  googleSignin(idToken: any) {
    // return this.http.post(
    //   'https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=AIzaSyCCQL3QufqmFf5S2nps9CJUrN0rnwpc0Gg',
    //   {
    //     postBody: `id_token=${idToken}&providerId=google.com`,
    //     requestUri: 'http://localhost:4200/',
    //     returnIdpCredential: true,
    //     returnSecureToken: true,
    //   }
    // );
  }
}
