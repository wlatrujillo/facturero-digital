import { Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            }, {
                path: 'invoicing',
                loadChildren: () => import('./invoicing/invoicing.module').then(m => m.InvoicingModule)
            }, {
                path: '',
                loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
            }
        ]
    }, {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [{
            path: '',
            loadChildren: () => import('./auth/auth.module').then(m => m.PagesModule)
        }]
    }
];
