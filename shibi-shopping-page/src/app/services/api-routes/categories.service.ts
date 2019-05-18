import { Injectable } from '@angular/core';
import {ApiHandlerService} from "../api-handler.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class CategoriesService {

  public category = environment.API_URL.categories;

  constructor(private apiHandler: ApiHandlerService) { }

  /**
   * This is used to create category
   * @param data
   * @returns {Observable<any>}
   */
  createCategory(data) {
    return this.apiHandler.post(`${this.category}/create-category`, data);
  }

  /**
   * This is used to toggle category
   * @param data
   * @returns {Observable<any>}
   */
  public toggleCategory(id) {
    return this.apiHandler.put(`${this.category}/${id}/toggle`);
  }

  getAllCategory(pageNo) {
    return this.apiHandler.get(`${this.category}/all-categories?pageNumber=${pageNo}&pageSize=10`);
  }

  /**
   * This is used to update category
   * @param data
   * @returns {Observable<any>}
   */
  updateCategory(data: object) {
    return this.apiHandler.put(`${this.category}/update-category`, data);
  }

}
