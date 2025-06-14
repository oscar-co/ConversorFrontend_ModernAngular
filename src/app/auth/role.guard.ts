import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  console.log("Is logged In: ", auth.isLoggedIn );
  if (auth.isLoggedIn() && auth.isAdmin()) {
    return true;
  }

  return router.parseUrl('/access-denied'); // o '/login' 
};