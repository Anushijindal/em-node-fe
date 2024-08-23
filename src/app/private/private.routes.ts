import { Routes } from '@angular/router';
// import { MyProfileComponent } from '../private/my-profile/my-profile.component';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmTableComponent } from '../common/components/ui/em-table/em-table.component';

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
        path: 'user-list',
        component: EmTableComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
