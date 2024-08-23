import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { HeaderComponent } from './private/header/header.component';
import { SidebarComponent } from './private/sidebar/sidebar.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { authGuard } from './guards/private.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent, canActivate: [publicGuard]
    },
    {
        path:"signup",
        component:SignupComponent, canActivate: [publicGuard]
    },
    {
        path: '',
        loadChildren: () =>
          import('./private/private.routes').then((m) => m.routes),
        canActivate: [authGuard],
      },
];
