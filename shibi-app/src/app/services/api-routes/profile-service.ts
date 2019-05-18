/**
 * Created by User on 19/06/2018.
 */

import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiHandlerService} from "../api-handler.service";
import {UserService} from "../user.service";

@Injectable()
export class ProfileService {
  private authUser: any;
  private apiDefaultUrl = environment.API_URL;
  private logIn = environment.API_URL.auth;
  private logOut = environment.API_URL.authOut;

  constructor(private ApiHandler: ApiHandlerService,
              private userService: UserService) {
      this.authUser = this.userService.getAuthUser();
  }

  /**
   * This is used to login a user with his/her credentials
   * @param data
   * @returns {Observable<any>}
   */

  login(data) {
    // const path = ` ${this.apiDefaultUrl.auth}${'login'}`;
    // return this.ApiHandler.post(path, data);
    return this.ApiHandler.post(`${this.logIn}`, data);
  }

  /**
   *
   * This is used to logout a user from the system
   * @returns {Observable<any>}
   *
   *
   */
  logout() {
    this.authUser = this.userService.getAuthUser();
    // const path = `${this.apiDefaultUrl.auth}${'user/'}${this.authUser.userId}`;
    return this.ApiHandler.post(`${this.logOut}`);
  }
}
