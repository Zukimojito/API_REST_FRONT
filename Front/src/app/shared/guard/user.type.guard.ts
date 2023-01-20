import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {
  constructor(private router: Router, private AuthService: AuthService,) { }
  role: any = 0;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // Get the required user type from the route data
    const requiredUserType = route.data['userType'];

    // Get the current user type from the session or local storage

    return this.AuthService.getUser().pipe(
      map((res) => res.role),
      tap((role) => {
        // console.log('currentUserType: ' + role);
        // console.log('requiredUserType: ' + requiredUserType);
      }),
      map((currentUserType) => requiredUserType === currentUserType)
    );
  }
}

