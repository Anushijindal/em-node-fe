import { Routes } from '@angular/router';
// import { UpdateProfileComponent } from "../update-profile/update-profile.component";
import { MyProfileComponent } from './my-profile.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

export const routes: Routes = [
  {
    path: 'my-profile',
    // component: MyProfileComponent,
    children: [
      {
        path: '',
        component: MyProfileComponent,
      },
      {
        path: 'updateProfile',
        component: UpdateProfileComponent,
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
      },
    ],
  },
];
