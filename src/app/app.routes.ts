import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';

export const routes: Routes = [
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"signup",
        component:SignupComponent
    }
];
