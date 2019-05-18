import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from '../../../services/api-routes/user-data.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {NotificationService} from '../../../services/notification.service';

declare const $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public createForm: FormGroup;
  public role: any;
  public id = 0;
  public globalUser: any;
  showUpdate: boolean;
  isReady: boolean;
  btnText: string;

  public list =
    {
      allUsers: []
    };
  public p = 1;
  /* To spin the click or submit event*/
  public booleans = {
    submitLoader: false,
    loader: false,
    showUpdate: false,
    loadingStatus: false,
  };

  public formData = () => {
    return {
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
      userRoles: ['', Validators.compose([])],
    };
  }


  constructor(private formBuilber: FormBuilder,
              private userDataService: UserDataService,
              private userService: UserService,
              private router: Router,
              private notification: NotificationService) {
    this.globalUser = {
      firstName: null,
      lastname: null,
      username: null,
      email: null,
      phoneNumber: null,
      userRoles: null
    };
    this.showUpdate = false;
    this.createForm = this.formBuilber.group(this.formData());
    this.role = this.userService.getAuthUser()['roles'][0];
    console.log('this is role', this.role);

    if (this.role === 'ROLE_CLIENT') {
      this.router.navigateByUrl('/admin/stores');
    }
  }

  ngOnInit() {
    this.isReady = false;
    this.getUsers(this.p - 1);
    this.userDataService.header.next('Your Satisfaction is Our Priority');
  }

  getPage(event) {
    this.p += event;
    this.getUsers(this.p - 1);
  }

  getUsers(pageNo) {
    this.booleans.loader = true;
    this.userDataService.getAllUsers(pageNo).subscribe(
      (response) => {
        this.list.allUsers = response;
        this.booleans.loader = false;
      },
      error => {
        this.booleans.loader = false;
        this.notification.error('Unable to load users', error);
      });

  }

  createUser() {
    this.booleans.submitLoader = true;
    this.userDataService.createUser(this.createForm.value).subscribe(
      (response) => {
        this.notification.success('New User created successfully');
        this.booleans.submitLoader = false;
        this.list.allUsers['content'].unshift(response);
        $('#modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error('Unable to create user', error);
      }
    );
  }

  updateUser() {
    this.booleans.submitLoader = true;
    this.createForm.value['roleId'] = this.createForm.value['userRoles'];
    this.userDataService.updateAdmin(this.createForm.value).subscribe(
      (response) => {
        this.booleans.submitLoader = false;
        this.booleans.showUpdate = false;
        this.notification.success('Update was successful');
        this.list.allUsers['content'].forEach((val, i) => {
          if (+val.id === +this.id) {
            val = response;
          }
        });
        $('#modal-slideinright').modal('hide');
      },
      error => {
        this.booleans.submitLoader = false;
        this.notification.error('Unable to create user', error);
      }
    );
  }

  onSubmit() {
    if (this.booleans.showUpdate) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createNewUser(): void {
    this.isReady = true;
    // this.globalUser = null;
    this.showUpdate = false;
    this.btnText = 'Submit';
    setTimeout(() => {
      this.openModal();
    }, 20);
  }

  openModal() {
    $('#modal-slideinright').modal('show');
  }



  onChangeStatus(user, event) {
    this.userDataService.toggleStatus(user.id).subscribe(
      (response) => {
        this.notification.success('User status was successfully changed');
      },
      error => {
        this.notification.error('unable to toggle user', error);
      }
    );
  }

  onEdit(user) {
    this.isReady = true;
    this.globalUser = JSON.parse(JSON.stringify(user));
    this.showUpdate = true;
    this.btnText = 'Update';
    console.log('USER::: ', this.globalUser, this.showUpdate);
    setTimeout(() => {
      this.openModal();
    }, 20);
    let role_id = 1;
    if (user['authorities'] && user['authorities'][0]['authority'] === 'ROLE_ADMIN') {
      role_id = 2;
    } else {
      role_id = 1;
    }
    const formData = () => {
      return {
        id: [user.id, Validators.compose(([]))],
        username: [user.username, Validators.compose([Validators.required])],
        firstName: [user.firstName, Validators.compose([Validators.required])],
        lastName: [user.lastName, Validators.compose([Validators.required])],
        email: [user.email, Validators.compose([Validators.required])],
        phone: [user.phone, Validators.compose([Validators.required])],
        userRoles: [role_id, Validators.compose([])],
      };

      // this.createForm = this.formBuilber.group(formData());
      // this.booleans.showUpdate = true;
      // this.openModal();*!/*/
    };
  }


}
