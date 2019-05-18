import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiHandlerService} from "../api-handler.service";

@Injectable()
export class ProductService {

  private products = environment.API_URL.product;

  constructor(private apiHandler: ApiHandlerService) { }

  /**
   * This is used to create product
   * @param data
   * @returns {Observable<any>}
   */
  createProduct(data) {
    return this.apiHandler.post(`${this.products}/create-product`, data);
  }

  getAllProducts(pageNo) {
    return this.apiHandler.get(`${this.products}/all-products?pageNumber=${pageNo}&pageSize=10`);
  }

  /**
   * This is used to update product
   * @param data
   * @returns {Observable<any>}
   */
  updateProduct(data: object) {
    return this.apiHandler.put(`${this.products}/update-product`, data);
  }

  /**
   * This is used to get one product
   * */
  getProduct(id) {
    return this.apiHandler.get(`${this.products}/${id}`);
  }

  /**
   * This is used to get the prodct from a particular category
   * */
  getProductsByCategory(id) {
    return this.apiHandler.get(`${this.products}/${id}/get-category`);
  }

  /**
   * This is used to get products from a particular store
   * */
  getProductsByStore(id) {
    return this.apiHandler.get(`${this.products}/${id}/get-products`);
  }

  deleteProduct(data: string) {
    return this.apiHandler.delete(data);
  }


}
