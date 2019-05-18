import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {AppComponent} from './app.component';
import {HomeComponent} from './store-front/component/home/home.component';
import {CheckOutComponent} from './store-front/component/check-out/check-out.component';
import {MyOrdersComponent} from './store-front/component/my-orders/my-orders.component';
import {OrderSuccessComponent} from './store-front/component/order-success/order-success.component';
import {ProductsComponent} from './store-front/component/products/products.component';
import {ShippingFormComponent} from './store-front/component/shipping-form/shipping-form.component';
import {ShoppingCartComponent} from './store-front/component/shopping-cart/shopping-cart.component';
import {StoreListComponent} from './store-front/component/store-list/store-list.component';
import {LoginComponent} from './dashboard/component/login/login.component';
import {SignupComponent} from './dashboard/component/signup/signup.component';
import {UsersComponent} from './dashboard/component/users/users.component';
import {StoresComponent} from './dashboard/component/stores/stores.component';
import {OrdersComponent} from './dashboard/component/orders/orders.component';
import {RouterModule} from '@angular/router';
import {AdminProductsComponent} from './dashboard/component/admin-products/admin-products.component';
import {AdminHomeComponent} from './dashboard/component/admin-home/admin-home.component';
import {ClientHomeComponent} from './dashboard/component/client-home/client-home.component';
import {NgwWowModule} from 'ngx-wow';
import {ScriptLoaderService} from './services/script-loader.service';
import {ApiHandlerService} from './services/api-handler.service';
import {UserService} from './services/user.service';
import {EventsService} from './services/event.service';
import {NotificationService} from './services/notification.service';
import {ValidationErrorService} from './services/validation-error.service';
import {CopingsService} from './services/copings.service';
import {CommonModule, DatePipe} from '@angular/common';
import {PdfService} from './services/pdf.service';
import {EncryptionService} from './services/encryption.service';
import {UserDataService} from './services/api-routes/user-data.service';
import {ProfileService} from './services/api-routes/profile-service';
import {AuthGuardService} from './services/api-routes/auth-guard.service';
import {PasswordService} from './services/api-routes/password.service';
import {RoleGuardService} from './services/role-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotificationModule} from './shared/modules/notification.module';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {APP_ROUTES} from './app-routing';
import {NgbActiveModal, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Http, HttpModule} from '@angular/http';
import { HeaderNavComponent } from './dashboard/component/header-nav/header-nav.component';
import { SideNavbarComponent } from './dashboard/component/side-navbar/side-navbar.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {PipeModule} from './shared/modules/pipe.module';
import {BootstrapSwitchModule} from 'angular2-bootstrap-switch';
import {FileUploaderModule} from 'ng4-file-upload';
import {Ng4FilesModule} from './utils/ng4-files/ng4-files.module';
import {UploadImageService} from './services/api-routes/upload-image.service';
import {StoreService} from './services/api-routes/store.service';
import * as firebase from 'firebase';
import {ProductService} from "./services/api-routes/product.service";
import { CategoryComponent } from './dashboard/component/category/category.component';
import {CategoryService} from "./services/api-routes/category.service";
import { NgSelectModule } from '@ng-select/ng-select';
firebase.initializeApp(
 {
   apiKey: 'AIzaSyAQvPh4jsOYfg5L4OjcDXqkVhleLJlosfM',
   authDomain: 'shibikey-c8685.firebaseapp.com',
   databaseURL: 'https://shibikey-c8685.firebaseio.com',
   projectId: 'shibikey-c8685',
   storageBucket: 'shibikey-c8685.appspot.com',
   messagingSenderId: '253683585818'
}
);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    StoreListComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    StoresComponent,
    OrdersComponent,
    AdminProductsComponent,
    AdminHomeComponent,
    ClientHomeComponent,
    HeaderNavComponent,
    SideNavbarComponent,
    CategoryComponent,

  ],
  imports: [
    BrowserModule,
    NgwWowModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    NgxPaginationModule,
    NotificationModule,
    RouterModule,
    NgSelectModule,
    BootstrapSwitchModule.forRoot(),
    HttpClientModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploaderModule,
    Ng4FilesModule,
    PipeModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [

    ScriptLoaderService,
    ApiHandlerService,
    UserService,
    EventsService,
    NotificationService,
    ValidationErrorService,
    CopingsService,
    DatePipe,
    PdfService,
    EncryptionService,
    UserDataService,
    ProfileService,
    AuthGuardService,
    PasswordService,
    RoleGuardService,
    UploadImageService,
    StoreService,
    UploadImageService,
    ProductService,
    CategoryService,

  ],

  exports: [
    Ng4FilesModule,
    NgSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
