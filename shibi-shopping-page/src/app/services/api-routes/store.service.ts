import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiHandlerService} from "../api-handler.service";

@Injectable()
export class StoreService {

  private stores = environment.API_URL.store;
  constructor(private apiHandler: ApiHandlerService) { }

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
  getAllStores(pageNo) {
    return this.apiHandler.get(`${this.stores}/all-stores?pageNumber=${pageNo}&pageSize=10`);
  }

    /**
     * This is used to get one store
     * */
    getStore(id) {
      return this.apiHandler.get(`${this.stores}/${id}`);
    }
}
