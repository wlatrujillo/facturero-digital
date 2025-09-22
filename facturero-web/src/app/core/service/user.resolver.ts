import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../model/user";
import { UserService } from "./user.service";

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        if (route.params['_id'])
            return this.userService.getById(route.params['_id']);
        else
            return this.userService.getProfileInfo();
    }

}