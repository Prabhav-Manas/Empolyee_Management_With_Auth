import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthComponent } from './auth/auth.component';

import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/no-auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, canActivate: [NoAuthGuard] },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent },
  { path: 'employee-details/:empId', component: EmployeeDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
