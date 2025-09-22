import { Routes } from '@angular/router';
import { CompanyResolver } from '../core/service/company.resolver';
import { UserResolver } from '../core/service/user.resolver';
import { CompanyComponent } from './company.component';

import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pages/user',
        component: UserComponent,
        resolve: {
          user: UserResolver
        }
      },
      {
        path: 'pages/company',
        component: CompanyComponent,
        resolve: {
          company: CompanyResolver
        }
      }
    ]
  }
];
