import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Company } from "../model/company";
import { AdminService } from "./admin.service";

@Injectable()
export class CompanyResolver implements Resolve<Company> {

    constructor(private adminService: AdminService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Company> {
        return this.adminService.getCompany();
    }

}