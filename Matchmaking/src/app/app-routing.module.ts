import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NewUserProfileComponent } from './components/new-user-profile/new-user-profile.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,

  },
  {
    path: 'signup', component: SignUpComponent,

  },
  {
    path: 'profile', component: NewUserProfileComponent,

  },
  {
    path: 'request-password-reset', component: RequestResetComponent,

  }, {
    path: 'response-password-reset', component: ResponseResetComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
