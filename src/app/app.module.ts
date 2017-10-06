import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import {AuthGuardService} from "./auth-guard.service";
import {GuestGuardService} from "./guest-guard.service";
import {CustomConfig, Ng2UiAuthModule} from "ng2-ui-auth";
import {FormsModule} from "@angular/forms";

export class AuthConfig extends CustomConfig {
    defaultHeaders = {"Content-Type": 'application/json'};
    loginUrl = 'http://localhost/hackathon_api/auth';
    authHeader = "auth";
}


const routes: Routes = [
  {
    path: "",
    component:  HomeComponent,
      canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent,
      canActivate: [GuestGuardService]
  },
    {
        path: "contact",
        component: ContactComponent,
        canActivate: [GuestGuardService]
    }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
    RouterModule.forRoot(routes),
    Ng2UiAuthModule.forRoot(AuthConfig),
  ],
  providers: [AuthGuardService, GuestGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }