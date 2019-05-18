import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiHandlerService} from "../api-handler.service";

@Injectable()
export class ShoppingCartService {

  private shoppingCart = environment.API_URL.shoppingCart;

  constructor(private apiHandler: ApiHandlerService) { }

  /**
   * This is used to get all order details
   * @param data
   * @returns {Observable<any>}
   */
    getAllCartItem(pageNo) {
      return this.apiHandler.get(`${this.shoppingCart}/all-orderDetails?pageNumber=${pageNo}&pageSize=10`);
  }

  /**
   * This is used to get one order details
   * @param data
   * @returns {Observable<any>}
   */
    getCartItem(id) {
      return this.apiHandler.get(`${this.shoppingCart}/${id}`);
  }
  /**
   * This is used to create order details
   * @param data
   * @returns {Observable<any>}
   */
  addCartItem(id) {
    return this.apiHandler.post(`${this.shoppingCart}/create-OrderDetail`, id);
  }

  removeCartItem(id) {
    return this.apiHandler.get(`${this.shoppingCart}`);
  }
}
