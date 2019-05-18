import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  private productCart;
  constructor() { }

  ngOnInit() {
    this.productCart = JSON.parse(localStorage.getItem('cartItemList'));
  }

}
