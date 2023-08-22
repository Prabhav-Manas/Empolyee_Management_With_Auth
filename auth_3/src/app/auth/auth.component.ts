import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../appInterface/auth-response.interface';
import { Router } from '@angular/router';
// import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: any = FormGroup;
  auth: boolean = true;
  isLogInMode: boolean = true;
  error: any;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) // private _socialAuthService: SocialAuthService
  {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this._authService.user.subscribe((res) => {
      if (res) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    this.auth = true;
    console.log(this.authForm.value);

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    if (this.isLogInMode) {
      authObs = this._authService.signIn(email, password);
      this.router.navigate(['/dashboard']);
    } else {
      authObs = this._authService.signUp(email, password);
      this.router.navigate(['/dashboard']);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
      },
      (errMessage) => {
        console.log(errMessage);
        this.error = true;
        this.error = errMessage;
      }
    );

    this.authForm.reset();
  }

  onGoogleSignIn() {
    // this._socialAuthService
    //   .signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then((res) => {
    //     console.log(res);
    //   });
  }
}
