import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TaxValue } from "../model/tax-value";
import { TaxValueService } from "./tax-value.service";

@Injectable()
export class TaxValueResolver implements Resolve<TaxValue> {

    constructor(private taxValueService: TaxValueService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TaxValue> {
        return this.taxValueService.getById(route.params['_id']);
    }

}