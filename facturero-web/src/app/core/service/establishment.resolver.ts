import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Establishment } from "../model/establishment";
import { EstablishmentService } from "./establishment.service";

@Injectable()
export class EstablishmentResolver implements Resolve<Establishment> {

    constructor(private EstablishmentService: EstablishmentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Establishment> {
        return this.EstablishmentService.getById(route.params['_id']);
    }

}
