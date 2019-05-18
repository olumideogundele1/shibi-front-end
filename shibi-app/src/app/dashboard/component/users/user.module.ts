import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NotificationModule} from "../../../shared/modules/notification.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PipeModule} from "../../../shared/modules/pipe.module";
import {UsersComponent} from "./users.component";
import {BootstrapSwitchModule} from "angular2-bootstrap-switch";
import {NgxPaginationModule} from "ngx-pagination";
import {SideNavbarComponent} from "../side-navbar/side-navbar.component";
import {HeaderNavComponent} from "../header-nav/header-nav.component";
import {SwitchComponent} from "../../../shared/components/switch/switch.component";



@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    FormsModule,
    NgbModule,
    PipeModule,
    NgxPaginationModule,
    BootstrapSwitchModule.forRoot(),
    ReactiveFormsModule,
  ],
declarations: [UsersComponent, SideNavbarComponent, HeaderNavComponent, SwitchComponent],
  exports: [UsersComponent]
})

export class UserModule {

}
