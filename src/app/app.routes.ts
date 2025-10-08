import { LoginComponent } from './features/auth/login/login.component';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './shared/guards/auth.guard';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { MyProfileComponent } from './features/user/my-profile/my-profile.component';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password.component';
import { HomeComponent } from './features/home/home/home.component';
import { CreateIncidentRequestComponent } from './features/incident/create-incident-request/create-incident-request.component';
import { CreateRequestComponent } from './shared/components/create-request/create-request.component';
import { CreateWorkPermitRequestComponent } from './features/work-permits/create-work-permit-request/create-work-permit-request.component';

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
      { path: 'work-permit', component: CreateWorkPermitRequestComponent, data: { roles: ['pm_fm'] } },
      { path: 'incident', component: CreateIncidentRequestComponent, data: { roles: ['pm_fm'] } },
      { path:'my-profile', component:MyProfileComponent, data: { roles: ['pm_fm'] }},
    ]
  },
 
  { path: '**', redirectTo: 'login' }
];

