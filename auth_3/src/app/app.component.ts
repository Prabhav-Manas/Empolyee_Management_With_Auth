import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'auth_3';

  isLoggedIn: boolean = false;
  profileInfoData: any;

  constructor(private _authService: AuthService) {}
  ngOnInit() {
    this._authService.user.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this._authService.profileInfoData.subscribe((res) => {
      this.profileInfoData = res;
    });

    this._authService.autoSignIn();
  }

  onLogout() {
    this._authService.signOut();
  }
}
