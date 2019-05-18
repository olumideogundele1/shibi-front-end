import {ProductService} from "../services/api-routes/product.service";
import {ShoppingCart} from "./shopping-cart";
export class CartItem {

  public id: number;
  public qty: number;
  public subTotal: number;
  public product: ProductService;
  public shoppingCart: ShoppingCart;
  public toUpdate: boolean;
}
