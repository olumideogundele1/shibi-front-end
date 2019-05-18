import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/api-routes/shopping-cart.service";
import {ProductService} from "../../services/api-routes/product.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {CartItem} from "../../models/cart-item";
import {ShoppingCart} from "../../models/shopping-cart";
import * as _ from 'lodash';
import {EventsService} from "../../services/event.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

declare const $;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public id = 0;
  public sum: number;
  public price: number;
  public selectedProduct: any;
  private cartItemList: any[] = [];
  public cartItemId: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private emptyCart: boolean;
  public Product: any[] = [];
  isReady: boolean;
  displayCart: any;
  /* To spin the click or submit event*/
  public booleans = {
    submitLoader: false,
    loader: false,
    showUpdate: false,
    loadingStatus: false,
  };
  viewedPlate: any[] = [];
  public cartquantity: any[] = [];
  public cartArray: any[] = [];
  public allCart: any[] = [];
  public productId: number;
  constructor(private cartService: ShoppingCartService,
              private productService: ProductService,
              private route: Router,
              private notification: NotificationService,
              private eventService: EventsService,
              private modalService: NgbModal) {
    this.eventService.on('olus_cart', (output) => {
      // console.log('output', output);
    this.cartquantity = output; }
    );
  }

  ngOnInit() {
   this.cartItemList = JSON.parse(localStorage.getItem('cartItemList'));
    // this.getCartItemList(this.id);
    console.log('cartItemList', this.cartItemList);
  }

  getResultFromChild(event) {
    console.log(event);
  }

  addNewCart() {
    this.allCart.push(this.cartquantity);
    this.cartquantity = [];
    console.log('all cart', this.allCart);
    /* this.eventService.broadcast('olus_cart', this.allCart);
     this.eventService.broadcast('olus_cart2', this.allCart);*/
    this.eventService.broadcast('new_cart', this.cartquantity);
    this.eventService.broadcast('new_cart2', this.cartquantity);
    console.log('new cart', this.cartquantity);
      }

      getAllCart() {
        this.displayCart = Array.from(Array(Math.ceil(this.allCart.length / 3)).keys());
      }

     get cartPrice() {
      this.price = 0;
        for (let productId in this.cartquantity)
          this.price = (this.cartquantity[productId].salePrice) * (this.cartquantity[productId].productQuantity);
        console.log('price: ', this.price);
        return this.price;
      }

  get totalPrice() {
      this.sum = 0;
      for ( let productId in this.cartquantity)
       this.sum += (this.cartquantity[productId].salePrice) * (this.cartquantity[productId].productQuantity);
        console.log('Total price: ', this.sum);
        return this.sum;
      }
//   onSelect(product) {
//     product = this.Product;
//     this.selectedProduct = product;
//   }
//
//   onRemoveCartItem(cartItem: CartItem) {
//     this.cartService.removeCartItem(cartItem.id).subscribe(
//       response => {
//         console.log('removed suceesfully', response);
//          this.getCartItemList(cartItem.id);
//       },
//       error => {
//         console.log('product removal fail', error);
//       }
//     );
//   }
//
//
//   getCartItemList(id) {
//     this.cartService.getCartItem(id).subscribe(
//       response => {
//         this.cartItemList = response.content;
//         this.cartItemId = this.cartItemList.length;
//       },
//       error => {
//         this.notification.error('unable to get cart', error);
//       }
//     );
//   }
//   addToCart(product) {
//     const productIndex = _.findIndex(this.cartItemList, {name: product.name});
//    if (productIndex === -1 ) {
//       product = {...product, qty: 1 };
//       this.cartItemList.push(product);
// /*
//       product.price = product.price * quantity;
// */
//     } else {
//       this.cartItemList[productIndex].qty++;
//    }
//    console.log('cart list', this.cartItemList);
//   }
//
//   checkOut() {
//     localStorage.setItem('cartItem', JSON.stringify(this.cartItemList));
//     this.route.navigateByUrl('/shopping-cart');
//   }

  toggleNav() {
    if ($('.olumideClass').hasClass('cart-bg-overlay-on')) {
      $('.olumideClass').removeClass('cart-bg-overlay-on');
      $('.right-side-cart-area').removeClass('cart-on');

    } else {
      $('.olumideClass').addClass('cart-bg-overlay-on');
      $('.right-side-cart-area').addClass('cart-on');
    }
  }
  viewPlate(i): void {
    this.viewedPlate = this.allCart[i];
    /*this.isReady = true;
    this.booleans.showUpdate = false;*/
     /* this.openModal();*/
      console.log('viewed plate: ', this.viewedPlate);
      console.log('content of plate ' + i);
  }

  navToViewPlate(content) {
    this.modalService.open(ShoppingCartComponent, {size : 'sm'});
  }

  openModal() {
    $('#modal-slideinright').modal('show');
  }

  closeModal() {
    this.booleans.showUpdate = true;
  }


}
