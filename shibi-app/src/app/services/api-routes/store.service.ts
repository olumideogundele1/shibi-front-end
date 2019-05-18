import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiHandlerService} from '../api-handler.service';
import {UserService} from '../user.service';

@Injectable()
export class StoreService {

  private stores = environment.API_URL.store;

  constructor(private apiHandler: ApiHandlerService,
              private userService: UserService) { }


  /**
   * This is used to create store
   * @param data
   * @returns {Observable<any>}
   */
   createStore(data) {
       return this.apiHandler.post(`${this.stores}/create-store`, data);
  }

  /**
   * This is used to toggle store status
   * @param data
   * @returns {Observable<any>}
   */
  public toggleStore(id) {
     return this.apiHandler.put(`${this.stores}/${id}/toggle`);
  }

  /**
   * This is used to get all store
   * @param data
   * @returns {Observable<any>}
   */
  getAllStores(pageNo) {
    return this.apiHandler.get(`${this.stores}/all-stores?pageNumber=${pageNo}&pageSize=5`);
  }

  /**
   * This is used to update store
   * @param data
   * @returns {Observable<any>}
   */
  updateStore( data: object) {
     return this.apiHandler.put(`${this.stores}/edit-store`, data);
  }

  /**
   * This is used to get one store
   * */
  getStore(id) {
    return this.apiHandler.get(`${this.stores}/${id}`);
  }
}
