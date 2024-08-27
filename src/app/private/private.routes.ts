import { Routes } from '@angular/router';
// import { MyProfileComponent } from '../private/my-profile/my-profile.component';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmTableComponent } from '../common/components/ui/em-table/em-table.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

export const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
      {
        path: '',

        // component:MyProfileComponent,
        loadChildren: () =>
          import('./my-profile/my-profile.routes').then((m) => m.routes),
      },
      {
        path: 'projects',
        // component: ProjectListComponent,
        children:[
          {
            path:"add-project",
            component:AddProjectComponent
          },
          {
            path:"",
            component:ProjectListComponent
          },
          {
            path:"update-project/:id",
            component:UpdateProjectComponent
          }
        ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
