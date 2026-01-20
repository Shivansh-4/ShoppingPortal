  import { inject } from '@angular/core';
  import { CanActivateFn, Router } from '@angular/router';

  export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const role = sessionStorage.getItem('role');

    if(role !== 'Admin'){
      window.alert('You need to admin rights to perform this action.')
      router.navigate(['/products']);
      return false;
    }

    return true;
  };
