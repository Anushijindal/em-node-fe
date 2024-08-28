import { Routes } from '@angular/router';
// import { UpdateProfileComponent } from "../update-profile/update-profile.component";
import { MyProfileComponent } from './my-profile.component';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { UpdateProjectComponent } from '../update-project/update-project.component';

export const routes: Routes = [
  {
    path: '',
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
      {
        path: 'projects',
        // component: ProjectListComponent,
        children:[
          {
            path:"add",
            component:AddProjectComponent
          },
          {
            path:"",
            component:ProjectListComponent
          },
          {
            path:"edit/:id",
            component:UpdateProjectComponent
          }
        ]
      },
    ],
  },
];
