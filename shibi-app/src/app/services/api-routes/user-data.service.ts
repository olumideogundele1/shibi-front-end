import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiHandlerService} from '../api-handler.service';
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserDataService {
  private user = environment.API_URL.user;
  private userType = 'user';
  public header = new Subject();

  constructor(private apiService: ApiHandlerService) { }
  getAllUsers(pageNo) {
    return this.apiService.get(`${this.user}/all-users?pageNumber=${pageNo}&pageSize=10&userType=${this.userType}`);
  }

  createUser(data) {
    return this.apiService.post(`${this.user}/createUser`, data);
  }
  /**
   * This is used to create client
   * @param data
   * @returns {Observable<any>}
   */
  createClient(data) {
    return this.apiService.post(`${this.user}/create-client`, data);
  }
  public toggleStatus(id) {
    return this.apiService.put(`${this.user}/${id}/toggle`);
  }

  updateUser(id, data) {
    return this.apiService.put(`${this.user}/update-user-info`, data);
  }

  updateAdmin(data) {
    return this.apiService.put(`${this.user}/admin-user-update`, data);
  }

  getUser(id) {
    return this.apiService.get(`${this.user}/${id}`);
  }
}
