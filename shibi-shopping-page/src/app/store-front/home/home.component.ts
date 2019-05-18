import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import {StoreService} from "../../services/api-routes/store.service";
import {ProductService} from "../../services/api-routes/product.service";
import {NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

public p = 1;
isReady: boolean;
myLoader: boolean;
  public booleans = {
    submitLoader: false,
    loader: false,
    showUpdate: false,
    loadingStatus: false,
  };

  public list = {
      allStores: [],
      allProducts: []
  }

  constructor(private storeService: StoreService,
              private productService: ProductService,
              private notification: NotificationService,
              private renderer: Renderer2
              ) { }

  ngOnInit() {
    this.isReady = false;
    this.myLoader = false;
    this.getStores(this.p - 1);
  }

  getPage(event) {
    this.p += event;
    this.getStores(this.p - 1);
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

getStores(pageNo) {
  this.booleans.loader = true;
  this.storeService.getAllStores(pageNo).subscribe(
    (response) => {
      this.list.allStores = response;
      this.booleans.loader = false;
    },
    error => {
      this.booleans.loader = false;
      this.notification.error('Unable to load store');
    }
  );
}



}
