import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { authGuard } from './guards/private.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [publicGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [publicGuard],
  },
  {
    path: '',
    redirectTo: 'my-profile',
    pathMatch:'full'
  },
  {
    path: 'my-profile',
    loadChildren: () =>
      import('./private/private.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
];
