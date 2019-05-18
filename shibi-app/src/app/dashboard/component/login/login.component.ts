import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserDataService} from '../../../services/api-routes/user-data.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {EncryptionService} from '../../../services/encryption.service';
import {ProfileService} from '../../../services/api-routes/profile-service';
import {UserService} from '../../../services/user.service';
import {Cache} from '../../../utils/cache';
import {PasswordService} from '../../../services/api-routes/password.service';
import {SignupComponent} from "../signup/signup.component";
import {CONSTANTS} from "../../../utils/constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  signInForm: FormGroup;
  forgotPasswordForm: FormGroup;
  forgotPasswordScreen =  false;
  loading = false;
  public role: any;
  storeid: number;
  public id = 0;
  userId: any;
  userStore: number;

 public loaders = {
    sessionExpiration: false,
   spin: false,
    logoutMessage : ''
 };

  public userFeedBack = {
    edit: true,
    message: 'Login',
    checked: false,
    saving: false
  };

  public static buildForgetPasswordForm() {
    return {
      email: ['', [Validators.required, Validators.email ]]
    };
  }

  public static createSignInForm() {
    return {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    };
  }

   constructor(public formBuilder: FormBuilder,
              private userDataService: UserDataService,
              private profileService: ProfileService,
              private passwordService: PasswordService,
              private userService: UserService,
              private router: Router,
              private modalService: NgbModal,
              private ngAlertService: NotificationService,
              public encrypt: EncryptionService) {

    this.signInForm = this.formBuilder.group(LoginComponent.createSignInForm());
    this.forgotPasswordForm = this.formBuilder.group(LoginComponent.buildForgetPasswordForm());
  }


  /**
   * This is time out a  session
   */

  ngOnInit() {
// alert("Login Component!!!");
    if (Cache.get('shibi-session-expiration')) {
        this.loaders.sessionExpiration = true;
        this.loaders.logoutMessage = 'You have been logged out due to inactivity';
        setTimeout(() => {
          Cache.remove('shibi-session-expiration');
          this.loaders.sessionExpiration = false;
        }, CONSTANTS.TIMEOUT_5);
    } else {
        this.loaders.sessionExpiration = false;
        Cache.remove('shibi-session-expiration');
    }
  }

  /**
   * This is used to convert the encrypted data to the acceptable format
   */

  encryptData(data) {
    return {
      data
    };
  }

  /**
   * This is used to sign in the user
   */
public signIn() {
  this.loading = true;
    let authUser = {};
    this.userFeedBack.message = 'Logging in';
    this.userFeedBack.saving = true;
  console.log('login token :: ', this.signInForm.value);
  if (!this.signInForm.valid) {
    return;
  }

   this.profileService.login(this.signInForm.value).subscribe(
        (data) => {
       //   this.activeModal.close(this.signInForm.value);
          this.loading = false;
          this.userService.setAuthUser(data.token);
          console.log('token :: ', data.token);
          authUser = this.userService.getAuthUser();
          Cache.set('credentials', this.userService.getAuthUser());
          this.role = this.userService.getAuthUser()['roles'][0];
          console.log('this is role', this.role);
          const user = this.userService.getAuthUser().id;
          console.log('this is my store id', user);
          this.getStore(user);
          this.userService.setAuthUserSession(authUser);
        },
        (error) => {
          this.loading = false;
          this.userFeedBack.saving = false;
          this.userFeedBack.message = 'Login';
          console.log( 'error :: ', error);
          Cache.clear();
          this.ngAlertService.error('Invalid Credentials', error);
        }
      );
  }

  /**
   * This is used to navigate to the forgot password screen
   */
  navToForgotPassword () {
    this.forgotPasswordScreen = true;
      }

  /**
   * This is used to retrieve a forgotten password
   */
  forgotPassword () {
    this.loading = true;
    console.log('value :: ', this.forgotPasswordForm.value);
    this.passwordService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      (data) => {
        this.ngAlertService.success('Password recovery instruction has been sent to your email.');
        console.log('forgot email response :: ', data);
        this.loading = false;
        },
      (error) => {
        this.ngAlertService.error('Unable to reset email', error);
        this.loading = false;
      }
    );
  }
 public getStore (user) {
    this.userDataService.getUser(user).subscribe((data) => {
        console.log('Store, ', data);
        // this.userStore = data['stores']['storeId'];
        this.makeDecision(data);
        },
      (error) => {
console.log('error', error);
      }
    );
  }
  public  makeDecision(userProperty) {
    console.log('userProperty ', userProperty);
      if (this.role === 'ROLE_CLIENT' && userProperty['stores']) {
     this.router.navigateByUrl('/admin/products');
     } else if (this.role === 'ROLE_CLIENT' && !userProperty['stores']) {
        this.router.navigateByUrl('/admin/stores');
      } else {
     this.router.navigateByUrl('/admin/admin-home');
      }
  }
  /**
   * This is used to navigate back the login screen
   */
  goBack() {
    this.forgotPasswordScreen = false;
  }

  /**
   * This is used to navigate to the signup modal
   */
  navToSignUp(content) {

    this.modalService.open(SignupComponent, {size: 'lg'});
  }

  /**
   * This is used to navigate to the signIn modal
   */
  // openUpSignInModal() {
  //   const modalRef = this.modalService.open();
  // }

  signOut() {

  }
}
