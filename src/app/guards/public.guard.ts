import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const storage=inject(StorageService);
  const profileToken=storage.profileToken();
  if(!profileToken){
  return true;
  }
  router.navigate(["/my-profile"]);
  return false;
};
