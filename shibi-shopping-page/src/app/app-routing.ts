/**
 * Created by User on 10/07/2018.
 */
import {Routes} from '@angular/router';
import {HomeComponent} from "./store-front/home/home.component";
import {StoreListComponent} from "./store-front/store-list/store-list.component";
import {ProductsComponent} from "./store-front/products/products.component";
import {CheckOutComponent} from "./store-front/check-out/check-out.component";
import {ShoppingCart} from "./models/shopping-cart";

export const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stores', component: StoreListComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCart},
  {path: 'check-out', component: CheckOutComponent},

]
