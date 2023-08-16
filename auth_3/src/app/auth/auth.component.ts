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

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: any = FormGroup;
  isLogInMode: boolean = true;
  error: any;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {}

  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit() {
    if (this.authForm.valid) {
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
    }
    this.authForm.reset();
  }
}
