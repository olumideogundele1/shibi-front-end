import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/api-routes/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';
import {StoreService} from '../../services/api-routes/store.service';
import {CategoriesService} from '../../services/api-routes/categories.service';
import {ShoppingCartService} from '../../services/api-routes/shopping-cart.service';
import 'rxjs/add/operator/take';
import {CartItem} from '../../models/cart-item';
import {ShoppingCart} from '../../models/shopping-cart';
import * as _ from 'lodash';
import {EventsService} from '../../services/event.service';
declare const $;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public id = 0;
  public productId = 0;
  storeid: any;
  showUpdate: boolean;
  isReady: boolean;
  myLoader: boolean;
  userStore: any;
  btnText: string;
  loaderBtn: boolean;
  loading: boolean;
  uploadPicture: boolean;
  picSelected: boolean;
  pixSelected: any;
  selectedFiles: any;
  imageUrl: string;
  public categories: any[] = [];
  categoryId = 0;
  categoryName = '';
  storeName = '';
  stores: any[] = [];
  uniqueStoreName: any[] = [];
  public globalProduct: any;
  public Products: any[] = [];
  displayProduct: any;
  products: any;
  public singleProduct: any[] = [];
  public productCart: any[] = [];
  activeCategories: string;
  categoryProduct: any;
  public filteredProducts: any[] = [];
  public list =
    {
      allProducts: [],
      allCategories: [],
      allQuantityTypes: [
        'SPOON',
        'UNIT',
        'WRAP',
        'PIECE',
        'BOTTLE',
      ]
    };
  public cartId: any;
  public p = 1;
  public item: any[] = [];
  /* To spin the click or submit event*/
  public booleans = {
    submitLoader: false,
    loader: false,
    showUpdate: false,
    loadingStatus: false,
  };
  public selectedProduct: any;
  public cartItemList: any[] = [];
  public cartItemId: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private emptyCart: boolean;
  public quantity: number;
  @Output() addProductToCart = new EventEmitter();
  public basket: any[] = [];
  constructor(private userService: UserService,
              private productService: ProductService,
              private categoryService: CategoriesService,
              private router: Router,
              private route: ActivatedRoute,
              private notification: NotificationService,
              private storeService: StoreService,
              private cartService: ShoppingCartService,
              private eventService: EventsService) {
    this.globalProduct = {
      productName: null,
      Type: null,
      salePrice: null,
      categoryId: null
    };
    this.showUpdate = false;
    this.eventService.on('new_cart', (output3) => {
      console.log('output3', output3);
      this.cartItemList = [];
    });
  }

  ngOnInit() {
    this.myLoader = false;
    this.isReady = false;
    this.getProducts(this.p - 1);
    this.uniqueStoreName = this.list.allProducts;
    this.getCategories(this.id);
    console.log('active categories', this.activeCategories);
    // this.getProductsByCategory(this.id);
  }
  getPage(event) {
    this.p += event;
    this.getProducts(this.p - 1);
  }
  getProducts(pageNo) {
    this.booleans.loader = true;
    this.productService.getAllProducts(pageNo).subscribe(
      (response) => {
        this.list.allProducts = response;
        this.Products = response.content;
        this.booleans.loader = false;
        this.displayProduct = Array.from(Array(Math.ceil(this.Products.length / 3)).keys());
        console.log(response);
        // this.filteredProducts = (this.activeCategories) ?
        //   response.content.filter(p => p.activeCategories === this.activeCategories) : response.content;
        // console.log('filteredProducts', this.filteredProducts);
      },
      error => {
        this.booleans.loader = false;
        this.notification.error('Unable to load products', error);
      }
    );
  }

  toggleNav() {
    if ($('.olumideClass').hasClass('cart-bg-overlay-on')) {
      $('.olumideClass').removeClass('cart-bg-overlay-on');
      $('.right-side-cart-area').removeClass('cart-on');

    } else {
      $('.olumideClass').addClass('cart-bg-overlay-on');
      $('.right-side-cart-area').addClass('cart-on');
    }
  }

  pushToCart(data) {


  }

  getCategories(data) {
    this.booleans.loader = true;
    this.categoryService.getAllCategory(data).subscribe(
      (response) => {
        console.log('all categories', response);
        this.categories = response.content;
        this.booleans.loader = false;
        this.myLoader = true;

      },
      error => {
        console.log(error);
        this.notification.error('unable to load categories', error);
        this.booleans.loader = false;
      }
    );
  }
  getProductsByCategory(data) {
    this.booleans.loader = true;
    this.Products = [];
    this.productService.getProductsByCategory(data).subscribe(
      (response) => {
        this.Products = response;
        console.log('categoryByID', this.Products);
        this.route.queryParamMap.subscribe(params => {
          this.activeCategories = params.get('activeCategories');
        });
            },
      error => {
        this.notification.error('cant fetch result', error);
        this.booleans.loader = false;
      }
    );
  }

