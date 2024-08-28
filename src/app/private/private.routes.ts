import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
];
