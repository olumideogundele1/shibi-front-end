import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {ApiHandlerService} from '../api-handler.service';
import {UserService} from '../user.service';

@Injectable()
export class ProductService {

  private product = environment.API_URL.product;

  constructor(private apiHandler: ApiHandlerService,
              private userService: UserService) { }


  createProduct(data) {
    return this.apiHandler.post(`${this.product}/create-product`, data);
  }

  /**
   * This is used to toggle product
   * @param data
   * @returns {Observable<any>}
   */
  public toggleProduct(id) {
    return this.apiHandler.put(`${this.product}/${id}/toggle`);
  }

  getAllProducts(pageNo) {
    return this.apiHandler.get(`${this.product}/all-products?pageNumber=${pageNo}&pageSize=10`);
  }

  /**
   * This is used to update product
   * @param data
   * @returns {Observable<any>}
   */
  updateProduct(data: object) {
    return this.apiHandler.put(`${this.product}/update-product`, data);
  }

  /**
   * This is used to get one product
   * */
  getProduct(id) {
    return this.apiHandler.get(`${this.product}/${id}`);
  }
}
