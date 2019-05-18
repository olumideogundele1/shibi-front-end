import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiHandlerService} from "../api-handler.service";
import {UserService} from "../user.service";

@Injectable()
export class PasswordService {

  private password = environment.API_URL.password;

  constructor( private apiService: ApiHandlerService,
              private userService: UserService) {
  //  this.authUser = this.userService.getAuthUser();
  }

  /**
   * This is used to reset a user's password
   * @param data
   * @returns {Observable<any>}
   */
  forgotPassword(data) {
    return this.apiService.put(`${this.password}/reset`, data);
  }

  /**
   * This is used to change a user's password
   * @param data
   * @returns {Observable<any>}
   */
  changePassword(data) {
    return this.apiService.put(`${this.password}/updateUserPassword`, data);
  }
}
