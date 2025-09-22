import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Customer } from "../model/customer";
import { CustomerService } from "./customer.service";

@Injectable()
export class CustomerResolver implements Resolve<Customer> {

    constructor(private customerService: CustomerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer> {
        return this.customerService.getById(route.params['_id']);
    }

}