/*  async addToCart(data) {
     this.cartId = localStorage.getItem('cartId');
    if (!this.cartId) {
        await this.cartService.addCartItem(data).subscribe(
          (response) => {
            console.log('this is reponse', response);
            this.item = response;
            localStorage.setItem('cartId', response.key);
            return this.item.keys;
            this.item.take(1).subscribe(item => {
              if (item.exists()) {
                item.update({ quantity: item.quantity + 1});
              } else {
                item.set({ data, quantity: 1});
              }
              console.log('product selected', data);
            });
          }
        );
    }
    return this.cartId;
      // Add product to cart
    }*/

  getCart(id) {
    this.cartService.getCartItem(id).subscribe(
      (response) => {
        console.log('cart response', response);
      },
    error => {
      this.notification.error('unable to get cart id', error);
    }
  );
  }

  onSelect(product) {
    product = this.Products;
    this.selectedProduct = product;
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      response => {
        console.log('removed suceesfully', response);
        this.getCartItemList(cartItem.id);
      },
      error => {
        console.log('product removal fail', error);
      }
    );
  }
  getCartItemList(id) {
    this.cartService.getCartItem(id).subscribe(
      response => {
        this.cartItemList = response.content;
        this.cartItemId = this.cartItemList.length;
      },
      error => {
        console.log(error);
      }
    );
  }
  addToCart(product) {
    const productIndex = _.findIndex(this.cartItemList, {productName: product.productName});
    console.log('before if', productIndex);
    if (productIndex === -1 ) {
      product = {...product, productQuantity: 1 };
      this.cartItemList.push(product);
      console.log('before productQuntity', productIndex);

    } else {
      this.cartItemList[productIndex].productQuantity++;
      console.log('after productQuntity', productIndex);
    }
/*
    this.addProductToCart.emit({cart: this.cartItemList});
*/
    this.eventService.broadcast('olus_cart', this.cartItemList);
    this.eventService.broadcast('olus_cart2', this.cartItemList);
    console.log('cart list', this.cartItemList);
  }

/*  addNewCart() {
    this.allCart.push(this.cartItemList);
    this.cartItemList = [];
   /!* this.eventService.broadcast('olus_cart', this.allCart);
    this.eventService.broadcast('olus_cart2', this.allCart);*!/
    this.eventService.broadcast('new_cart', this.allCart);
    this.eventService.broadcast('new_cart2', this.allCart);
    console.log('all cart', this.allCart);
  }*/
 getQuantity(product) {

  let productId: number;
  let productQuantity: number;
   if (!this.cartItemList) {
     return 0;
   }
   const productindex = _.findIndex(this.cartItemList, {productId: product.productId});
   if (this.productId) {
     product = {...product, productQuantity: 1 };
     this.quantity = this.cartItemList[productindex].productQuantity++;
     return this.quantity ? this.quantity : 0;
   }
 }
  checkOut() {
    localStorage.setItem('cartItem', JSON.stringify(this.cartItemList));
    this.router.navigateByUrl('/shopping-cart');
  }
}


