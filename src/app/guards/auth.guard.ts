import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

export const authGuard:CanActivateFn = (route:ActivatedRouteSnapshot) => {
  let user = null;
  const router = inject(Router);
  const authService = inject(AuthService);
  if(authService.isBrowser()){
  user = localStorage.getItem('auth_user');
  }


  //  const allowedRoles = route.data?.['roles'] as string [];
  //   if (!role || (allowedRoles && !allowedRoles.includes(role))) {
  //   router.navigate(['/dashboard']); // or redirect to dashboard
  //   return false;
  //   }
  if (!user) {
    router.navigate(['/login']);
    return false;
  } else{
    return true;
  }
  

};
