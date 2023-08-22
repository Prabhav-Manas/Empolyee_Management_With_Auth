// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { Observable, map, take } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class NoAuthGuard implements CanActivate {
//   constructor(private router: Router, private _authService: AuthService) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> {
//     return this._authService.user.pipe(
//       take(1),
//       map((user) => {
//         if (!user) {
//           return this.router.navigate(['/dashboard'], {
//             replaceUrl: true,
//           });
//         }
//         return this.router.createUrlTree(['']);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _authService: AuthService,
    private location: Location
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._authService.user.pipe(
      take(1),
      map((user) => {
        // if (!user) {
        //   // return this.router.createUrlTree(['/auth'], { replaceUrl: true }); // Change here
        //   this.router.navigateByUrl('/auth').then(() => {
        //     this.location.replaceState(this.router.url);
        //   });
        // }
        return true; // This allows navigation
      })
    );
  }
}
