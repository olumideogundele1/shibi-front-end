import { Injectable } from '@angular/core';
import * as Cookies from '../utils/cookies';
import { Router } from '@angular/router';
import { Cache } from '../utils/cache';
import { LogoutTypes } from '../shared/enum/logout.type';
import { DateFormatting } from '../utils/util';
import { ApiHandlerService } from './api-handler.service';
import {NotificationService} from './notification.service';
import { SweetAlertService } from 'ng2-sweetalert2';
import {AppConst} from "../constants/app-const";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";

@Injectable()
export class UserService extends DateFormatting {

  private serverPath: string = AppConst.serverPath;
  private user = environment.API_URL.user;

  constructor(private router: Router,
              private http: Http,
              private notification: NotificationService) {
    super();

  }

  /**
   * This is used to set authenticated user into cache.
   * @param user
   */
  public setAuthUser(user: any): void {
    // //console.log('Auth User ', user);
    Cookies.set('shibi-user-auth-token', user, { expires: 1 });
    Cache.set('shibi-user-auth-token', this.getAuthUser());
  }

  /**
   * This is used to get Authenticated user from cache
   */
  public getAuthUser(): any {
    const cacheUser = Cache.get('shibi-user-auth-token');
    return (cacheUser) ? cacheUser : this.dateFormatterInResponse({data: Cookies.get('shibi-user-auth-token')})['data'];
  }


  /**
   * This is to set auth user session
   * @param data
   */
  public setAuthUserSession(data) {
    Cache.set('shibi-user-auth-token', data);
  }

  /**
   * This is used to get Authenticated user from cache
   */
  public getAuthUserToken(): any {

    return Cookies.getToken();
  }

  /**
   * This is used to get user in a session
   */
  public getUserSession(): any {
    return Cache.get('shibi-user-auth-token');
  }

  /**
   * This is used to delete Authenticated user from Cache.
   */
  public removeAuthUser(): void {
    Cookies.remove('shibi-user-auth-token');
    Cache.remove('shibi-user-auth-token');
  }

  /**
   * This is to remove user in a session
   * @returns {undefined}
   */
  public removeUserSession(): any {
    return Cache.remove('shibi-user-auth-token');
  }

  /**
   * Check if user token exist in Cache
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {
    return !!(this.getAuthUser());
  }

  /**
   * This is used to logout
   * @param type
   * @param message
   * @returns {null}
   */
  public logout(type?: LogoutTypes | String, message?: string) {
    switch (type) {
      case LogoutTypes.CHECKOUT:
        return null;
      case LogoutTypes.SESSION_EXPIRATION:
        this.responseAction();
        Cache.set('shibi-session-expiration', message || 'You were logged out due to session timeout, please login again to continue.');
        // window.location.href = window.location.origin + '';
        this.router.navigateByUrl('/admin');
        break;

      case LogoutTypes.UNAUTHORIZED:
        if (message === 'Expired Session') {
          this.responseAction();
          this.router.navigateByUrl('/admin');
        }
        Cache.set('shibi-session-expiration', message || 'You are restricted to access this page');
       // window.location.href = window.location.origin + '';
       // this.router.navigateByUrl('');
        break;

      default:
        this.router.navigateByUrl('/admin');
        return;
    }
  }

  private responseAction() {
    this.removeAuthUser();
    Cache.clear();
    localStorage.clear();
  }

  public logEmailOut() {
    this.removeAuthUser();
    Cache.clear();
    localStorage.clear();
  }

}
