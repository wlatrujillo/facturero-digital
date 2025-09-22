import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Branch } from "../model/branch";
import { BranchService } from "./branch.service";

@Injectable()
export class BranchResolver implements Resolve<Branch> {

    constructor(private branchService: BranchService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Branch> {
        return this.branchService.getById(route.params['establishmentId'], route.params['branchId']);
    }

}