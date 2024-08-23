import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const storage = inject(StorageService);
  const profileToken = storage.profileToken();
  if (profileToken) {
    const userService = inject(UserService);
    userService.userProfileData().subscribe({
      next: (response: any) => {
        userService.setProfile({
          firstName: response?.data?.userFirstName || '',
          lastName: response?.data?.userLastName || '',
          userRole: response?.data?.userRoleName || '',
        });
      },
    });
    return true;
  }
  router.navigate(['login']);
  return false;
};
