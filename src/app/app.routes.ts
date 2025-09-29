import { LoginComponent } from './features/auth/login/login.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { MyProfileComponent } from './features/user/my-profile/my-profile.component';
import { AddWorkPermitComponent } from './features/work-permits/add-work-permit/add-work-permit.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { WorkPermitWrapperComponent } from './features/work-permits/work-permit-wrapper/work-permit-wrapper.component';
import { HomeComponent } from './features/home/home/home.component';

// Replace with your component

 export const routes: Routes = [
  // Redirect root to login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'forgotPassword', component: ResetPasswordComponent },
      { path: 'signup', component: SignupComponent},

    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild:[authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UserListComponent, data: { roles: ['admin'] }},
      { path: 'work-permit', component: AddWorkPermitComponent, data: { roles: ['pm_fm'] } },
      { path:'my-profile', component:MyProfileComponent, data: { roles: ['pm_fm'] }},
    ]
  },
 
  { path: '**', redirectTo: 'login' }
];

