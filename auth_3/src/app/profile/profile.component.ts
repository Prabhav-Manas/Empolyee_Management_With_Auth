import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: any = FormGroup;
  profileFormData: any;
  editMode: boolean = false;
  updateProfileFormData: any;

  profileInfoData: any;

  // Its the same token from localstorage in 'user' auth.service.ts
  userData = localStorage.getItem('UserData');
  parsedDATA: any;
  // Its the same token from localstorage in 'user' auth.service.ts

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      profileImg: new FormControl('', [Validators.required]),
    });

    // For getting user token as used in auth.service.ts
    if (this.userData !== null) {
      this.parsedDATA = JSON.parse(this.userData);
    }
    console.log('USER_DATA==>', this.parsedDATA._token);
    // For getting user token as used in auth.service.ts
  }

  ngOnInit() {
    this._activatedRoute.queryParamMap.subscribe((res) => {
      // console.log(res.get('EditMode'));
      let qParam = res.get('EditMode');
      if (qParam != null) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });

    this._authService.profileInfoData.subscribe((res) => {
      this.profileInfoData = res;

      this.profileForm.setValue({
        name: res.displayName,
        profileImg: res.photoUrl,
      });
    });
  }

  onProfileSubmit() {
    this.profileFormData = this.profileForm.value;
    this.profileForm.reset();
    // console.log(this.profileFormData);

    // const updateProfileFormData = this.profileForm.value;
    // console.log('updateProfileFormData ==> ', this.profileFormData);
    this.updateProfileFormData = {
      token: this.parsedDATA._token,
      ...this.profileFormData,
    };

    this._authService.updateProfile(this.updateProfileFormData).subscribe(
      (res: any) => {
        console.log(res);
        this._authService.getUserProfileData(this.parsedDATA._token);
      },
      (errRes: any) => {
        console.log(errRes);
      }
    );
  }

  onDiscard() {
    // this.profileForm.reset();
    this.router.navigate([], { queryParams: { EditMode: null } });
  }
}
