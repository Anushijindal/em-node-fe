import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const profileToken = storage.profileToken();
  if(profileToken){
    // router.navigate(["my-profile"]);
    return true;
  }
  router.navigate(['login']);
  return false;
};
