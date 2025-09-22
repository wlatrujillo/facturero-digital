import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserRoutes } from './user.routing';
import { CompanyComponent } from './company.component';
import { UserResolver } from '../core/service/user.resolver';
import { CompanyResolver } from '../core/service/company.resolver';
import { SharedUtilityModule } from '../shared-utility/shared-utility.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule,
        SharedUtilityModule
    ],
    declarations: [UserComponent, CompanyComponent],
    providers: [
        UserResolver,
        CompanyResolver
    ]
})

export class UserModule { }
