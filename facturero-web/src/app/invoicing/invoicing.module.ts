import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../app.module';

import { InvoicingRoutes } from './invoicing.routing';
import { ProductListComponent } from '../admin/product/product-list.component';
import { SearchProductComponent } from '../admin/searchproduct/search-product.component';
import { ProductUpdateComponent } from '../admin/product/product-update.component';
import { EstablishmentComponent } from '../admin/establishment/establishment.component';
import { EstablishmentUpdateComponent } from '../admin/establishment/establishment-update.component';
import { BranchComponent } from '../admin/branch/branch.component';
import { BranchUpdateComponent } from '../admin/branch/branch-update.component';
import { BranchResolver } from '../core/service/branch.resolver';
import { BranchService } from '../core/service/branch.service';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { EstablishmentService } from '../core/service/establishment.service';
import { ProductResolver } from '../core/service/product.resolver';
import { ProductService } from '../core/service/product.service';
import { UserComponent } from '../admin/users/user.component';
import { UserResolver } from '../core/service/user.resolver';
import { CustomerComponent } from '../admin/customer/customer.component';
import { CustomerUpdateComponent } from '../admin/customer/customer-update.component';
import { SearchCustomerComponent } from '../admin/searchcustomer/search-customer.component';
import { UserUpdateComponent } from '../admin/users/user-update.component';
import { AddCustomerComponent } from '../admin/addcustomer/add-customer.component';
import { CustomerResolver } from '../core/service/customer.resolver';
import { InvoiceComponent } from './invoice/invoice.component';
import { QueryInvoicingComponent } from '../admin/queryinvocing/queryinvoicing.component';
import { ProductCategoryComponent } from '../admin/product-category/product-category.component';
import { ProductCategoryListComponent } from '../admin/product-category/product-category-list.component';
import { ProductCategoryResolver } from '../core/service/product-category.resolver';
import { TaxValueComponent } from '../admin/tax-value/tax-value.component';
import { TaxValueResolver } from '../core/service/tax.value.resolver';
import { TaxValueListComponent } from '../admin/tax-value/tax-value-list.component';
import { SharedUtilityModule } from '../shared-utility/shared-utility.module';
import { SearchBranchComponent } from '../admin/search-branch/search-branch.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InvoicingRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedUtilityModule
  ],
  declarations: [
    ProductListComponent,
    ProductUpdateComponent,
    SearchProductComponent,
    EstablishmentComponent,
    EstablishmentUpdateComponent,
    BranchComponent,
    BranchUpdateComponent,
    CustomerComponent,
    CustomerUpdateComponent,
    SearchCustomerComponent,
    AddCustomerComponent,
    UserComponent,
    UserUpdateComponent,
    QueryInvoicingComponent,
    InvoiceComponent,
    ProductCategoryComponent,
    ProductCategoryListComponent,
    TaxValueComponent,
    TaxValueListComponent,
    SearchBranchComponent
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductCategoryResolver,
    EstablishmentService,
    EstablishmentResolver,
    BranchService,
    BranchResolver,
    CustomerResolver,
    UserResolver,
    TaxValueResolver
  ],
  entryComponents: [
    SearchProductComponent,
    SearchCustomerComponent,
    SearchBranchComponent,
    AddCustomerComponent
  ]
})

export class InvoicingModule { }
