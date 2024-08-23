import { Injectable } from '@angular/core';
import { httpService } from './httpServices.service';
import { BehaviorSubject } from 'rxjs';

interface UserProfile {
  firstName: string;
  lastName: string;
  userRole: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userProfile = new BehaviorSubject<UserProfile>({
    firstName: '',
    lastName: '',
    userRole: '',
  });
  userProfileObservable = this.userProfile.asObservable();
  constructor(private httpService: httpService) {}
  userProfileData() {
    return this.httpService.myProfile();
  }

  setProfile(userProfile: UserProfile) {
    this.userProfile.next({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userRole: userProfile.userRole,
    });
  }
}
