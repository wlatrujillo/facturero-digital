import { Routes } from '@angular/router';
import { ProductResolver } from '../core/service/product.resolver';
import { ProductListComponent } from '../admin/product/product-list.component';
import { ProductUpdateComponent } from '../admin/product/product-update.component'
import { EstablishmentComponent } from '../admin/establishment/establishment.component';
import { EstablishmentUpdateComponent } from '../admin/establishment/establishment-update.component';
import { BranchComponent } from '../admin/branch/branch.component';
import { BranchUpdateComponent } from '../admin/branch/branch-update.component';
import { BranchResolver } from '../core/service/branch.resolver';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { UserResolver } from '../core/service/user.resolver';
import { CustomerComponent } from '../admin/customer/customer.component';
import { CustomerUpdateComponent } from '../admin/customer/customer-update.component';
import { CustomerResolver } from '../core/service/customer.resolver';
import { UserComponent } from '../admin/users/user.component';
import { UserUpdateComponent } from '../admin/users/user-update.component';
import { QueryInvoicingComponent } from '../admin/queryinvocing/queryinvoicing.component';
import { ProductCategoryListComponent } from '../admin/product-category/product-category-list.component';
import { ProductCategoryComponent } from '../admin/product-category/product-category.component';
import { ProductCategoryResolver } from '../core/service/product-category.resolver';
import { TaxValueListComponent } from '../admin/tax-value/tax-value-list.component';
import { TaxValueComponent } from '../admin/tax-value/tax-value.component';
import { TaxValueResolver } from '../core/service/tax.value.resolver';

export const AdminRoutes: Routes = [
  {
    path: 'product-category',
    children: [
      { path: '', component: ProductCategoryListComponent },
      { path: 'new', component: ProductCategoryComponent },
      {
        path: ':_id/edit', component: ProductCategoryComponent,
        resolve: {
          productCategory: ProductCategoryResolver
        }
      }]
  },
  {
    path: 'tax-value',
    children: [
      { path: '', component: TaxValueListComponent },
      { path: 'new', component: TaxValueComponent },
      {
        path: ':_id/edit', component: TaxValueComponent,
        resolve: {
          taxValue: TaxValueResolver
        }
      }]
  },
  {
    path: 'product',
    children: [
      { path: '', component: ProductListComponent },
      { path: 'new', component: ProductUpdateComponent },
      {
        path: ':_id/edit', component: ProductUpdateComponent,
        resolve: {
          product: ProductResolver
        }
      }]
  },
  {
    path: 'customer',
    children: [
      { path: '', component: CustomerComponent },
      { path: 'new', component: CustomerUpdateComponent },
      {
        path: ':_id/edit', component: CustomerUpdateComponent,
        resolve: {
          customer: CustomerResolver
        }
      }]
  }, {
    path: 'user',
    children: [
      { path: '', component: UserComponent },
      { path: 'new', component: UserUpdateComponent },
      {
        path: ':_id/edit', component: UserUpdateComponent,
        resolve: {
          user: UserResolver
        }
      }]
  },
  {
    path: 'establishment',
    children: [
      { path: '', component: EstablishmentComponent },
      { path: 'new', component: EstablishmentUpdateComponent },
      {
        path: ':_id/edit', component: EstablishmentUpdateComponent,
        resolve: {
          establishment: EstablishmentResolver
        }
      },
      { path: ':establishmentId/branch', component: BranchComponent },
      { path: ':establishmentId/branch/new', component: BranchUpdateComponent },
      {
        path: ':establishmentId/branch/:branchId/edit', component: BranchUpdateComponent,
        resolve: {
          branch: BranchResolver
        }
      }]
  },
  {
    path: 'query-invoice',
    component: QueryInvoicingComponent
  }
];