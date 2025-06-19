import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
 
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get token and auth status
  const token = authService.getToken();
  const isLoggedIn = authService.isLoggedIn();
  
  if (!isLoggedIn) {
   ;
    
    
    const navigationPromise = router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    
    
   
    navigationPromise.then(
      (success) => {
        console.log(' [AuthGuard] Navigation result:', success);
      },
      (error) => {
        console.error(' [AuthGuard] Navigation error:', error);
      }
    );
    
   
    return false;
  }
  
 
  return true;
};