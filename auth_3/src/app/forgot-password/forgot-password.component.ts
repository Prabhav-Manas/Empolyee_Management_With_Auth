import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: any = FormGroup;
  forgotPassFormData: any;
  error = '';
  success: boolean = false;

  constructor(private fb: FormBuilder, private _authService: AuthService) {
    this.forgotPassForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {}

  onForgotPassword() {
    this.forgotPassFormData = this.forgotPassForm.value;
    console.log(this.forgotPassFormData);

    this._authService
      .forgotPasswordResetWithEmail(this.forgotPassForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.success = true;
        },
        (errRes) => {
          console.log(errRes);
          this.error = errRes;
        }
      );
    this.forgotPassForm.reset();
  }
}
