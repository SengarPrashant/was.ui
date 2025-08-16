import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.getUser();
  // const role = user?.roleName || ''
  // const allowedRoles = route.data?.['roles'] as string[];
  // if (!role || (allowedRoles && !allowedRoles.includes(role))) {
  //   router.navigate(['/dashboard']); // or redirect to dashboard
  //   return false;
  // }

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
