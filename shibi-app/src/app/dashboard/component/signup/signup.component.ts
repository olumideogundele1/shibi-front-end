import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from '../../../services/api-routes/profile-service';
import {UserDataService} from '../../../services/api-routes/user-data.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  public role: any;
  public id = 0;
  loading = false;
  closeResult;
  forgotPasswordScreen = true;

  public static createSignUpForm() {
    return {
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      // userRoles: ['', [Validators.compose([])]]

    };
  }

  constructor(public  activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private userDataService: UserDataService,
              public modalService: NgbModal,
              private userService: UserService,
              private router: Router,
              private ngAlertService: NotificationService
                ) {
    this.signUpForm = this.formBuilder.group(SignupComponent.createSignUpForm());
  }

  ngOnInit() {
  }


public closeModal() {
this.activeModal.close('Modal Closed');
}

  signUp() {
    this.loading = true;
    if (this.signUpForm.valid) {
      this.userDataService.createClient(this.signUpForm.value).subscribe(
        (response) => {
          console.log(response);
          console.log(response.res);
         // this.userService.setAuthUser(response.res);
          this.ngAlertService.success('Thanks for signing Up please check your email for further instructions');
          this.loading = false;
          this.activeModal.close(this.signUpForm.value);
          setTimeout(() => {
            this.router.navigate(['/admin/client-home']);
          }, 20);
        },

        (error) => {
          this.loading = false;
          this.ngAlertService.error('Unable to create user', error);
        });
    }
  }

  /**
   * This is used to navigate back the login screen
   */
  goBack() {
    this.activeModal.close('Modal Closed');
}
  /**
   * This is used to navigate to the sign In modal
   */
  navToSignIn(content) {
    this.activeModal.close('Modal Closed');
   // this.modalService.open(content, {size: 'lg'});
  }

}
