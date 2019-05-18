import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {EventsService} from "../../services/event.service";


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {
public cartquantity: any[] = [];
  public cartArray: any[] = [];
  constructor(private eventService: EventsService) {
    this.eventService.on('olus_cart2', (output) => {console.log('output', output);
      this.cartquantity = output; }
    );
    this.eventService.on('new_cart2', (output2) => {
      console.log('output2', output2);
      this.cartArray = output2;
    });
  }

  ngOnInit() {
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

}
