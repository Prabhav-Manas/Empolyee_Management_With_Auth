import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private _authService: AuthService) {}
  ngOnInit() {
    this._authService.user.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        // this.router.navigate(['']);
      }
    });

    this._authService.autoSignIn();
  }

  onEmployeeDashboard() {
    this.router.navigate(['/employee-dashboard']);
  }
}
