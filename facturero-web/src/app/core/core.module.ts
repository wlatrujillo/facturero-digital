import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './service/user.service';
import { AdminService } from './service/admin.service';
import { InterceptorService } from './interceptor.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [UserService, AdminService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
})
export class CoreModule { }
