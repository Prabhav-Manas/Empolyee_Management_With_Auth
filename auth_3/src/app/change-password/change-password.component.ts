import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: any = FormGroup;
  changePasswordData: any;
  success: boolean = false;

  // Its the same token from localstorage in 'user' auth.service.ts
  token = localStorage.getItem('UserData');
  parsedDATA: any;
  // Its the same token from localstorage in 'user' auth.service.ts

  constructor(private _authService: AuthService, private fb: FormBuilder) {
    this.changePassForm = this.fb.group({
      changePassword: new FormControl('', [Validators.required]),
    });

    // For getting user token as used in auth.service.ts
    if (this.token !== null) {
      this.parsedDATA = JSON.parse(this.token);
    }
    console.log('USER_DATA==>', this.parsedDATA._token);
    // For getting user token as used in auth.service.ts
  }

  ngOnInit() {}

  onChangePassword() {
    this.changePasswordData = this.changePassForm.value;

    const data = {
      idToken: this.parsedDATA._token,
      ...this.changePassForm.value,
    };

    console.log('Changed_Password => ', data);

    this._authService.changePassword(data).subscribe(
      (res) => {
        console.log(res);
        if (res.idToken) {
          this.success = true;
          // Optionally update the token in your app if needed
          this.parsedDATA._token = res.idToken;
          this.changePassForm.reset();
        }

        this.success = true;
        this.changePassForm.reset();
      },
      (errRes) => {
        console.log(errRes);
      }
    );
  }
}
