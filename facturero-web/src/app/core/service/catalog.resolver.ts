import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Catalog } from "../model/catalog";
import { AdminService } from "./admin.service";

@Injectable()
export class CatalogResolver implements Resolve<Catalog> {

    constructor(private adminService: AdminService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Catalog> {
        return this.adminService.getCatalogByName(route.params['catalogId']);
    }

}