import { AuthGuard } from './auth.guard';
import { SharedModule } from './../shared/shared.module';
import { AuthComponent } from './auth.component';
import { authRouting } from './auth.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    authRouting
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    UserProfileComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
