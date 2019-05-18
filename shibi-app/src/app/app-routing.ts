/**
 * Created by User on 20/06/2018.
 */
import {CheckOutComponent} from "./store-front/component/check-out/check-out.component";
import {MyOrdersComponent} from "./store-front/component/my-orders/my-orders.component";
import {OrderSuccessComponent} from "./store-front/component/order-success/order-success.component";
import {ProductsComponent} from "./store-front/component/products/products.component";
import {ShippingFormComponent} from "./store-front/component/shipping-form/shipping-form.component";
import {ShoppingCartComponent} from "./store-front/component/shopping-cart/shopping-cart.component";
import {StoreListComponent} from "./store-front/component/store-list/store-list.component";
import {LoginComponent} from "./dashboard/component/login/login.component";
import {SignupComponent} from "./dashboard/component/signup/signup.component";
import {UsersComponent} from "./dashboard/component/users/users.component";
import {StoresComponent} from "./dashboard/component/stores/stores.component";
import {OrdersComponent} from "./dashboard/component/orders/orders.component";
import {AdminProductsComponent} from "./dashboard/component/admin-products/admin-products.component";
import {AdminHomeComponent} from "./dashboard/component/admin-home/admin-home.component";
import {ClientHomeComponent} from "./dashboard/component/client-home/client-home.component";
import {Routes} from '@angular/router';
import {HomeComponent} from "./store-front/component/home/home.component";
import {CategoryComponent} from "./dashboard/component/category/category.component";

export const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'stores', component: StoreListComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'check-out', component: CheckOutComponent},
  {path: 'order-success', component: OrderSuccessComponent},
  {path: 'admin', component: LoginComponent},
  {path: 'admin/admin-home', component: AdminHomeComponent},
  {path: 'admin/client-home', component: ClientHomeComponent},
  {path: 'admin/signUp', component: SignupComponent},
  {path: 'admin/users', component: UsersComponent },
  {path: 'admin/stores', component: StoresComponent},
  {path: 'admin/products', component: AdminProductsComponent},
  {path: 'admin/orders', component: OrdersComponent},
  {path: 'admin/categories', component: CategoryComponent},

]
