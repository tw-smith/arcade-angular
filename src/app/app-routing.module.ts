import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ForgottenPasswordComponent} from "./forgotten-password/forgotten-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/forgottenpassword', component: ForgottenPasswordComponent},
  { path: 'auth/resetpassword', component: ResetPasswordComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
