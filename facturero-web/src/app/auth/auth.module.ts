import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutes } from './auth.routing';
import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './pricing/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from "./resetpassword/resetpassword.component";
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { LoginCompanyComponent } from './login-company/login-company.component';


@NgModule({
  //importación de módulos
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  //declara los componentes o pantallas 
  declarations: [
    LoginComponent,
    RegisterComponent,
    PricingComponent,
    LockComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ActivateAccountComponent,
    UpdatePasswordComponent,
    LoginCompanyComponent
  ]
})

export class AuthModule { }
