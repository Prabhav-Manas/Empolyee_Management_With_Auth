import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
// } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    AboutComponent,
    EmployeeDetailsComponent,
    AuthComponent,
    DashboardComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    // SocialLoginModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('clientId'),
    //       },
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     },
    //   } as SocialAuthServiceConfig,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
