import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CheckOutComponent } from './store-front/check-out/check-out.component';
import { HomeComponent } from './store-front/home/home.component';
import { ProductsComponent } from './store-front/products/products.component';
import { StoreListComponent } from './store-front/store-list/store-list.component';
import {PipeModule} from "./shared/modules/pipe.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapSwitchModule} from "angular2-bootstrap-switch";
import {RouterModule} from "@angular/router";
import {NgbActiveModal, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NotificationModule} from "./shared/modules/notification.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ScriptLoaderService} from "./services/script-loader.service";
import {ApiHandlerService} from "./services/api-handler.service";
import {EventsService} from "./services/event.service";
import {NotificationService} from "./services/notification.service";
import {ValidationErrorService} from "./services/validation-error.service";
import {CommonModule, DatePipe} from "@angular/common";
import {CopingsService} from "./services/copings.service";
import {PdfService} from "./services/pdf.service";
import {EncryptionService} from "./services/encryption.service";
import {APP_ROUTES} from "./app-routing";
import {StoreService} from "./services/api-routes/store.service";
import {ProductService} from "./services/api-routes/product.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {UserService} from "./services/user.service";
import { HeaderNavComponent } from './store-front/header-nav/header-nav.component';
import {CategoriesService} from "./services/api-routes/categories.service";
import {ShoppingCartService} from "./services/api-routes/shopping-cart.service";
import { ShoppingCartComponent } from './store-front/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    CheckOutComponent,
    HomeComponent,
    ProductsComponent,
    StoreListComponent,
    HeaderNavComponent,
    ShoppingCartComponent
  ],
  entryComponents: [
    ShoppingCartComponent,
  ],
  exports: [
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    PipeModule,
    ReactiveFormsModule,
    BootstrapSwitchModule,
    RouterModule,
    NgbModule.forRoot(),
    FormsModule,
    NotificationModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpClientModule,
    HttpModule,
    CommonModule,
  ],
  providers: [
    ScriptLoaderService,
    ApiHandlerService,
    EventsService,
    NotificationService,
    ValidationErrorService,
    CopingsService,
    DatePipe,
    PdfService,
    EncryptionService,
    StoreService,
    ProductService,
    UserService,
    CategoriesService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
