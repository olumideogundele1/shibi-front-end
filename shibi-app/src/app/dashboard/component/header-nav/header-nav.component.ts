import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserService} from "../../../services/user.service";
import {ProfileService} from "../../../services/api-routes/profile-service";
import {CONSTANTS} from "../../../utils/constants";

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor(private userService: UserService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  toggleNav() {
    // console.log('llll', $('body').hasClass('sidebar-left-hidden'));
    if ($('body').hasClass('sidebar-left-hidden')) {
      $('body').removeClass('sidebar-left-hidden');
    } else {
      $('body').addClass('sidebar-left-hidden');
    }
  }

  toggleForSmallScreen() {

  }

  logOutUser() {
    this.profileService.logout().subscribe(
      (logOutResponse) => {
        this.userService.logout();
    },
      (error) => {

    });
    setTimeout(() => {
      this.userService.logout();
    }, CONSTANTS.TIMEOUT_5);
  }
}
