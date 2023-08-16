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

  constructor(private _authService: AuthService) {}
  ngOnInit() {
    this._authService.userSub.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this._authService.autoSignIn();
  }

  onLogout() {
    this._authService.signOut();
  }
}
