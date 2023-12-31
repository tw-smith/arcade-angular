import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {RouterOutlet} from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { SignupComponent } from './signup/signup.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LobbyListComponent } from './lobby-list/lobby-list.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { LobbyDetailComponent } from './lobby-detail/lobby-detail.component';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { GameScreenComponent } from './game-screen/game-screen.component';
import { environment} from "../env/env.prod";

const config: SocketIoConfig = { url: environment.socketUrl,
                                 options: {rememberUpgrade: false,
                                           autoConnect: false}}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeMenuComponent,
    SignupComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    LobbyListComponent,
    LobbyDetailComponent,
    GameScreenComponent
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        SocketIoModule.forRoot(config)
    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
