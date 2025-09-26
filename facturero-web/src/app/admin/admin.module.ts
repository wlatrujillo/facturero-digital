import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutes } from './admin.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../app.module';
import { SharedUtilityModule } from '../shared-utility/shared-utility.module';
import { BranchResolver } from '../core/service/branch.resolver';
import { BranchService } from '../core/service/branch.service';
import { CustomerResolver } from '../core/service/customer.resolver';
import { EstablishmentResolver } from '../core/service/establishment.resolver';
import { EstablishmentService } from '../core/service/establishment.service';
import { ProductCategoryResolver } from '../core/service/product-category.resolver';
import { ProductResolver } from '../core/service/product.resolver';
import { ProductService } from '../core/service/product.service';
import { TaxValueResolver } from '../core/service/tax.value.resolver';
import { UserResolver } from '../core/service/user.resolver';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemComponent } from './catalog/catalog-item.component';
import { CatalogResolver } from '../core/service/catalog.resolver';

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedUtilityModule
  ], 
  providers: [
    ProductService,
    ProductResolver,
    ProductCategoryResolver,
    EstablishmentService,
    EstablishmentResolver,
    CatalogResolver,
    BranchService,
    BranchResolver,
    CustomerResolver,
    UserResolver,
    TaxValueResolver
  ]
})
export class AdminModule { }
