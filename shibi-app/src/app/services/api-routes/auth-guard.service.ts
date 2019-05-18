import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService: UserService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.getAuthUser()) {
      //noinspection TsLint
      let networkStatus = navigator.onLine ? true : false;
      if (!networkStatus) {
        this.userService.logout();
      }
      return true;
    } else {
      return false;
    }
  }

}
