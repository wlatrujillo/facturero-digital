import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProductCategory } from "../model/product-category";
import { ProductCategoryService } from "./product-category.service";

@Injectable()
export class ProductCategoryResolver implements Resolve<ProductCategory> {

    constructor(private productCategoryService: ProductCategoryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductCategory> {
        return this.productCategoryService.getById(route.params['_id']);
    }

}