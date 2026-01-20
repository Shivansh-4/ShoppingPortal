import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if(!token){
    sessionStorage.clear();
    alert('You need to login in order to perform this action.')
    router.navigate(['/login']);
    return false;
  }

  return true;
};
